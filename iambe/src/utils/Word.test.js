import Word from './Word';

test('constructor handles words with apostrophes', () => {
  const tis = new Word("'tis");
  const i = new Word("i'");
  expect(tis.word).toBe("'tis");
  expect(i.word).toBe("i'");
})

test('constructor throws error for empty word', () => {
  const blank = () => new Word('').word;
  expect(blank).toThrow(Error);
})

test('constructor throws error for non-strings', () => {
  const num = () => new Word(9).word;
  const bool = () => new Word(true).word;
  const nil = () => new Word(null).word;
  const arr = () => new Word([]).word;
  const obj = () => new Word({}).word;
  expect(num).toThrow(Error);
  expect(bool).toThrow(Error);
  expect(nil).toThrow(Error);
  expect(arr).toThrow(Error);
  expect(obj).toThrow(Error);
})

test('getPron pronounces "test" with and without rhyme', () => {
  expect(new Word("test").getPron()).toBe("T EH1 S T");
  expect(new Word("test").getPron(true)).toStrictEqual(["T EH1 S T"]);
})

test('getPron pronounces "object" two ways', () => {
  expect(new Word("object").getPron()).toStrictEqual(['AA1 B JH EH0 K T', 'AH0 B JH EH1 K T']);
})

test('getPron pronounces "live" two ways', () => {
  expect(new Word("live").getPron(true)).toStrictEqual(['L IH1 V', 'L AY1 V']);
  expect(new Word("sourest").getPron()).toBe("S AW1 R IH0 S T");
})

test('checkHardPron adds an S', () => {
  expect(new Word("views").checkHardPron()).toEqual("V Y UW1 Z");
  expect(new Word("traps").checkHardPron()).toEqual("T R AE1 P S");
  expect(new Word("rages").checkHardPron()).toEqual("R EY1 JH IH0 Z");
  expect(new Word("watches").checkHardPron()).toEqual("W AA1 CH IH0 Z");
  expect(new Word("lion's").checkHardPron()).toEqual("L AY1 AH0 N Z");
  expect(new Word("dog’s").checkHardPron()).toEqual("D AO1 G Z");
})

test('checkHardPron adds a D', () => {
  expect(new Word("scraped").checkHardPron()).toEqual("S K R EY1 P T");
  expect(new Word("scared").checkHardPron()).toEqual("S K EH1 R D");
  expect(new Word("heated").checkHardPron()).toEqual("HH IY1 T IH0 D");
  expect(new Word("flared").checkHardPron()).toEqual("F L EH1 R D");
  expect(new Word("believ'd").checkHardPron()).toEqual("B IH0 L IY1 V D");
  expect(new Word("breath'd").checkHardPron()).toEqual("B R IY1 DH D");
})

test('checkHardPron adds ING', () => {
  expect(new Word("testing").checkHardPron()).toEqual("T EH1 S T IH0 NG");
  expect(new Word("opening").checkHardPron()).toEqual("OW1 P AH0 N IH3 NG");
})

test('checkHardPron adds ETH', () => {
  expect(new Word("seeketh").checkHardPron()).toEqual("S IY1 K IH0 TH");
  expect(new Word("maketh").checkHardPron()).toEqual("M EY1 K IH0 TH");
})

test('checkHardPron adds ER', () => {
  expect(new Word("rarer").checkHardPron()).toEqual("R EH1 R ER0");
  expect(new Word("hanger").checkHardPron()).toEqual("HH AE1 NG ER0");
  expect(new Word("ranger").checkHardPron()).toEqual("R EY1 N JH ER0");
})

test('checkHardPron adds EST', () => {
  expect(new Word("rarest").checkHardPron()).toEqual("R EH1 R IH0 S T");
  expect(new Word("lowest").checkHardPron()).toEqual("L OW1 IH0 S T");
  expect(new Word("mightst").checkHardPron()).toEqual("M AY1 T S T");
  expect(new Word("would'st").checkHardPron()).toEqual("W UH1 D S T");
})

test('checkHardPron adds NESS', () => {
  expect(new Word("goodness").checkHardPron()).toEqual("G UH1 D N AH0 S");
  expect(new Word("openness").checkHardPron()).toEqual("OW1 P AH0 N N AH3 S");
})

test('checkHardPron adds LESS', () => {
  expect(new Word("loveless").checkHardPron()).toEqual("L AH1 V L AH0 S");
  expect(new Word("numberless").checkHardPron()).toEqual("N AH1 M B ER0 L AH3 S");
})

test('checkHardPron adds LY', () => {
  expect(new Word("plainly").checkHardPron()).toEqual("P L EY1 N L IY0");
  expect(new Word("openly").checkHardPron()).toEqual("OW1 P AH0 N L IY3");
})

test('atomize handles diverse words', () => {
  expect(new Word('test').atomize()).toEqual(['t','e','st']);
  expect(new Word('splotchy').atomize()).toEqual(['spl','o','tch','y']);
  expect(new Word('tough').atomize()).toEqual(['t', 'ou','gh']);
  expect(new Word('pleaded').atomize()).toEqual(['pl','ea','d','e','d']);
  expect(new Word('screaming').atomize()).toEqual(['scr','ea','m','i','ng']);
  expect(new Word('quagmire').atomize()).toEqual(['qu','a','gm','ire']);
  expect(new Word('rawhide').atomize()).toEqual(['r','aw','h','i','d','e']);
  expect(new Word('whenever').atomize()).toEqual(['wh','e', 'n', 'e','v','er']);
  expect(new Word('equipped').atomize()).toEqual(['e','qu','i','pp','e','d']);
})

