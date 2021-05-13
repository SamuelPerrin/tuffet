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
  expect(new Stanza('this\nis\na\nfake stanza').winnower(possibles,allScores)).toStrictEqual(['quatr']);
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

