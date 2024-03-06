import Word from './Word';
import Pronunciation from './Pronunciation';

test('constructor handles words with apostrophes', () => {
  const tis = new Word("'tis");
  const i = new Word("i'");
  expect(tis.text).toBe("'tis");
  expect(i.text).toBe("i'");
});

test('constructor throws error for empty word', () => {
  const blank = () => new Word('').text;
  expect(blank).toThrow(Error);
});

test('getPron pronounces "test" with returnArray true and false', () => {
  expect(new Word("test").getPronunciation(false).toString()).toBe("T EH1 S T");
  expect((new Word("test").getPronunciation(true) as Pronunciation[]).map(p => p.toString())).toStrictEqual(["T EH1 S T"]);
});

test('getPron pronounces "object" two ways', () => {
  expect((new Word("object").getPronunciation(false) as Pronunciation[]).map(p => p.toString())).toStrictEqual(['AA1 B JH EH0 K T', 'AH0 B JH EH1 K T']);
});

test('getPron pronounces "live" two ways', () => {
  expect((new Word("live").getPronunciation(true) as Pronunciation[]).map(p => p.toString())).toStrictEqual(['L IH1 V', 'L AY1 V']);
  expect(new Word("sourest").getPronunciation(false).toString()).toBe("S AW1 R IH0 S T");
});

test('checkHardPron adds a D', () => {
  expect(new Word("scraped").getPronunciation(false).toString()).toEqual("S K R EY1 P T");
  expect(new Word("scared").getPronunciation(false).toString()).toEqual("S K EH1 R D");
  expect(new Word("heated").getPronunciation(false).toString()).toEqual("HH IY1 T IH0 D");
  expect(new Word("flared").getPronunciation(false).toString()).toEqual("F L EH1 R D");
  expect(new Word("believ'd").getPronunciation(false).toString()).toEqual("B IH0 L IY1 V D");
  expect(new Word("breath'd").getPronunciation(false).toString()).toEqual("B R IY1 DH D");
});

test('checkHardPron adds ING', () => {
  expect(new Word("testing").getPronunciation(false).toString()).toEqual("T EH1 S T IH0 NG");
  expect((new Word("opening").getPronunciation(true) as Pronunciation[]).map(p => p.toString())).toEqual(["OW1 P AH0 N IH3 NG", "OW1 P N IH0 NG"]);
});

test('checkHardPron adds ETH', () => {
  expect(new Word("seeketh").getPronunciation(false).toString()).toEqual("S IY1 K IH0 TH");
  expect(new Word("maketh").getPronunciation(false).toString()).toEqual("M EY1 K IH0 TH");
});

test('checkHardPron adds ER', () => {
  expect(new Word("rarer").getPronunciation(false).toString()).toEqual("R EH1 R ER0");
  expect(new Word("hanger").getPronunciation(false).toString()).toEqual("HH AE1 NG ER0");
  expect(new Word("ranger").getPronunciation(false).toString()).toEqual("R EY1 N JH ER0");
});
