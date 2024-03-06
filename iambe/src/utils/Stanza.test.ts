import Stanza from './Stanza';
import { RhymeScheme, RhymeType } from './phonstants';

test('winnower filters rhymeScheme choices', () => {
  const possibles = [
    {rs: RhymeScheme.quatr, pairs: ['twofour']},
    {rs: RhymeScheme.ababx, pairs: ['onethree', 'twofour']},
    {rs: RhymeScheme.abbax, pairs: ['onefour', 'twothree']},
    {rs: RhymeScheme.aaaax, pairs: ['onetwo', 'onethree', 'onefour', 'twothree', 'twofour', 'threefour']},
    {rs: RhymeScheme.cpls2, pairs: ['onetwo', 'threefour']},
    {rs: RhymeScheme.abaax, pairs: ['onethree', 'onefour', 'threefour']},
    {rs: RhymeScheme.aabax, pairs: ['onetwo', 'onefour', 'twofour']},
  ];
  const allScores = {
    'onetwo': 0.11,
    'onethree': 0.1,
    'onefour': 0,
    'twothree': 0,
    'twofour': 0.7,
    'threefour': 0,
  };

  const output = new Stanza('this\nis\na\nfake stanza').winnower(possibles, allScores);

  expect(output).toStrictEqual([RhymeScheme.quatr, RhymeScheme.ababx]);
});

test('getRhymeScheme identifies rhyme schemes in couplets', () => {
  const shells = new Stanza("She sells\nSea shells");
  const crowd = new Stanza("The apparition of these faces in the crowd\nPetals on a wet, black bough");
  const once = new Stanza("Once upon a time\nThere lived a goat");
  expect(shells.getRhymeScheme()).toBe(RhymeScheme.cplt1);
  expect(crowd.getRhymeScheme()).toBe(RhymeScheme.cplt1);
  expect(once.getRhymeScheme()).toBe(RhymeScheme.irreg);
});

test('getRhymeScheme identifies rhyme schemes in tercets', () => {
  const aaaxx = new Stanza("I'm free\nI'm me\nNot thee");
  const aabxx = new Stanza("I know\nYou so\nI laugh a lot");
  const abaxx = new Stanza("I can\nTell you're\nA man");
  expect(aaaxx.getRhymeScheme()).toBe(RhymeScheme.aaaxx);
  expect(aabxx.getRhymeScheme()).toBe(RhymeScheme.aabxx);
  expect(abaxx.getRhymeScheme()).toBe(RhymeScheme.abaxx);
});

test('getRhymeScheme identifies rhyme schemes in quatrains', () => {
  const quatr = new Stanza("To fight aloud is very brave\nBut gallanter I know\nWho charge within the bosom\nThe cavalry of Woe");
  const ababx = new Stanza("Out of the night that covers me,\nBlack as the pit from pole to pole\nI thank whatever gods may be\nFor my unconquerable soul.");
  const abbax = new Stanza("We have but faith: we cannot know;\nFor knowledge is of things we see\nAnd yet we trust it comes from thee,\nA beam in darkness: let it grow.");
  const aaaax = new Stanza("the night\nis tight\nin flight\nno light");
  const cpls2 = new Stanza("I know\nYou so\nI like\nA spike");
  const abaax = new Stanza("I see\nA yellow\nBee\nIn a tree");
  const aabax = new Stanza("The day\nIn May\nWas not\nSo gay");
  expect(quatr.getRhymeScheme()).toBe(RhymeScheme.quatr);
  expect(ababx.getRhymeScheme()).toBe(RhymeScheme.ababx);
  expect(abbax.getRhymeScheme()).toBe(RhymeScheme.abbax);
  expect(aaaax.getRhymeScheme()).toBe(RhymeScheme.aaaax);
  expect(cpls2.getRhymeScheme()).toBe(RhymeScheme.cpls2);
  expect(abaax.getRhymeScheme()).toBe(RhymeScheme.abaax);
  expect(aabax.getRhymeScheme()).toBe(RhymeScheme.aabax);
});

test('getRhymeScheme identifies rhyme schemes in quintains', () => {
  const splt1 = new Stanza("To fight aloud\nIs very brave\nBut gallanter I know\nWho charge within the bosom\nThe cavalry of Woe");
  const aabba = new Stanza("And how the swift beat of the brain\nFalters because it is in vain,\nIn Autumn at the fall of the leaf\nKnowest thou not? and how the chief\nOf joys seems—not to suffer pain?");
  expect(splt1.getRhymeScheme()).toBe(RhymeScheme.splt1);
  expect(aabba.getRhymeScheme()).toBe(RhymeScheme.aabba);
});

test('getRhymeScheme identifies rhyme schemes in sestets', () => {
  const compm = new Stanza("Oh fraud that cannot cheat the Bee,\nAlmost thy plausibility\nInduces my belief,\nTill ranks of seeds their witness bear–\nAnd softly thro' the altered air\nHurries a timid leaf.");
  const babab = new Stanza("She walks in beauty, like the night\nOf cloudless climes and starry skies;\nAnd all that's best of dark and bright\nMeet in her aspect and her eyes;\nThus mellowed to that tender light\nWhich heaven to gaudy day denies.");
  expect(compm.getRhymeScheme()).toBe(RhymeScheme.compm);
  expect(babab.getRhymeScheme()).toBe(RhymeScheme.babab);
});

test('getRhymes identifies rhymes in couplets', () => {
  const cplt = new Stanza('I know\nThe woe');
  const crowd = new Stanza("The apparition of these faces in the crowd\nPetals on a wet, black bough");
  
  expect(cplt.getRhymes()[0].rhymeType).toStrictEqual(RhymeType.fullRhyme);
  expect(crowd.getRhymes()[0].rhymeType).toStrictEqual(RhymeType.assonance);
});