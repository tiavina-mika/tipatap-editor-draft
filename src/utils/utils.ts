/**
 * generate random number between 2 numbers
 */
export const generateRandomNumber = (
  max: number = 1,
  min: number = 100
): number => {
  return Math.floor(Math.random() * (max - min) + min);
};
