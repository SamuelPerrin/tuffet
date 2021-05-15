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
  const gauze = new Rhyme("Film of gauze", "No more dross");
  const thus = new Rhyme("So thus","I blush");
  expect(eyes.getRhymeType()).toBe("sibilant assonance");
  expect(gauze.getRhymeType()).toBe("sibilant assonance");
  expect(thus.getRhymeType()).toBe("sibilant assonance");
})

test('getRhymeType identifies diphthong rhymes', () => {
  const fate = new Rhyme("You are right","This is fate");
  const boy = new Rhyme("He was a boy","She was a she");
  const hoping = new Rhyme("His eyelids' drooping","His pupils' hoping");
  expect(fate.getRhymeType()).toBe("diph-diph rhyme");
  expect(boy.getRhymeType()).toBe("diph-vow rhyme");
  expect(hoping.getRhymeType()).toBe("vow-diph rhyme");
})

test('getRhymeType identifies diphthong assonance', () => {
  const knife = new Rhyme("a knife","is late");
  const leaf = new Rhyme("two knights","a leaf");
  const disappearing = new Rhyme("is disappearing", "from sight");
  expect(knife.getRhymeType()).toBe("diph-diph assonance");
  expect(leaf.getRhymeType()).toBe("diph-vow assonance");
  expect(disappearing.getRhymeType()).toBe("vow-diph assonance");
})

test('getRhymeType identifies promotion diphthong rhymes', () => {
  const justify = new Rhyme("to justify","his ploy");
  const butterfly = new Rhyme("a butterfly","I oversee");
  const history = new Rhyme("a history","of day");
  expect(justify.getRhymeType()).toBe("diph-diph promotion rhyme");
  expect(butterfly.getRhymeType()).toBe("diph-vow promotion rhyme");
  expect(history.getRhymeType()).toBe("vow-diph promotion rhyme");
})

test('getRhymeType identifies promotion diphthong assonance', () => {
  const flight = new Rhyme("Yesterday","I took flight");
  const seen = new Rhyme("To justify","The things I have seen");
  const size = new Rhyme("Unluckily","That's not my size!");
  expect(flight.getRhymeType()).toBe("diph-diph promotion assonance");
  expect(seen.getRhymeType()).toBe("diph-vow promotion assonance");
  expect(size.getRhymeType()).toBe("vow-diph promotion assonance");
})

test('getRhymeType identifies zero consonance', () => {
  const me = new Rhyme("Tell me","How");
  const blur = new Rhyme("I prefer","to blur");
  expect(me.getRhymeType()).toBe("zero consonance");
  expect(blur.getRhymeType()).not.toBe("zero consonance");
})

test('getRhymeType identifies full consonance', () => {
  const sat = new Rhyme("This is not","Where I sat");
  const doubting = new Rhyme("I'm debating","not doubting");
  expect(sat.getRhymeType()).toBe("full consonance");
  expect(doubting.getRhymeType()).not.toBe("full consonance");
})

test('getRhymeType identifies promotion consonance', () => {
  const satisfied = new Rhyme("I'm satisfied","He said");
  const centigrade = new Rhyme("An attitude","Of centigrade");
  expect(satisfied.getRhymeType()).toBe("promotion consonance");
  expect(centigrade.getRhymeType()).toBe("promotion consonance");
})

test('getRhymeType identifies partial consonance', () => {
  const hand = new Rhyme("He said","My hand");
  const bolts = new Rhyme("Stun myself","With bolts");
  expect(hand.getRhymeType()).toBe("partial consonance");
  expect(bolts.getRhymeType()).toBe("partial consonance");
})

test('getRhymeType identifies nasal consonance', () => {
  const hung = new Rhyme("He flung","The sand");
  const sent = new Rhyme("I sent","It down");
  const him = new Rhyme("Ask him","A question");
  expect(hung.getRhymeType()).toBe("nasal consonance");
  expect(sent.getRhymeType()).not.toBe("nasal consonance");
  expect(him.getRhymeType()).not.toBe("nasal consonance");
})

test('getRhymeType identifies sibilant consonance', () => {
  const rose = new Rhyme("The rose","Of paradise");
  const splash = new Rhyme("The splash","And buzz");
  const branches = new Rhyme("The branches","Her face")
  expect(rose.getRhymeType()).toBe("sibilant consonance");
  expect(splash.getRhymeType()).toBe("sibilant consonance");
  expect(branches.getRhymeType()).not.toBe("sibilant consonance");
})

test('getRhymeType identifies assonance', () => {
  const goad = new Rhyme("An ox-goad","Is all he knows");
  const thus = new Rhyme("So thus","I blush");
  expect(goad.getRhymeType()).toBe("assonance");
  expect(thus.getRhymeType()).not.toBe("assonance");
})

test('getRhymeType identifies anisobaric rhyme', () => {
  const shadow = new Rhyme("Do you know","What's in the shadow");
  const prefer = new Rhyme("better","prefer");
  expect(shadow.getRhymeType()).toBe("anisobaric rhyme");
  expect(prefer.getRhymeType()).toBe("anisobaric rhyme");
})

test('getRhymeType identifies unstressed rhyme', () => {
  const shadow = new Rhyme("There's a shadow","In the window");
  expect(shadow.getRhymeType()).toBe("unstressed rhyme");
})

test('getScore scores rhymes', () => {
  const flight = new Rhyme("The night","No light");
  expect(flight.getScore()).toBe(1);
})