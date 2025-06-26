import java.util.Scanner;
import java.util.*;


public class InputTaker {
	static Scanner input = new Scanner(System.in);
	
	int takeMenuSelection() {
		boolean inputNotTaken = true;
		int inputAttempt = 0;
		
		// will keep looping until a valid input is entered
		while (inputNotTaken) {
			try {
				inputAttempt = input.nextInt();  // if attempt is not successful, then go straight to catch statement

				// if attempt is successful, go here and end loop
				inputNotTaken = false;
			}
			catch (InputMismatchException e) {
				System.out.println("Invalid input. Please input an integer.");
				input.nextLine();
			}
		}
		return inputAttempt;
	}
	
	long takeLongInput(String question) {
		boolean inputNotTaken = true;
		long inputAttempt = 0;
		
		System.out.println(question);
		// will keep looping until a valid input is entered
		while (inputNotTaken) {
			try {
				inputAttempt = input.nextLong();  // if attempt is not successful, then go straight to catch statement

				// if attempt is successful, go here and end loop
				inputNotTaken = false;
			}
			catch (InputMismatchException e) {
				System.out.println("Invalid input. " + question);
				input.nextLine();
			}
		}
		return inputAttempt;
	}
	
	long takeLongInputWithLowerBound(long lowerBound, String question) {
		boolean inputNotTaken = true;
		long actualInput = 0;
		
		System.out.println(question);
		// will keep looping until a valid input is entered
		while (inputNotTaken) {
			try {
				long inputAttempt = input.nextLong();  // if attempt is not successful, then go straight to catch statement
				if (inputAttempt < lowerBound) {
					System.out.println("Invalid input. " + question);
				}
				else {  // if attempt is successful, go here and end loop
					actualInput = inputAttempt;
					inputNotTaken = false;
				}
			}
			catch (InputMismatchException e) {
				System.out.println("Invalid input. " + question);
				input.nextLine();  // this is necessary because scanner in try-catch is weird and will break without it
			}
		}
		return actualInput;
	}
	
	int takeIntInputWithUpperBound(int upperBound, String question) {
		boolean inputNotTaken = true;
		int actualInput = 0;
		
		System.out.println(question);
		// will keep looping until a valid input is entered
		while (inputNotTaken) {
			try {
				int inputAttempt = input.nextInt();  // if attempt is not successful, then go straight to catch statement
				if (inputAttempt > upperBound) {
					System.out.println("Invalid input. " + question);
				}
				else {  // if attempt is successful, go here and end loop
					actualInput = inputAttempt;
					inputNotTaken = false;
				}
			}
			catch (InputMismatchException e) {
				System.out.println("Invalid input. " + question);
				input.nextLine();  // this is necessary because scanner in try-catch is weird and will break without it
			}
		}
		return actualInput;
	}
	
	int takeIntInputWithLowerAndUpperBound(int lowerBound, int upperBound, String question) {
		boolean inputNotTaken = true;
		int actualInput = 0;
		
		System.out.println(question);
		// will keep looping until a valid input is entered
		while (inputNotTaken) {
			try {
				int inputAttempt = input.nextInt();  // if attempt is not successful, then go straight to catch statement
				if (inputAttempt < lowerBound || inputAttempt > upperBound) {
					System.out.println("Invalid input. " + question);
				}
				else {  // if attempt is successful, go here and end loop
					actualInput = inputAttempt;
					inputNotTaken = false;
				}
			}
			catch (InputMismatchException e) {
				System.out.println("Invalid input. " + question);
				input.nextLine();  // this is necessary because scanner in try-catch is weird and will break without it
			}
		}
		return actualInput;
	}
	
	double takeDoubleInput(String question) {
		boolean inputNotTaken = true;
		double actualInput = 0;
		
		System.out.println(question);
		// will keep looping until a valid input is entered
		while (inputNotTaken) {
			try {
				actualInput = input.nextDouble();  // if attempt is not successful, then go straight to catch statement

				// if attempt is successful, go here and end loop
				inputNotTaken = false;
			}
			catch (InputMismatchException e) {
				System.out.println("Invalid input. " + question);
				input.nextLine();  // this is necessary because scanner in try-catch is weird and will break without it
			}
		}
		return actualInput;
	}
	
	double takeDoubleInputWithLowerBound(double lowerBound, String question) {
		boolean inputNotTaken = true;
		double actualInput = 0;
		
		System.out.println(question);
		// will keep looping until a valid input is entered
		while (inputNotTaken) {
			try {
				double inputAttempt = input.nextDouble();  // if attempt is not successful, then go straight to catch statement
				if (inputAttempt < lowerBound) {
					System.out.println("Invalid input. " + question);
				}
				else {  // if attempt is successful, go here and end loop
					actualInput = inputAttempt;
					inputNotTaken = false;
				}
			}
			catch (InputMismatchException e) {
				System.out.println("Invalid input. " + question);
				input.nextLine();  // this is necessary because scanner in try-catch is weird and will break without it
			}
		}
		return actualInput;
	}
	
	double takeDoubleInputWithUpperBounds(double upperBound, String question) {
		boolean inputNotTaken = true;
		double actualInput = 0;
		
		System.out.println(question);
		// will keep looping until a valid input is entered
		while (inputNotTaken) {
			try {
				double inputAttempt = input.nextDouble();  // if attempt is not successful, then go straight to catch statement
				if (inputAttempt > upperBound) {
					System.out.println("Invalid input. " + question);
				}
				else {  // if attempt is successful, go here and end loop
					actualInput = inputAttempt;
					inputNotTaken = false;
				}
			}
			catch (InputMismatchException e) {
				System.out.println("Invalid input. " + question);
				input.nextLine();  // this is necessary because scanner in try-catch is weird and will break without it
			}
		}
		return actualInput;
	}
	
	double takeDoubleInputWithLowerAndUpperBound(double lowerBound, double upperBound, String question) {
		boolean inputNotTaken = true;
		double actualInput = 0;
		
		System.out.println(question);
		// will keep looping until a valid input is entered
		while (inputNotTaken) {
			try {
				double inputAttempt = input.nextDouble();  // if attempt is not successful, then go straight to catch statement
				if (inputAttempt < lowerBound || inputAttempt > upperBound) {
					System.out.println("Invalid input. " + question);
				}
				else {  // if attempt is successful, go here and end loop
					actualInput = inputAttempt;
					inputNotTaken = false;
				}
			}
			catch (InputMismatchException e) {
				System.out.println("Invalid input. " + question);
				input.nextLine();  // this is necessary because scanner in try-catch is weird and will break without it
			}
		}
		return actualInput;
	}
}
