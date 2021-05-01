import Line from './Line';

test('constructor trims extra spaces', () => {
  const newLine = new Line(" testing the constructor ");
  expect(newLine.text).toEqual("testing the constructor");
  expect(newLine.text).not.toEqual(" testing the constructor ");
})

test('getTokens splits line into list and removes punctuation', () => {
  const newLine = new Line(`'Tis, better? to: have-loved; "and (lost).`);
  expect(newLine.getTokens()).toEqual(["'Tis",'better','to','have','loved','and','lost']);
})

