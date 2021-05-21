import Anthology from './Anthology';

const anth = new Anthology("The apparition of these faces in the crowd\nPetals on a wet, black bough\n\n\n\nMe up at does\nout of the floor\nquietly Stare\na poisoned mouse\n\nstill who alive\nis asking What\nhave i done that\nYou wouldn't have");

test('constructor sets text attribute', () => {
  const anth = new Anthology("The apparition of these faces in the crowd\nPetals on a wet, black bough\n\n\n\nMe up at does\nout of the floor\nquietly Stare\na poisoned mouse\n\nstill who alive\nis asking What\nhave i done that\nYou wouldn't have");
  expect(anth.text).toBe("The apparition of these faces in the crowd\nPetals on a wet, black bough\n\n\n\nMe up at does\nout of the floor\nquietly Stare\na poisoned mouse\n\nstill who alive\nis asking What\nhave i done that\nYou wouldn't have");
});

test('getPoems splits anthology into a list', () => {
  const anth = new Anthology("The apparition of these faces in the crowd\nPetals on a wet, black bough\n\n\n\nMe up at does\nout of the floor\nquietly Stare\na poisoned mouse\n\nstill who alive\nis asking What\nhave i done that\nYou wouldn't have");
  expect(anth.getPoems()).toStrictEqual(["The apparition of these faces in the crowd\nPetals on a wet, black bough","Me up at does\nout of the floor\nquietly Stare\na poisoned mouse\n\nstill who alive\nis asking What\nhave i done that\nYou wouldn't have"]);
});

test('getRhymes returns a list of rhyme objects from each poem', () => {
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

test('getRhymeStats counts rhymetypes', () => {
  const stats = anth.getRhymeStats();
  expect(stats['assonance']).toBe(1);
  expect(stats['sibilant consonance']).toBe(1);
  expect(stats['full consonance']).toBe(3);
  expect(stats['diphthong rhyme']).toBe(0);
  expect(stats['N/A']).toBe(0);
})

test('getRhymeSchemeStats counts rhyme schemes', () => {
  const stats = anth.getRhymeSchemeStats();
  expect(stats['cplt1']).toBe(1);
  expect(stats['abbax']).toBe(2);
  expect(stats['quatr']).toBe(0);
  expect(stats['irreg']).toBe(0);
  expect(stats['N/A']).toBe(0);
})