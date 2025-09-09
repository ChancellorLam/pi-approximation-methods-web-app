
export function getCorrectPiDigits(piApproximation: number, desiredNumDigits = 17) {
  const approximationString = piApproximation.toFixed(desiredNumDigits);

  let numMatchingDigits = 0;
  while (
    numMatchingDigits < desiredNumDigits &&
    approximationString[numMatchingDigits] === Math.PI.toString()[numMatchingDigits]
    ) {
    numMatchingDigits++;
  }

  return {
    matchingDigits: approximationString.slice(0, numMatchingDigits),
    nonMatchingDigits: approximationString.slice(numMatchingDigits, approximationString.length - 2)
  }
}
