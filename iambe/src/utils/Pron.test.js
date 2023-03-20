import Pron from './Pron';
import Pronunciation from './Pronunciation';

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

test('getStress determines stress of "test" and "openly"', () => {
  const testWord = new Pron("T EH1 S T");
  const testStress = testWord.getStress();
  expect(testStress).toBe("1");
  const openly = new Pron("OW1 P AH0 N L IY0");
  expect(openly.getStress()).toBe("100");
})

test('getStress determines stress of "unsuspecting"', () => {
  const unsuspecting = new Pron("AH2 N S AH0 S P EH1 K T IH0 NG");
  const stress = unsuspecting.getStress();
  expect(stress).toBe('2010');
})

test('getLastPrime finds last primary stress correctly', () => {
  expect(new Pron("T EH1 S T").getLastPrime(["T", "EH1", "S", "T"])).toBe(1);
  expect(new Pron("AH2 N S AH0 S P EH1 K T IH0 NG").getLastPrime(["AH2", "N", "S", "AH0", "S", "P", "EH1", "K", "T", "IH0", "NG"])).toBe(6);
  expect(new Pron("Y EH3 T").getLastPrime(["Y", "EH3", "T"])).toBe(1);
  expect(new Pron("AH3 N S AH3 S P EH3 K T IH3 NG").getLastPrime(["AH3", "N", "S", "AH3", "S", "P", "EH3", "K", "T", "IH3", "NG"])).toBe(9);
})

test('new getLastPrime finds last primary stress correctly', () => {
  expect(new Pronunciation("T EH1 S T").getRimes().lastPrime).toBe(1);
  expect(new Pronunciation("AH2 N S AH0 S P EH1 K T IH0 NG").getRimes().lastPrime).toBe(6);
  expect(new Pronunciation("Y EH3 T").getRimes().lastPrime).toBe(1);
  expect(new Pronunciation("AH3 N S AH3 S P EH3 K T IH3 NG").getRimes().lastPrime).toBe(9);
})

test('isAVowel identifies vowels correctly', () => {
  const testWord = new Pron("T EH1 S T");
  expect(testWord.isAVowel("EH1")).toBe(true);
  expect(testWord.isAVowel("T")).toBe(false);
  expect(testWord.isAVowel("S T")).toBe(false);
  expect(testWord.isAVowel("EH ")).toBe(false);
  expect(testWord.isAVowel(" EH")).toBe(false);
})

test('getRimes identifies rimes correctly for "test"', () => {
  const testWord = new Pron("T EH1 S T");
  const rimes = testWord.getRimes();
  expect(rimes.rime).toBe("EH1 S T");
  expect(rimes.nucl).toBe("EH1");
  expect(rimes.coda).toBe("S T");
  expect(rimes.lastRime).toEqual(rimes.rime);
  expect(rimes.lastNucl).toEqual(rimes.nucl);
  expect(rimes.coda).toEqual(rimes.coda);
  expect(rimes.unstRime).toEqual('');
  expect(rimes.unstNucl).toEqual('');
  expect(rimes.unstCoda).toEqual('');
})

test('getRimes identifies rimes correctly for "unsuspecting"', () => {
  const testWord = new Pron("AH2 N S AH0 S P EH1 K T IH0 NG");
  const rimes = testWord.getRimes();
  expect(rimes.rime).toBe("EH1 K T IH0 NG");
  expect(rimes.nucl).toBe("EH1");
  expect(rimes.coda).toBe("K T IH0 NG");
  expect(rimes.lastRime).toEqual(rimes.rime);
  expect(rimes.lastNucl).toEqual(rimes.nucl);
  expect(rimes.coda).toEqual(rimes.coda);
  expect(rimes.unstRime).toBe("IH0 NG");
  expect(rimes.unstNucl).toBe("IH0");
  expect(rimes.unstCoda).toBe("NG");
})

test('getRimes identifies rimes correctly for "objectifying"', () => {
  const testWord = new Pron("AH2 B JH EH1 K T IH0 F AY2 IH0 NG");
  const rimes = testWord.getRimes();
  expect(rimes.rime).toBe("EH1 K T IH0 F AY2 IH0 NG");
  expect(rimes.nucl).toBe("EH1");
  expect(rimes.coda).toBe("K T IH0 F AY2 IH0 NG");
  expect(rimes.lastRime).toBe("AY2 IH0 NG");
  expect(rimes.lastNucl).toBe("AY2");
  expect(rimes.lastCoda).toBe("IH0 NG");
  expect(rimes.unstRime).toBe("IH0 NG");
  expect(rimes.unstNucl).toBe("IH0");
  expect(rimes.unstCoda).toBe("NG");
})