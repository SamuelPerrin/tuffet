import Rhyme from './Rhyme';
import { RhymeType } from './phonstants';

test('getRhymeType identifies full rhyme', () => {
  const pope = new Rhyme("Hope springs eternal in the human breast", "Man never is, but always to be blest");
  const blake = new Rhyme("Tyger, tyger, burning bright","In the forests of the night");
  const shakespeare = new Rhyme("Double, double, toil and trouble","Fire burn and cauldron bubble");
  expect(pope.getRhymeType()).toBe(RhymeType.fullRhyme);
  expect(blake.getRhymeType()).toBe(RhymeType.fullRhyme);
  expect(shakespeare.getRhymeType()).toBe(RhymeType.fullRhyme);
});

test('getRhymeType identifies homophone rhyme', () => {
  const there = new Rhyme("they're","there");
  const here = new Rhyme("I'm here","You hear");
  expect(there.getRhymeType()).toBe(RhymeType.homophoneRhyme);
  expect(here.getRhymeType()).toBe(RhymeType.homophoneRhyme);
});

test('getRhymeType identifies identical rhyme', () => {
  const captain = new Rhyme("O Captain,","My captain!");
  expect(captain.getRhymeType()).toBe(RhymeType.identicalRhyme);
});

test('getRhymeType identifies promotion rhyme', () => {
  const yesterday = new Rhyme("Yesterday","All my troubles seemed so far away");
  const eternity = new Rhyme("Eternity","Melody");
  expect(yesterday.getRhymeType()).toBe(RhymeType.promotionRhyme);
  expect(eternity.getRhymeType()).toBe(RhymeType.promotionRhyme);
});

test('getRhymeType identifies nasal assonance', () => {
  const hung = new Rhyme("Here are the birds that sought the sun", "When last year's distaff idle hung");
  expect(hung.getRhymeType()).toBe(RhymeType.nasalAssonance);
});

test('getRhymeType identifies sibilant assonance', () => {
  const eyes = new Rhyme("Dim--long expectant eyes", "Patient till Paradise");
  const gauze = new Rhyme("Film of gauze", "No more dross");
  const thus = new Rhyme("So thus","I blush");
  expect(eyes.getRhymeType()).toBe(RhymeType.sibilantAssonance);
  expect(gauze.getRhymeType()).toBe(RhymeType.sibilantAssonance);
  expect(thus.getRhymeType()).toBe(RhymeType.sibilantAssonance);
});

test('getRhymeType identifies diphthong rhymes', () => {
  const fate = new Rhyme("You are right","This is fate");
  const boy = new Rhyme("He was a boy","She was a she");
  const hoping = new Rhyme("His eyelids' drooping","His pupils' hoping");
  expect(fate.getRhymeType()).toBe(RhymeType.diphthongRhyme); // diph-diph
  expect(boy.getRhymeType()).toBe(RhymeType.diphthongRhyme); // diph-vow
  expect(hoping.getRhymeType()).toBe(RhymeType.diphthongRhyme); // vow-diph
});

test('getRhymeType identifies diphthong assonance', () => {
  const knife = new Rhyme("a knife","is late");
  const leaf = new Rhyme("two knights","a leaf");
  const disappearing = new Rhyme("is disappearing", "from sight");
  expect(knife.getRhymeType()).toBe(RhymeType.diphthongAssonance); // diph-diph
  expect(leaf.getRhymeType()).toBe(RhymeType.diphthongAssonance); // diph-vow
  expect(disappearing.getRhymeType()).toBe(RhymeType.diphthongAssonance); // vow-diph
});

test('getRhymeType identifies promotion diphthong rhymes', () => {
  const justify = new Rhyme("to justify","his ploy");
  const butterfly = new Rhyme("a butterfly","I oversee");
  const history = new Rhyme("Compose an elegy","For sister May");
  expect(justify.getRhymeType()).toBe(RhymeType.promotionDiphthongRhyme); // diph-diph
  expect(butterfly.getRhymeType()).toBe(RhymeType.promotionDiphthongRhyme); // diph-vow
  expect(history.getRhymeType()).toBe(RhymeType.promotionDiphthongRhyme); // vow-diph
});

