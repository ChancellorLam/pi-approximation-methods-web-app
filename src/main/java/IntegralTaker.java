public class IntegralTaker {
	
	double simpsonsRule(long numSubintervals) {  // numerically integrate using Simpson's Rule
		long numEndpoints = numSubintervals + 1;
		double sumOfTerms = 0;
		double subintervalWidth = 0.25 / (double) numSubintervals;
		
		/*  the 0th and last terms in the calculation of the integral using Simpson's rule are not modified
			but for all other terms, odd terms are multiplied by 4 and even terms are multiplied by 2
			so an example calculation would be: f(0) + 4f(1) + 2f(2) + 4f(3) + ... f(n)
			then all of this would be multiplied by width of the subintervals / 3
		*/

		System.out.println("f(0): 0");  // this is the 0th term
		for (long i = 1; i < numEndpoints - 1; i++) {  // modify and then add every term except for 0th and last
			double x = subintervalWidth * i;
			double y = Math.sqrt(x - x * x);
			if (i % 2 == 1) { // odd terms
				sumOfTerms = sumOfTerms + 4 * y;
				System.out.println("+ 4f(" + x + "): " + 4 * y);
			}
			else { // even terms
				sumOfTerms = sumOfTerms + 2 * y;
				System.out.println("+ 2f(" + x + "): " + 2 * y);
			}
		}
		sumOfTerms = sumOfTerms + Math.sqrt(0.25 - 0.25 * 0.25);  // add the last term
		System.out.println("+ f(0.25): " + Math.sqrt(0.25 - 0.25 * 0.25));
		
		System.out.println();
		System.out.println("Sum of terms: " + sumOfTerms);
		System.out.println("Number of subintervals: " + numSubintervals);
		System.out.println("Width of subintervals: " + subintervalWidth);
		
		// multiply sum of terms by width of subintervals / 3 to approximate integral with parabolas
		double areaUnderCurve = sumOfTerms * subintervalWidth / 3;
		System.out.print("Area under curve from 0 to 0.25: " + sumOfTerms + " * (" + subintervalWidth + " / 3) = ");
		System.out.println(areaUnderCurve);
		
		return areaUnderCurve;
	}
	
	double midpointRule(long numSubintervals) {  // numerically integrate using Midpoint Rule
		double sumOfTerms = 0;
		double subintervalWidth = 0.25 / (double) numSubintervals;
		double x = subintervalWidth / 2;
		
		for (long i = 0; i < numSubintervals; i++) {  // sum up all midpoints
			sumOfTerms = sumOfTerms + Math.sqrt(x - x * x);
			System.out.println("f(" + x + "): " + sumOfTerms);
			x = x + subintervalWidth;
		}
		
		System.out.println();
		System.out.println("Sum of terms: " + sumOfTerms);
		System.out.println("Number of subintervals: " + numSubintervals);
		System.out.println("Width of subintervals: " + subintervalWidth);
		
		// multiply the sum of all midpoints by width of subintervals to approximate integral with rectangles
		double areaUnderCurve = sumOfTerms * subintervalWidth;
		System.out.print("Area under curve from 0 to 0.25: " + sumOfTerms + " * " + subintervalWidth + " = ");
		System.out.println(areaUnderCurve);
		
		return areaUnderCurve;
	}
	
	double trapezoidalRule(long numSubintervals) {  // numerically integrate using Trapezoidal Rule
		double sumOfTerms = 0;
		double subintervalWidth = 0.25 / (double) numSubintervals;
		
		// the 0th and last terms in the calculation of the integral using Trapezoidal rule are not modified
		// but all other terms are multiplied by 2
		// so an example calculation would be: f(0) + 2f(1) + 2f(2) + 2f(3) + ... f(n)
		// and then all of this would be multiplied by width of the subintervals / 2

		System.out.println("f(0): 0");  // this is the 0th term
		for (long i = 1; i < numSubintervals; i++) {  // modify every term except for 0th and last
			double x = subintervalWidth * i;
			sumOfTerms = sumOfTerms + 2 * Math.sqrt(x - x * x);
			System.out.println("+ 2f(" + x + "): " + sumOfTerms);
		}
		sumOfTerms = sumOfTerms + Math.sqrt(0.25 - 0.25 * 0.25);  // add the last term
		System.out.println("+ f(0.25): " + sumOfTerms);
		
		System.out.println();
		System.out.println("Sum of terms: " + sumOfTerms);
		System.out.println("Number of subintervals: " + numSubintervals);
		System.out.println("Width of subintervals: " + subintervalWidth);
		
		// multiply the sum of terms by width of subintervals / 2 to approximate integral with trapezoids
		double areaUnderCurve = sumOfTerms * subintervalWidth / 2;
		System.out.print("Area under curve from 0 to 0.25: " + sumOfTerms + " * (" + subintervalWidth + " / 2) = ");
		System.out.println(areaUnderCurve);
		
		return areaUnderCurve;
	}
}
