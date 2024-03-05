import Pronunciation from './Pronunciation';
import Rimes from './Rimes';

test('getStress determines stress of "test" and "openly"', () => {
  const testWord = new Pronunciation("T EH1 S T");
  const testStress = testWord.getStresses();
  expect(testStress).toBe("1");
  const openly = new Pronunciation("OW1 P AH0 N L IY0");
  expect(openly.getStresses()).toBe("100");
})

test('getStress determines stress of "unsuspecting"', () => {
  const unsuspecting = new Pronunciation("AH2 N S AH0 S P EH1 K T IH0 NG");
  const stress = unsuspecting.getStresses();
  expect(stress).toBe('2010');
})

test('getLastPrime finds last primary stress correctly', () => {
  expect(new Pronunciation("T EH1 S T").getRimes().lastPrime).toBe(1);
  expect(new Pronunciation("AH2 N S AH0 S P EH1 K T IH0 NG").getRimes().lastPrime).toBe(6);
  expect(new Pronunciation("Y EH3 T").getRimes().lastPrime).toBe(1);
  expect(new Pronunciation("AH3 N S AH3 S P EH3 K T IH3 NG").getRimes().lastPrime).toBe(9);
})

test('isAVowel identifies vowels correctly', () => {
  expect(Pronunciation.isAVowel("EH1")).toBe(true);
  expect(Pronunciation.isAVowel("T")).toBe(false);
  expect(Pronunciation.isAVowel("S T")).toBe(false);
  expect(Pronunciation.isAVowel("EH ")).toBe(false);
  expect(Pronunciation.isAVowel(" EH")).toBe(false);
})

test('getRimes identifies rimes correctly for "test"', () => {
  const testWord = new Pronunciation("T EH1 S T");
  const rimes = testWord.getRimes();
  expect(rimes.rime).toStrictEqual(new Pronunciation("EH1 S T"));
  expect(rimes.nucl).toStrictEqual(new Pronunciation("EH1"));
  expect(rimes.coda).toStrictEqual(new Pronunciation("S T"));
  expect(rimes.lastRime).toEqual(rimes.rime);
  expect(rimes.lastNucl).toEqual(rimes.nucl);
  expect(rimes.coda).toEqual(rimes.coda);
  expect(rimes.unstRime).toStrictEqual(new Pronunciation(''));
  expect(rimes.unstNucl).toStrictEqual(new Pronunciation(''));
  expect(rimes.unstCoda).toStrictEqual(new Pronunciation(''));
})

test('getRimes identifies rimes correctly for "unsuspecting"', () => {
  const testWord = new Pronunciation("AH2 N S AH0 S P EH1 K T IH0 NG");
  const rimes = testWord.getRimes();
  expect(rimes.rime).toStrictEqual(new Pronunciation("EH1 K T IH0 NG"));
  expect(rimes.nucl).toStrictEqual(new Pronunciation("EH1"));
  expect(rimes.coda).toStrictEqual(new Pronunciation("K T IH0 NG"));
  expect(rimes.lastRime).toEqual(rimes.rime);
  expect(rimes.lastNucl).toEqual(rimes.nucl);
  expect(rimes.coda).toEqual(rimes.coda);
  expect(rimes.unstRime).toStrictEqual(new Pronunciation("IH0 NG"));
  expect(rimes.unstNucl).toStrictEqual(new Pronunciation("IH0"));
  expect(rimes.unstCoda).toStrictEqual(new Pronunciation("NG"));
})

test('getRimes identifies rimes correctly for "objectifying"', () => {
  const testWord = new Pronunciation("AH2 B JH EH1 K T IH0 F AY2 IH0 NG");
  const rimes = testWord.getRimes();
  expect(rimes.rime).toStrictEqual(new Pronunciation("EH1 K T IH0 F AY2 IH0 NG"));
  expect(rimes.nucl).toStrictEqual(new Pronunciation("EH1"));
  expect(rimes.coda).toStrictEqual(new Pronunciation("K T IH0 F AY2 IH0 NG"));
  expect(rimes.lastRime).toStrictEqual(new Pronunciation("AY2 IH0 NG"));
  expect(rimes.lastNucl).toStrictEqual(new Pronunciation("AY2"));
  expect(rimes.lastCoda).toStrictEqual(new Pronunciation("IH0 NG"));
  expect(rimes.unstRime).toStrictEqual(new Pronunciation("IH0 NG"));
  expect(rimes.unstNucl).toStrictEqual(new Pronunciation("IH0"));
  expect(rimes.unstCoda).toStrictEqual(new Pronunciation("NG"));
})