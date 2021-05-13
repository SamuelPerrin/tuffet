import Rhyme from './Rhyme';
import Stanza from './Stanza';

test('constructor sets text attribute', () => {
  const metro = new Stanza("The apparition of these faces in a crowd\nPetals on a wet, black bough");
  expect(metro.text).toBe("The apparition of these faces in a crowd\nPetals on a wet, black bough");
});

test('getLines splits stanza into a list', () => {
  const metro = new Stanza("The apparition of these faces in a crowd\nPetals on a wet, black bough");
  expect(metro.getLines()).toEqual(["The apparition of these faces in a crowd", "Petals on a wet, black bough"]);
});

test('winnower filters rhymeScheme choices', () => {
  const possibles = [
    {rs:'quatr', pairs:['twofour']},
    {rs:'ababx', pairs:['onethree', 'twofour']},
    {rs:'abbax', pairs:['onefour', 'twothree']},
    {rs:'aaaax', pairs:['onetwo', 'onethree', 'onefour', 'twothree', 'twofour', 'threefour']},
    {rs:'cpls2', pairs:['onetwo', 'threefour']},
    {rs:'abaax', pairs:['onethree', 'onefour', 'threefour']},
    {rs:'aabax', pairs:['onetwo', 'onefour', 'twofour']},
  ];
  const allScores = {
    'onetwo':0.11,
    'onethree':0.1,
    'onefour':0,
    'twothree':0,
    'twofour':0.7,
    'threefour':0,
  };
  expect(new Stanza('this\nis\na\nfake stanza').winnower(possibles,allScores)).toStrictEqual([['quatr', 0.7],['ababx',(0.7+0.1)/2]]);
});

test("winnower doesn't return a rhyme scheme that would produce too many nonrhymes", () => {
  const possibles = [
    {rs:'quatr', pairs:['twofour']},
    {rs:'ababx', pairs:['onethree', 'twofour']},
    {rs:'abbax', pairs:['onefour', 'twothree']},
    {rs:'abaax', pairs:['onethree', 'onefour', 'threefour']},
    {rs:'aabax', pairs:['onetwo', 'onefour', 'twofour']},
  ];
  const allScores = {
    'onetwo':0,
    'onethree':0,
    'onefour':0,
    'twothree':0,
    'twofour':0.7,
    'threefour':1,
  };
  expect(new Stanza('this\nis\na\nfake stanza').winnower(possibles, allScores)).toStrictEqual('N/A');
});

test('getRhymeScheme identifies rhyme schemes in couplets', () => {
  const shells = new Stanza("She sells\nSea shells");
  const once = new Stanza("Once upon a time\nThere lived a goat");
  expect(shells.getRhymeScheme()).toBe("cplt1");
  expect(once.getRhymeScheme()).toBe("irreg");
})

test('getRhymeScheme identifies rhyme schemes in tercets', () => {
  const aaaxx = new Stanza("I'm free\nI'm me\nNot thee");
  const aabxx = new Stanza("I know\nYou so\nI laugh a lot");
  const abaxx = new Stanza("I can\nTell you're\nA man");
  expect(aaaxx.getRhymeScheme()).toBe("aaaxx");
  expect(aabxx.getRhymeScheme()).toBe("aabxx");
  expect(abaxx.getRhymeScheme()).toBe("abaxx");
});

test('getRhymeScheme identifies rhyme schemes in quatrains', () => {
  const quatr = new Stanza("To fight aloud is very brave\nBut gallanter I know\nWho charge within the bosom\nThe cavalry of Woe");
  const ababx = new Stanza("Out of the night that covers me,\nBlack as the pit from pole to pole\nI thank whatever gods may be\nFor my unconquerable soul.");
  const abbax = new Stanza("We have but faith: we cannot know;\nFor knowledge is of things we see\nAnd yet we trust it comes from thee,\nA beam in darkness: let it grow.");
  const aaaax = new Stanza("the night\nis tight\nin flight\nno light");
  const cpls2 = new Stanza("I know\nYou so\nI like\nA spike");
  const abaax = new Stanza("I see\nA yellow\nBee\nIn a tree");
  const aabax = new Stanza("The day\nIn May\nWas not\nSo gay");
  expect(quatr.getRhymeScheme()).toBe('quatr');
  expect(ababx.getRhymeScheme()).toBe("ababx");
  expect(abbax.getRhymeScheme()).toBe("abbax");
  expect(aaaax.getRhymeScheme()).toBe("aaaax");
  expect(cpls2.getRhymeScheme()).toBe("cpls2");
  expect(abaax.getRhymeScheme()).toBe("abaax");
  expect(aabax.getRhymeScheme()).toBe("aabax");
});

test('getRhymes identifies rhymes in couplets', () => {
  const cplt = new Stanza('I know\nThe woe');
  const cpltRhymes = {lines:['I know','The woe'], words: ['know','woe'], rt:'full rhyme'};
  expect(cplt.getRhymes()).toStrictEqual(cpltRhymes);
});

test('getRhymes identifies rhymes in quatrains', () => {
  const quatr = new Stanza("very brave\nI know\nthe bosom\nof Woe");
  const quatrRhymes = {lines:['very brave','I know','the bosom','of Woe'], words: ['know','Woe'], rt: 'full rhyme'};
  expect(quatr.getRhymes()).toStrictEqual(quatrRhymes);
})