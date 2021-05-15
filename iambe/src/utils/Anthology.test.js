import Anthology from './Anthology';

test('constructor sets text attribute', () => {
  const anth = new Anthology("The apparition of these faces in the crowd\nPetals on a wet, black bough\n\n\n\nMe up at does\nout of the floor\nquietly Stare\na poisoned mouse\n\nstill who alive\nis asking What\nhave i done that\nYou wouldn't have");
  expect(anth.text).toBe("The apparition of these faces in the crowd\nPetals on a wet, black bough\n\n\n\nMe up at does\nout of the floor\nquietly Stare\na poisoned mouse\n\nstill who alive\nis asking What\nhave i done that\nYou wouldn't have");
});

test('getPoems splits anthology into a list', () => {
  const anth = new Anthology("The apparition of these faces in the crowd\nPetals on a wet, black bough\n\n\n\nMe up at does\nout of the floor\nquietly Stare\na poisoned mouse\n\nstill who alive\nis asking What\nhave i done that\nYou wouldn't have");
  expect(anth.getPoems()).toStrictEqual(["The apparition of these faces in the crowd\nPetals on a wet, black bough","Me up at does\nout of the floor\nquietly Stare\na poisoned mouse\n\nstill who alive\nis asking What\nhave i done that\nYou wouldn't have"]);
});

test('getRhymes returns a list of rhyme objects from each poem', () => {
  const anth = new Anthology("The apparition of these faces in the crowd\nPetals on a wet, black bough\n\n\n\nMe up at does\nout of the floor\nquietly Stare\na poisoned mouse\n\nstill who alive\nis asking What\nhave i done that\nYou wouldn't have");
  expect(anth.getRhymes()).toStrictEqual([
    [
      [
        {
          lines:["The apparition of these faces in the crowd", "Petals on a wet, black bough"],
          words:["crowd", "bough"],
          rt:'assonance'
        }
      ]
    ],
    [
      [
        {
          lines:["Me up at does", "a poisoned mouse"],
          words:["does", "mouse"],
          rt:'sibilant consonance'
        },
        {
          lines:["out of the floor", "quietly Stare"],
          words:["floor", "Stare"],
          rt:'full consonance'
        }
      ],
      [
        {
          lines:["still who alive", "You wouldn't have"],
          words:["alive", "have"],
          rt:"full consonance"
        },
        {
          lines: ["is asking What", "have i done that"],
          words:["What", "that"],
          rt:"full consonance"
        }
      ]
    ]
  ]);
});