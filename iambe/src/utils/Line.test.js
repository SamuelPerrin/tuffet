import Line from './Line';

test('constructor trims extra spaces', () => {
  const newLine = new Line(" testing the constructor ")
  expect(newLine.text).toEqual("testing the constructor");
  expect(newLine.text).not.toEqual(" testing the constructor ");
})