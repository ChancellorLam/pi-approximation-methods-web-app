public class SubintervalQuery {
    int askIfUserWantsToChooseSubintervals() {
        MenuGenerator menu = new MenuGenerator();
        String question = "Would you like to choose how many subintervals?" +
                " If not, a default amount (6000) will be chosen.";
        String[] options = {"Yes:", "No:"};
        return menu.selectionMenu(question, options);
    }

    long setSubintervals(int usersChoice) {
        InputTaker inputTaker = new InputTaker();

        if (usersChoice == 0) {  // user chose yes, user how many subintervals they want
            return inputTaker.takeLongInputWithLowerBound(1, "How many subintervals?");
        }
        else {  // user chose no, set default amount
            return 6000;
        }
    }

    long setOnlyEvenSubintervals(int usersChoice) {
        long numSubintervals = 0;
        boolean numSubintervalsNotValid = true;
        InputTaker inputTaker = new InputTaker();
        if (usersChoice == 0) {  // user chose yes, user how many subintervals they want
            while (numSubintervalsNotValid) {
                long numSubintervalsAttempt = inputTaker.takeLongInput("How many subintervals?");
                if (numSubintervalsAttempt % 2 != 0 || numSubintervalsAttempt <= 0) {
                    System.out.println("Invalid amount. You need to input an even integer that is at least 2.");
                    System.out.println();
                }
                else {
                    numSubintervals = numSubintervalsAttempt;
                    numSubintervalsNotValid = false;
                }
            }
        }
        else {  // user chose no, set default amount
            return 6000;
        }
        return numSubintervals;
    }
}
