import Pron from './Pron';

test('constructor is working for "test"', () => {
  const test = new Pron("T EH1 S T").text;
  expect(test).toBe("T EH1 S T");
})

test('constructor throws error for empty pron', () => {
  const blank = () => new Pron('').text;
  expect(blank).toThrow(Error);
})

test('constructor throws error for non-string args', () => {
  const num = () => new Pron(2).text;
  const bool = () => new Pron(false).text;
  const nil = () => new Pron(null).text;
  const arr = () => new Pron([]).text;
  const obj = () => new Pron({}).text;
  expect(num).toThrow(Error);
  expect(bool).toThrow(Error);
  expect(nil).toThrow(Error);
  expect(arr).toThrow(Error);
  expect(obj).toThrow(Error);
})

test('getStress determines stress of "test"', () => {
  const test = new Pron("T EH1 S T");
  const testStress = test.getStress();
  expect(testStress).toBe("1");
})

test('getStress determines stress of "unusupecting"', () => {
  const unsuspecting = new Pron("AH2 N S AH0 S P EH1 K T IH0 NG");
  const stress = unsuspecting.getStress();
  expect(stress).toBe('2010');
})