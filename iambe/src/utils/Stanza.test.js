import Stanza from './Stanza';

test('constructor sets text attribute', () => {
  const metro = new Stanza("The apparition of these faces in a crowd\nPetals on a wet, black bough");
  expect(metro.text).toBe("The apparition of these faces in a crowd\nPetals on a wet, black bough");
});

test('getLines splits stanza into a list', () => {
  const metro = new Stanza("The apparition of these faces in a crowd\nPetals on a wet, black bough");
  expect(metro.getLines()).toEqual(["The apparition of these faces in a crowd", "Petals on a wet, black bough"]);
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
})