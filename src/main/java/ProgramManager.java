import java.util.Scanner;

public class ProgramManager {
	static Scanner input = new Scanner(System.in);

	void approximatePi() {
		String prompt = "What method would you like to use in order to approximate pi?";
		String[] options = {"Archimedes' Method", "Madhava-Leibniz Infinite Series", "Newton's Method",
				"Monte-Carlo Method", "Ramanujan-Sato Series", "Chudnovsky Algorithm", "Exit"};
		String methodUsed = "";
		boolean continueRunning = true;
		MenuGenerator mainMenu = new MenuGenerator();
		char[] piApproximation = new char[16];
		while (continueRunning) {
			int choice = mainMenu.selectionMenu(prompt, options);
			PiApproximator piApproximator = new PiApproximator();
			if (choice == 0) {
				piApproximation = piApproximator.archimedesMethod();
				methodUsed = options[choice];
			}
			else if (choice == 1) {
				piApproximation = piApproximator.madhavaLeibniz();
				methodUsed = options[choice];
			}
			else if (choice == 2) {
				piApproximation = piApproximator.newtonsMethod();
				methodUsed = options[choice];
			}
			else if (choice == 3) {
				piApproximation = piApproximator.monteCarlo();
				methodUsed = options[choice];
			}
			else if (choice == 4) {
				piApproximation = piApproximator.ramanujanSato();
				methodUsed = options[choice];
			}
			else if (choice == 5) {
				piApproximation = piApproximator.chudnovskyAlgorithm();
				methodUsed = options[choice];
			}
			else if (choice == 6) { // Exit
				continueRunning = false;
			}
			else {
				System.out.println("Invalid input. Please choose from the 5 available options.");
				System.out.println();
			}
			if (continueRunning) {
				char[] actualPi = "3.1415926535897932384626433832795".toCharArray();
				int numOfCorrectPiDigits = 0;
				while (numOfCorrectPiDigits < piApproximation.length &&
						piApproximation[numOfCorrectPiDigits] == actualPi[numOfCorrectPiDigits]) {
					numOfCorrectPiDigits++;
				}
				System.out.println();
				System.out.println("Approximated value of pi: " + String.valueOf(piApproximation).trim());
				System.out.println("      Actual value of pi: " + String.valueOf(actualPi));
				System.out.printf("Using %s, we have approximated the number π to %d digits!\n", methodUsed,
						numOfCorrectPiDigits - 1);
				System.out.println("Press Enter to Continue.");
				input.nextLine();
			}
		}
	}
}
