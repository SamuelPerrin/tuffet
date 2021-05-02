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

test('mosaicize removes doubled consonants and HH', () => {
  const soccer = new Rhyme("If you like soccer","We will rock her");
  const appetite = new Rhyme("Such contributions to their appetite","They take, as it were, a padlock, clap it tight");
  expect(soccer.mosaicize(["R", "AA1", "K", "HH", "ER0"])).toBe("R AA1 K ER0");
  expect(appetite.mosaicize(["K", "L", "AE1", "P", "IH3", "T", "T", "AY1", "T"])).toBe("K L AE1 P IH3 T AY1 T");
})

test('getRhymeType identifies full rhyme', () => {
  const pope = new Rhyme("Hope springs eternal in the human breast", "Man never is, but always to be blest");
  const blake = new Rhyme("Tyger, tyger, burning bright","In the forests of the night");
  const shakespeare = new Rhyme("Double, double, toil and trouble","Fire burn and cauldron bubble");
  expect(pope.getRhymeType()).toBe("full rhyme");
  expect(blake.getRhymeType()).toBe("full rhyme");
  expect(shakespeare.getRhymeType()).toBe("full rhyme");
})

test('getRhymeType identifies homophone rhyme', () => {
  const there = new Rhyme("they're","there");
  const here = new Rhyme("I'm here","You hear");
  expect(there.getRhymeType()).toBe("homophone rhyme");
  expect(here.getRhymeType()).toBe("homophone rhyme");
})

test('getRhymeType identifies identical rhyme', () => {
  const captain = new Rhyme("O Captain,","My captain!");
  expect(captain.getRhymeType()).toBe("identical rhyme");
})

test('getRhymeType identifies promotion rhyme', () => {
  const yesterday = new Rhyme("Yesterday","All my troubles seemed so far away");
  const eternity = new Rhyme("Eternity","Melody");
  expect(yesterday.getRhymeType()).toBe("promotion rhyme");
  expect(eternity.getRhymeType()).toBe("promotion rhyme");
})

test('getRhymeType identifies nasal assonance', () => {
  const hung = new Rhyme("Here are the birds that sought the sun", "When last year's distaff idle hung");
  const noon = new Rhyme("A something in a summer's noon", "A depth--an Azure--a perfume!");
  expect(hung.getRhymeType()).toBe("nasal assonance");
  expect(noon.getRhymeType()).toBe("nasal assonance");
})

test('getRhymeType identifies sibilant assonance', () => {
  const eyes = new Rhyme("Dim--long expectant eyes", "Patient till Paradise");
  expect(eyes.getRhymeType()).toBe("sibilant assonance");
})