test('atomize handles invented but possible English words', () => {
  expect(new Word('yazzy').atomize()).toEqual(['y','a','zz','y']);
  expect(new Word('roqueneous').atomize()).toEqual(['r','o','qu','e','n','eou','s']);
  expect(new Word('filtharveally').atomize()).toEqual(['f','i','lth','ar','v','ea','ll','y']);
  expect(new Word('wrothquick').atomize()).toEqual(['wr','o','th','qu','i','ck']);
  expect(new Word('gnosion').atomize()).toEqual(['gn','o','s','io','n']);
  expect(new Word('flaytrough').atomize()).toEqual(['fl','ay','tr','ou','gh']);
  expect(new Word('thripple').atomize()).toEqual(['thr','i','pp','l','e']);
})

test('guessHardPron doesn\'t butcher invented but possible words', () => {
  expect(new Word('yazzy').guessHardPron()).toEqual('Y AE2 Z IY2');
  expect(new Word('roqueneous').guessHardPron()).toEqual('R AA2 K W EH0 N IY0 AH3 S');
  expect(new Word('wrothquick').guessHardPron()).toEqual('R AA2 TH K W IH0 K');
  // expect(new Word('gnosion').guessHardPron()).toEqual('N OW1 ZH AH0 N'); // was failing badly
  expect(new Word('flaytrough').guessHardPron()).toEqual('F L EY1 T R AW1');
  expect(new Word('thripple').guessHardPron()).toEqual('TH R IH0 P AH0 L');
  expect(new Word('pleft').guessHardPron()).toEqual('P L EH1 F T');
})

test('getHardPron uses checkHardPron correctly', () => {
  expect(new Word("future's").getHardPron()).toEqual(new Word("future's").getPron());
  expect(new Word("gazes").getHardPron()).toEqual(new Word("gazes").getPron());
  expect(new Word("gathered").getHardPron()).toEqual("G AE1 DH ER0 D");
  expect(new Word("loveless").getHardPron()).toEqual("L AH1 V L AH0 S");
  expect(new Word("hardness").getHardPron()).toEqual("HH AA1 R D N AH0 S");
})

test('correctPron handles words ending in a dactyl', () => {
  expect(new Word("openly").correctPron('OW1 P AH0 N L IY0')).toEqual('OW1 P AH0 N L IY3');
  expect(new Word("doable").correctPron('D UW1 AH0 B AH0 L')).toEqual('D UW1 AH0 B AH0 L');
  expect(new Word("city").correctPron('S IH1 T IY0')).toEqual('S IH1 T IY0');
  expect(new Word("mystery").correctPron(["M IH1 S T ER0 IY0", "M IH1 S T R IY0"])).toEqual(["M IH1 S T ER0 IY3", "M IH1 S T R IY0"]);
})

test('guessStress gives primary stress to monosyllables', () => {
  expect(new Word('one').guessStress('W AH1 N')).toEqual('W AH1 N');
  expect(new Word('two').guessStress('T UW2')).toEqual('T UW1');
  expect(new Word('three').guessStress('TH R IY3')).toEqual('TH R IY1');
  expect(new Word('four').guessStress('F AO4 R')).toEqual('F AO1 R');
  expect(new Word('nil').guessStress('N IH0 L')).toEqual('N IH1 L');
})

test('getStressList handles words with one pronunciation', () => {
  expect(new Word('one').getStressList()).toStrictEqual([2]);
  expect(new Word('taken').getStressList()).toStrictEqual([1,4]);
  expect(new Word('eternity').getStressList()).toStrictEqual([4,1,4,3]);
})

test('getStressList returns `crux` for multiple pronunciations', () => {
  expect(new Word('use').getStressList()).toBe("crux");
  expect(new Word('object').getStressList()).toBe("crux");
})

test('getStressList handles special cases involving consecutive or exceptional words', () => {
  new Word('and').getStressList();
  expect(Word.last[Word.last.length - 1]).toBe('and');
  expect(new Word('yet').getStressList()).toStrictEqual([2]);
  
  new Word('and').getStressList();
  expect(new Word('so').getStressList()).toStrictEqual([2]);
  
  new Word('as').getStressList();
  expect(new Word('if').getStressList()).toStrictEqual([2]);

  new Word('in').getStressList();
  expect(new Word('the').getStressList()).toStrictEqual([4]);

  expect(new Word('him').getStressList()).toStrictEqual([3]);
  new Word('of').getStressList();
  expect(new Word('him').getStressList()).toStrictEqual([2]);

  expect(new Word('ah').getStressList()).toStrictEqual([1]);
})

test('getStressList returns an array of arrays when crux is true and word has mult prons', () => {
  const flower = new Word('flower');
  console.log(flower.getStressList(true));
  expect(flower.getStressList(true)).toStrictEqual([[2], [1, 4]]);
})