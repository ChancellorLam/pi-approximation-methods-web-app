import java.util.Random;
import java.lang.Math;

public class PiApproximator {

	char[] archimedesMethod() {
		// start with a hexagon
		int numSideLengths = 6;

		// the Ancient Greeks figured out these trigonometric ratios using properties of special right triangles
		double sinOfCurrentAngle = 0.5;
		double cosOfCurrentAngle = Math.sqrt(3) / 2;
		double tanOfCurrentAngle = sinOfCurrentAngle / cosOfCurrentAngle;

		/*	Archimedes split his hexagon into 6 equilateral triangles, and then bisected those 6 equilateral triangles
			into 12 total right triangles inside his hexagon. Using the trigonometric ratios known to him, he was able
			to calculate the perimeter of the inscribed and circumscribed hexagons to find a lower and upper bound for
			pi
		 */
		double innerPolygonPerimeter = sinOfCurrentAngle * numSideLengths;
		double outerPolygonPerimeter = tanOfCurrentAngle * numSideLengths;
		System.out.println("By inscribing and circumscribing hexagons into a circle of radius 0.5 and finding their" +
				" perimeters, we find that " + innerPolygonPerimeter + " < π < " + outerPolygonPerimeter);

		/*	Archimedes wasn't able to calculate trigonometric functions, but he knew the half-angle identities for
			sine and cosine, so he was able to find the perimeter of an n * 2 sided polygon because an n * 2 sided
			polygon has 2 times more sides than an n sided polygon, so there are 2 times as many right triangles. Since
			he knew how to calculate the perimeter for a hexagon using trigonometry, he was able to calculate by hand
			the perimeter for a 12-gon and a 24-gon and so on up to a 96-gon where he was satisfied with his
			approximation for π.
		*/
		for (int i = 0; i < 12; i++) { // floating point issues occur after the 12th term and results are erratic
			numSideLengths = numSideLengths * 2;
			sinOfCurrentAngle = ExtraMath.sinHalfAngle(cosOfCurrentAngle);
			cosOfCurrentAngle = ExtraMath.cosHalfAngle(cosOfCurrentAngle);
			tanOfCurrentAngle = sinOfCurrentAngle / cosOfCurrentAngle;

			innerPolygonPerimeter = sinOfCurrentAngle * numSideLengths;
			outerPolygonPerimeter = tanOfCurrentAngle * numSideLengths;
			System.out.println("By inscribing and circumscribing " + numSideLengths + "-gons into a circle of radius " +
					"0.5 and finding their perimeters, we find that " + innerPolygonPerimeter + " < π < "
					+ outerPolygonPerimeter);
		}

		char[] lowerPi = String.valueOf(innerPolygonPerimeter).toCharArray();
		char[] upperPi = String.valueOf(outerPolygonPerimeter).toCharArray();
		int i = 0;
		char[] accuratePiDigits = new char[lowerPi.length];
		while (lowerPi[i] == upperPi[i]) {
			accuratePiDigits[i] = lowerPi[i];
			i++;
		}
		return accuratePiDigits;

	}

	char[] madhavaLeibniz() {
		long counter = 0;
		double currentValue = 0;
		long denominator = 1;
		double newValue;
		InputTaker inputTaker = new InputTaker();
		String question = "How many iterations would you like to perform?";

		long numOfIterations = inputTaker.takeLongInputWithLowerBound(0, question);
		for (long i = 0; i < numOfIterations; i++) { // 4/1 - 4/3 + 4/5 - 4/7 + 4/9...± 4/n
			if (counter % 2 == 0) {	// + terms
				newValue = currentValue + 4.0 / denominator;
				System.out.println("Iteration " + (counter + 1) + ": " + currentValue + " + " + "4/" + denominator +
						" = " +newValue);
				currentValue = newValue;
				counter++;
				denominator = denominator + 2;
			} 
			else if (counter % 2 == 1) { // - terms
				newValue = currentValue - 4.0 / denominator;
				System.out.println("Iteration " + (counter + 1)  + ": " + currentValue + " - " + "4/" + denominator +
						" = " + newValue);
				currentValue = newValue;
				counter++;
				denominator = denominator + 2;
			}
		}
		return String.valueOf(currentValue).toCharArray();
		
	}
	
