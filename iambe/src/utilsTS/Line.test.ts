import { FootType } from './Foot';
import Line from './Line';
import { LineRhythmType } from './LineMeter';

test('constructor trims extra spaces', () => {
  const newLine = new Line(" testing the constructor");
  expect(newLine.text).toEqual("testing the constructor");
})

test('getTokens splits line into list and removes punctuation', () => {
  const newLine = new Line(`'Tis, better? to: have-loved; "and (lost).`);
  const dashes = new Line(`This–is – a–test–`);
  expect(newLine.getTokens()).toEqual(["'Tis",'better','to','have','loved','and','lost']);
  expect(dashes.getTokens()).toEqual(['This','is','a','test']);
})

test('getTerm returns a list of the last N words in the line in reverse order', () => {
  const newLine = new Line('Let me see, then, what thereat is');
  expect(newLine.getTerm(2)).toEqual(['is','thereat']);
  expect(newLine.getTerm()).toEqual(['is']);
})

test('getStresses handles lines with one possible pronunciation', () => {
  const easy = new Line("This line is very easy");
  expect(easy.getStresses()).toStrictEqual([2,2,2,1,4,1,4]);

  const handle = new Line("I can also handle this line");
  expect(handle.getStresses()).toStrictEqual([2,2,1,4,1,4,2,2]);
})

test('getStress handles a line with multiple possible pronunciations', () => {
  const line = new Line("With hell below and towering heaven above");
  expect(line.getStresses()).toStrictEqual([3, 2, 4, 1, 2, 1, 4, 2, 4, 1]);
})


test('getMeter identifies a standard pentameter', () => {
  const keats = new Line("Before my pen has gleaned my teeming brain");
  const keatsMeter = keats.getMeter();
  expect(keatsMeter.feet.map(foot => foot.stresses)).toStrictEqual([[4, 1], [3, 2], [2, 2], [3, 1], [4, 2]]);
  expect(keatsMeter.feet.map(foot => foot.type)).toStrictEqual([FootType.iamb, FootType.iamb, FootType.unknown, FootType.iamb, FootType.iamb]);
  expect(keatsMeter.isCatalectic()).toBe(false);
  expect(keatsMeter.getMeasures()).toBe(5);
  expect(keatsMeter.getRhythm()).toBe(LineRhythmType.iambic);
})

test('getMeter identifies a short iambic line', () => {
  const dickinson = new Line("Hope is the thing with feathers").getMeter();
  expect(dickinson.feet.map(foot => foot.stresses)).toStrictEqual([[2, 2], [3, 2], [3, 1], [4]]);
  expect(dickinson.feet.map(foot => foot.type)).toStrictEqual([FootType.unknown, FootType.iamb, FootType.iamb, FootType.unstressed]);
  expect(dickinson.isCatalectic()).toBe(true);
  expect(dickinson.getMeasures()).toBe(4);
  expect(dickinson.getRhythm()).toBe(LineRhythmType.iambic);
})

test('getMeter identifies a trochaic line requiring correctWeirdFeet TDIstr => TTTT', () => {
  const longfellow = new Line("On the mountains of the prairie").getMeter();
  expect(longfellow.feet.map(foot => foot.stresses)).toStrictEqual([[3, 4], [1, 4], [3, 4], [1, 4]]);
  expect(longfellow.feet.map(foot => foot.type)).toStrictEqual(new Array(4).fill(FootType.trochee));
  expect(longfellow.isCatalectic()).toBe(false);
  expect(longfellow.getMeasures()).toBe(4);
  expect(longfellow.getRhythm()).toBe(LineRhythmType.trochaic);
})

test('getMeter identifies a dactylic line', () => {
  const browning = new Line("Just for a handful of silver he left us").getMeter();
  expect(browning.feet.map(foot => foot.stresses)).toStrictEqual([[2, 3, 4], [1, 4, 3], [1, 4, 3], [2, 3]]);
  expect(browning.feet.map(foot => foot.type)).toStrictEqual([FootType.dactyl, FootType.dactyl, FootType.dactyl, FootType.trochee]);
  expect(browning.isCatalectic()).toBe(true);
  expect(browning.getMeasures()).toBe(4);
  expect(browning.getRhythm()).toBe(LineRhythmType.dactylic);
})

test('getMeter identifies an anapestic line', () => {
  const cowper = new Line("I must finish my journey alone").getMeter();
  expect(cowper.feet.map(foot => foot.stresses)).toStrictEqual([[2, 2, 1], [4, 3, 1], [4, 4, 1]]);
  expect(cowper.feet.map(foot => foot.type)).toStrictEqual([FootType.anapest, FootType.anapest, FootType.anapest]);
  expect(cowper.isCatalectic()).toBe(false);
  expect(cowper.getMeasures()).toBe(3);
  expect(cowper.getRhythm()).toBe(LineRhythmType.anapestic);
})

