import Stanza from './Stanza';

test('constructor sets text attribute', () => {
  const metro = new Stanza("The apparition of these faces in a crowd\nPetals on a wet, black bough");
  expect(metro.text).toBe("The apparition of these faces in a crowd\nPetals on a wet, black bough");
});

test('getLines splits stanza into a list', () => {
  const metro = new Stanza("The apparition of these faces in a crowd\nPetals on a wet, black bough");
  expect(metro.getLines()).toEqual(["The apparition of these faces in a crowd", "Petals on a wet, black bough"]);
});