	char[] monteCarlo() {
		Random random = new Random();
		long pointsInsideCircle = 0;
		InputTaker inputTaker = new InputTaker();
		String question = "How many points would you like to plot?";

		long numOfPoints = inputTaker.takeLongInputWithLowerBound(0, question);
		
		for (long i = 0; i < numOfPoints; i++) {
			// Creates random x and y coordinates from 0 to 1 which creates a point in a square
			double x = random.nextDouble();
			double y = random.nextDouble();
			
			// given x and y coordinates, Pythagorean theorem can be used to determine diagonal distance to the origin
			double distance = Math.sqrt(x * x + y * y);
			System.out.println("Point " + (i + 1) + ": (" + x + ", " + y + ")");
			
			// if the diagonal distance is <= 1 then it falls within a quarter-circle with a radius of 1
			if (distance <= 1) {
				pointsInsideCircle++;
			}
		}
		
		System.out.println("After plotting " + numOfPoints + " points in a square of side length 0.5, "
				+ pointsInsideCircle + " points were inside of a quarter circle with a radius of 1.");
		System.out.println("By dividing the ratio of points inside the circle by the total amount of points in the" +
				" square we can approximate pi/4, which we can then use to find pi:");
		System.out.println(pointsInsideCircle + "/" + numOfPoints + " * 4 = "
				+ pointsInsideCircle/(double)numOfPoints * 4);

		return String.valueOf(pointsInsideCircle/(double)numOfPoints * 4).toCharArray();
	}
	
	char[] newtonsMethod() {
		SubintervalQuery query = new SubintervalQuery();
		IntegralTaker integral = new IntegralTaker();
		int customSubinterval = query.askIfUserWantsToChooseSubintervals();
		long numSubintervals = query.setOnlyEvenSubintervals(customSubinterval);
		double areaUnderCurve = integral.simpsonsRule(numSubintervals);

		double piApproximation = 3 * Math.sqrt(3) / 4 + 24 * areaUnderCurve;  // use area under curve in Newton's method
		System.out.print("The area under the curve from 0 to 0.25 can be used to ");
		System.out.println("approximate pi to the value of: " + piApproximation);

		return String.valueOf(piApproximation).toCharArray();
	}

	char[] ramanujanSato() {
		InputTaker inputTaker = new InputTaker();
		String question = "How many iterations would you like to perform? (16 max)";
		long numOfIterations = inputTaker.takeIntInputWithLowerAndUpperBound(0, 16, question);

		double constant = 2 * Math.sqrt(2) / Math.pow(99, 2);
		double factorialPart;
		double secondPart;
		double sum = 0;
		for (int i = 0; i <= numOfIterations; i++ ) {
			factorialPart = ExtraMath.factorial(4 * i) / Math.pow(ExtraMath.factorial(i), 4);
			secondPart = (26390 * i + 1103) / Math.pow(396, 4 * i);
			sum = sum + (secondPart * factorialPart * constant);
			System.out.println("Iteration " + i + ": " + (1 / sum));
		}

		return String.valueOf(1 / sum).toCharArray();
	}

	public char[] chudnovskyAlgorithm() {
		InputTaker inputTaker = new InputTaker();
		String question = "How many iterations would you like to perform? (16 max)";
		long numOfIterations = inputTaker.takeIntInputWithLowerAndUpperBound(0, 16, question);

		double sum = 0;
		for (int i = 0; i <= numOfIterations; i++) {
			double numerator = Math.pow(-1, i) * ExtraMath.factorial(6 * i) * (545140134 * i + 13591409);
			double denominator = ExtraMath.factorial(3 * i) * Math.pow(ExtraMath.factorial(i), 3) *
					Math.pow(640320, (3 * i + 1.5));
			sum = sum + numerator/denominator * 12;
			System.out.println("Iteration " + i + ": " + 1 / (sum));
		}

		return String.valueOf(1 / sum).toCharArray();
	}
}