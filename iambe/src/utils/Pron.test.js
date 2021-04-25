import Pron from './Pron';

test('constructor is working for "test"', () => {
  const test = new Pron("T EH1 S T").text;
  expect(test).toBe("T EH1 S T");
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