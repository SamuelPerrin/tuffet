import Line from './Line';

test('constructor trims extra spaces', () => {
  const newLine = new Line(" testing the constructor ");
  expect(newLine.text).toEqual("testing the constructor");
  expect(newLine.text).not.toEqual(" testing the constructor ");
})

test('getTokens splits line into list and removes punctuation', () => {
  const newLine = new Line(`'Tis, better? to: have-loved; "and (lost).`);
  const dashes = new Line(`This–is – a–test–`);
  expect(newLine.getTokens()).toEqual(["'Tis",'better','to','have','loved','and','lost']);
  expect(dashes.getTokens()).toEqual(['This','is','a','test']);
})

test('getTerm returns a list of the last n words in the line in reverse order', () => {
  const newLine = new Line('Let me see, then, what thereat is');
  expect(newLine.getTerm(2)).toEqual(['is','thereat']);
  expect(newLine.getTerm()).toEqual(['is'])
})

test('getStress handles lines with one possible pronunciation', () => {
  const easy = new Line("This line is very easy");
  expect(easy.getStress()).toStrictEqual([2,2,2,1,4,1,4]);

  const handle = new Line("I can also handle this line");
  expect(handle.getStress()).toStrictEqual([2,2,1,4,1,4,2,2]);
})

// test that getStress returns the same thing as resolveCrux when line has mult poss prons


test('getMeter identifies a standard pentameter', () => {
  const keats = new Line("Before my pen has gleaned my teeming brain");
  const keatsMeter = keats.getMeter();
  expect(keatsMeter.feet).toStrictEqual([[4, 1], [3, 2], [2, 2], [3, 1], [4, 2]]);
  expect(keatsMeter.foots).toStrictEqual(['I', 'I', 'U', 'I', 'I']);
  expect(keatsMeter.label.catalexis).toBe(false);
  expect(keatsMeter.label.meter).toBe(5);
  expect(keatsMeter.label.rhythm).toBe("iambic");
})

test('getMeter identifies a short iambic line', () => {
  const dickinson = new Line("Hope is the thing with feathers").getMeter();
  expect(dickinson.feet).toStrictEqual([[2, 2], [3, 2], [3, 1], 4]);
  expect(dickinson.foots).toStrictEqual(['U','I','I','unstr']);
  expect(dickinson.label.catalexis).toBe(true);
  expect(dickinson.label.meter).toBe(4);
  expect(dickinson.label.rhythm).toBe("iambic");
})

test('getMeter identifies a trochaic line requiring correctWeirdFeet TDIstr => TTTT', () => {
  const longfellow = new Line("On the mountains of the prairie").getMeter();
  expect(longfellow.feet).toStrictEqual([[3, 4], [1, 4], [3, 4], [1, 4]]);
  expect(longfellow.foots).toStrictEqual(['T','T','T','T']);
  expect(longfellow.label.catalexis).toBe(false);
  expect(longfellow.label.meter).toBe(4);
  expect(longfellow.label.rhythm).toBe("trochaic");
})

test('getMeter identifies a dactylic line', () => {
  const browning = new Line("Just for a handful of silver he left us").getMeter();
  expect(browning.feet).toStrictEqual([[2, 3, 4], [1, 4, 3], [1, 4, 3], [2, 3]]);
  expect(browning.foots).toStrictEqual(['D','D','D','T']);
  expect(browning.label.catalexis).toBe(false);
  expect(browning.label.meter).toBe(4);
  expect(browning.label.rhythm).toBe("dactylic");
})

test('getMeter identifies an anapestic line', () => {
  const cowper = new Line("I must finish my journey alone").getMeter();
  expect(cowper.feet).toStrictEqual([[2, 2, 1], [4, 3, 1], [4, 4, 1]]);
  expect(cowper.foots).toStrictEqual(['A','A','A']);
  expect(cowper.label.catalexis).toBe(false);
  expect(cowper.label.meter).toBe(3);
  expect(cowper.label.rhythm).toBe("anapestic");
})

test('getMeter uses resolveCrux to identify elision', () => {
  const tennyson = new Line("O dewy flowers that open to the sun").getMeter();
  console.log("tennyson:",tennyson);
  expect(tennyson.feet).toStrictEqual([[3, 1], [4, 2], [2, 1], [4, 3], [4, 2]]);
  expect(tennyson.foots).toStrictEqual(['I','I','I','I','I']);
  expect(tennyson.label.catalexis).toBe(false);
  expect(tennyson.label.meter).toBe(5);
  expect(tennyson.label.rhythm).toBe("iambic");
})