test('getMeter uses resolveCrux to identify elision', () => {
  const tennyson = new Line("O dewy flowers that open to the sun").getMeter();
  expect(tennyson.feet.map(f => f.stresses)).toStrictEqual([[3, 1], [4, 2], [2, 1], [4, 3], [4, 2]]);
  expect(tennyson.feet.map(f => f.type)).toStrictEqual([FootType.iamb, FootType.iamb, FootType.iamb, FootType.iamb, FootType.iamb]);
  expect(tennyson.isCatalectic()).toBe(false);
  expect(tennyson.getMeasures()).toBe(5);
  expect(tennyson.getRhythm()).toBe(LineRhythmType.iambic);
})

test('getMeter identifies long iambic lines', () => {
  const lewis2 = new Line("The entry's forced; its guardians have been butchered all.").getMeter();
  expect(lewis2.feet.map(f => f.stresses)).toStrictEqual([[3, 1], [4, 2], [2, 1], [4, 2], [2, 1], [4, 2]]);
  expect(lewis2.feet.map(f => f.type)).toStrictEqual(new Array(6).fill(FootType.iamb));
  expect(lewis2.getMeasures()).toBe(6);
})

test('equalizeVowels counts correctly', () => {
  const phone = new Line("phone").equalizeVowels("phone",1,2,[1]);
  const meagre = new Line("meagre").equalizeVowels("meagre",2,3,[1,4]);
  const beautiful = new Line("beautiful").equalizeVowels("beautiful",3,5,[1,4,3]);
  const mouse = new Line("mouse").equalizeVowels("mouse",1,3,[2]);
  const fateful = new Line("fateful").equalizeVowels("fateful",2,3,[1,4]);
  const every = new Line("every").equalizeVowels("every",2,3,[1,4]);
  expect(phone.silentEs).toBe(1);
  expect(meagre.diphthongCount).toBe(1);
  expect(beautiful.toRemove).toStrictEqual([2,3]);
  expect(mouse.diphthongCount).toBe(1);
  expect(mouse.silentEs).toBe(1);
  expect(fateful.toRemove).toStrictEqual([3]);
  expect(every.toRemove).toStrictEqual([2]);
})

test('getLinesVowels identifies pronounced vowels', () => {
  const line = new Line("A beautiful mouse is a fateful, antique, meagre phone").getVowelPositions();
  expect(line[0].word).toBe('A');
  expect(line[1].word).toBe('beautiful');
  expect(line[2].vowelPositions).toStrictEqual([1]);
  expect(line[5].vowelPositions).toStrictEqual([1,5]);
  expect(line[6].vowelPositions).toStrictEqual([0,3]);
  expect(line[7].vowelPositions).toStrictEqual([1,5]);
})

test('getLinesVowels identifies vowels in this line', () => {
  const line = new Line(`And view the Landscape o'er"`);
  const vowelPositions = line.getVowelPositions();
  expect(line.getMeter().feet.map(f => f.stresses).flat()).toStrictEqual([2, 2, 3, 1, 2, 2]);
  expect(vowelPositions[0].word).toBe('And');
  expect(vowelPositions[1].vowelPositions).toStrictEqual([1]);
  expect(vowelPositions[3].vowelPositions).toStrictEqual([1,6]);
  expect(vowelPositions[4].vowelPositions).toStrictEqual([0]);
})

test('getMarkString identifies stresses in a sample line', () => {
  const sonnet30 = new Line("And moan th' expense of many a vanish'd sight;");
  expect(sonnet30.getMarkString()).toBe('×    /       ×  /    ×   /   ×  / ×      /     ');
  expect(sonnet30.getMeter().feet.map(f => f.stresses)).toStrictEqual([[2, 2], [4, 1], [3, 2], [4, 1], [4, 2]]);
  expect(sonnet30.getMeter().feet.map(f => f.type)).toStrictEqual([FootType.unknown, FootType.iamb, FootType.iamb, FootType.iamb, FootType.iamb]);
})

test('getMarkString identifies stresses in this line', () => {
  const d = new Line(`In calmness made, and sees what he foresaw;`);
  expect(d.getMeter().feet.map(f => f.stresses).flat()).toStrictEqual([3, 1, 4, 2, 2, 2, 2, 3, 2, 1]);
  const oer = d.equalizeVowels("foresaw",2,3,[2, 1]);
  expect(oer.toRemove).toStrictEqual([3]);
})