test('getRhymeType identifies promotion diphthong assonance', () => {
  const flight = new Rhyme("Yesterday","I took flight");
  const seen = new Rhyme("To justify","The things I have seen");
  const size = new Rhyme("Unluckily","That's not my size!");
  expect(flight.getRhymeType()).toBe(RhymeType.promotionDiphthongAssonance); // diph-diph
  expect(seen.getRhymeType()).toBe(RhymeType.promotionDiphthongAssonance); // diph-vow
  expect(size.getRhymeType()).toBe(RhymeType.promotionDiphthongAssonance); // vow-diph
});

test('getRhymeType identifies zero consonance', () => {
  const me = new Rhyme("Tell me","How");
  const blur = new Rhyme("I prefer","to blur");
  expect(me.getRhymeType()).toBe(RhymeType.zeroConsonance);
  expect(blur.getRhymeType()).not.toBe(RhymeType.zeroConsonance);
});

test('getRhymeType identifies full consonance', () => {
  const sat = new Rhyme("This is not","Where I sat");
  const doubting = new Rhyme("I'm debating","not doubting");
  expect(sat.getRhymeType()).toBe(RhymeType.fullConsonance);
  expect(doubting.getRhymeType()).not.toBe(RhymeType.fullConsonance);
});

test('getRhymeType identifies promotion consonance', () => {
  const satisfied = new Rhyme("I'm satisfied","He said");
  const centigrade = new Rhyme("An attitude","Of centigrade");
  expect(satisfied.getRhymeType()).toBe(RhymeType.promotionConsonance);
  expect(centigrade.getRhymeType()).toBe(RhymeType.promotionConsonance);
});

test('getRhymeType identifies partial consonance', () => {
  const hand = new Rhyme("He said","My hand");
  const bolts = new Rhyme("Stun myself","With bolts");
  expect(hand.getRhymeType()).toBe(RhymeType.partialConsonance);
  expect(bolts.getRhymeType()).toBe(RhymeType.partialConsonance);
});

test('getRhymeType identifies nasal consonance', () => {
  const hung = new Rhyme("He flung","The sand");
  const sent = new Rhyme("I sent","It down");
  const him = new Rhyme("Ask him","A question");
  expect(hung.getRhymeType()).toBe(RhymeType.nasalConsonance);
  expect(sent.getRhymeType()).not.toBe(RhymeType.nasalConsonance);
  expect(him.getRhymeType()).not.toBe(RhymeType.nasalConsonance);
});

test('getRhymeType identifies sibilant consonance', () => {
  const rose = new Rhyme("The rose","Of paradise");
  const splash = new Rhyme("The splash","And buzz");
  const branches = new Rhyme("The branches","Her face")
  expect(rose.getRhymeType()).toBe(RhymeType.sibilantConsonance);
  expect(splash.getRhymeType()).toBe(RhymeType.sibilantConsonance);
  expect(branches.getRhymeType()).not.toBe(RhymeType.sibilantConsonance);
});

test('getRhymeType identifies assonance', () => {
  const goad = new Rhyme("An ox-goad","Is all he knows");
  const thus = new Rhyme("So thus","I blush");
  const crowd = new Rhyme("The apparition of these faces in the crowd","Petals on a wet, black bough");
  expect(goad.getRhymeType()).toBe(RhymeType.assonance);
  expect(thus.getRhymeType()).not.toBe(RhymeType.assonance);
  expect(crowd.getRhymeType()).toBe(RhymeType.assonance);
});

test('getRhymeType identifies anisobaric rhyme', () => {
  const shadow = new Rhyme("Do you know","What's in the shadow");
  const prefer = new Rhyme("better","prefer");
  expect(shadow.getRhymeType()).toBe(RhymeType.anisobaricRhyme);
  expect(prefer.getRhymeType()).toBe(RhymeType.anisobaricRhyme);
});

test('getRhymeType identifies unstressed rhyme', () => {
  const shadow = new Rhyme("There's a shadow","In the window");
  expect(shadow.getRhymeType()).toBe(RhymeType.unstressedRhyme);
});

test('getScore scores rhymes', () => {
  const flight = new Rhyme("The night","No light");
  expect(flight.getScore()).toBe(1);
});

test('resolvePron identifies the pronunciation of live', () => {
  const lihv = new Rhyme("We'll do it live","For take number five");
  const layv = new Rhyme("I can only live","With the money you give");
  expect(lihv.getRhymeType()).toBe(RhymeType.fullRhyme);
  expect(layv.getRhymeType()).toBe(RhymeType.fullRhyme);
});
