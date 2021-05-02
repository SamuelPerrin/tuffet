import Rhyme from './Rhyme';

test('constructor assigns line1 and line2', () => {
  const tuffet = new Rhyme("Little Miss Muffet", "Sat on her tuffet");
  expect(tuffet.line1).toBe("Little Miss Muffet");
  expect(tuffet.line2).toBe("Sat on her tuffet");
});

test('numless removes arabs from a pron', () => {
  const rhyme = new Rhyme("Little Miss Muffet", "Sat on her tuffet");
  expect(rhyme.numless("T AH1 F IH0 T")).toBe("T AH F IH T");
})

test('mosaicize removes doubled consonants and HH' ,() => {
  const soccer = new Rhyme("If you like soccer","We will rock her");
  const appetite = new Rhyme("Such contributions to their appetite","They take, as it were, a padlock, clap it tight");
  expect(soccer.mosaicize(["R", "AA1", "K", "HH", "ER0"])).toBe("R AA1 K ER0");
  expect(appetite.mosaicize(["K", "L", "AE1", "P", "IH3", "T", "T", "AY1", "T"])).toBe("K L AE1 P IH3 T AY1 T");
})