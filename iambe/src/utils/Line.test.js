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
  expect(tennyson.feet).toStrictEqual([[3, 1], [4, 2], [2, 1], [4, 3], [4, 2]]);
  expect(tennyson.foots).toStrictEqual(['I','I','I','I','I']);
  expect(tennyson.label.catalexis).toBe(false);
  expect(tennyson.label.meter).toBe(5);
  expect(tennyson.label.rhythm).toBe("iambic");
})

test('getMeter identifies long iambic lines', () => {
  const lewis2 = new Line("The entry's forced; its guardians have been butchered all.").getMeter();
  expect(lewis2.feet).toStrictEqual([[3, 1], [4, 2], [2, 1], [4, 2], [2, 1], [4, 2]]);
  expect(lewis2.foots).toStrictEqual(['I','I','I','I','I','I']);
  expect(lewis2.label.meter).toBe(6);
})

test('getMeter identifies this line', () => {
  const line = new Line("Mutt'ring his wayward fancies he would rove,").getMeter();
  // expect(line.feet).toStrictEqual([[2,3], [2, 2], [3, 1], 4]);
  // expect(line.foots).toStrictEqual(['T','U','I','unstr']);
  // expect(line.label.catalexis).toBe(true);
  // expect(line.label.meter).toBe(4);
  console.log(`line.feet:`,line.feet,`line.foots`,line.foots);
})

test('equalizeVowels counts correctly', () => {
  const phone = new Line("phone").equalizeVowels("phone",1,2,[1]);
  const meagre = new Line("meagre").equalizeVowels("meagre",2,3,[1,4]);
  const beautiful = new Line("beautiful").equalizeVowels("beautiful",3,5,[1,4,3]);
  const mouse = new Line("mouse").equalizeVowels("mouse",1,3,[2]);
  const fateful = new Line("fateful").equalizeVowels("fateful",2,3,[1,4]);
  const every = new Line("every").equalizeVowels("every",2,3,[1,4]);
  expect(phone.silentEs).toBe(1);
  expect(meagre.diphCount).toBe(1);
  expect(beautiful.toRemove).toStrictEqual([2,3]);
  expect(mouse.diphCount).toBe(1);
  expect(mouse.silentEs).toBe(1);
  expect(fateful.toRemove).toStrictEqual([3]);
  expect(every.toRemove).toStrictEqual([2]);
})

test('getLinesVowels identifies pronounced vowels', () => {
  const line = new Line("A beautiful mouse is a fateful, antique, meagre phone").getLinesVowels();
  expect(line[0].word).toBe('A');
  expect(line[1].word).toBe('beautiful');
  expect(line[2].posList).toStrictEqual([1]);
  expect(line[5].posList).toStrictEqual([1,5]);
  expect(line[6].posList).toStrictEqual([0,3]);
  expect(line[7].posList).toStrictEqual([1,5]);
})

test('getMarkString identifies stresses in a sample line', () => {
  const sonnet30 = new Line("And moan th' expense of many a vanish'd sight;");
  expect(sonnet30.getMarkString()).toBe('×    /       ×  /    ×   /   ×  / ×      /     ');
  expect(sonnet30.getMeter().feet).toStrictEqual([[2, 2], [4, 1], [3, 2], [4, 1], [4, 2]]);
  expect(sonnet30.getMeter().foots).toStrictEqual(['U','I','I','I','I']);
})

test('getMarkString identifies stresses in this line', () => {
  const kipling = new Line(`Our Loved Egyptian night?"`);
  expect(kipling.getMeter().feet.flat()).toStrictEqual([3, 2, 4, 1, 4, 2]);
  // const egyptian = kipling.equalizeVowels("Egyptian",3,4,[4,1,4]);
  // expect(egyptian.toRemove).toStrictEqual([6]);
  expect(kipling.getMarkString()).toBe('×    /    × /  ×    /     ');
})