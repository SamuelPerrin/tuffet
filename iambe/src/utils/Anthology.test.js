import Anthology from './Anthology';

const anth = new Anthology("The apparition of these faces in the crowd\nPetals on a wet, black bough\n\n\n\nMe up at does\nout of the floor\nquietly Stare\na poisoned mouse\n\nstill who alive\nis asking What\nhave i done that\nYou wouldn't have");
const anthD = new Anthology("They shut me up in Prose–\nAs when a little Girl\nThey put me in the Closet–\nBecause they liked me \"still\"–\n\nStill! Could themself have peeped–\nAnd seen my Brain–go round–\nThey might as wise have lodged a Bird\nFor Treason–in the Pound–\n\n\n\nAs if I asked a common alms–\nAnd in my wandering hand,\nA stranger pressed a kingdom–\nAnd I–bewildered stand–\n\nAs if I asked the Orient\nHad it for me a morn?\nAnd it sh'd lift its purple dikes\nAnd flood me with the Dawn!");

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
          words:["floor", "stare"],
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
          words:["what", "that"],
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

test('getLineMeters identifies meter for each line', () => {
  const meters = anth.getLineMeters();
  expect(meters[1][1][1]).toStrictEqual({feet:[[2, 1], [4, 2]], foots:['I', 'I'], label: {rhythm:'iambic', meter:2, catalexis:false}});
})

test('getMeterStatsByStanza counts meters by stanza', () => {
  const meterStats = anth.getMeterStatsByStanza();
  expect(meterStats.alexandrines).toBe(0);
  expect(meterStats['N/A']).toBe(3);

  const meterStatsD = anthD.getMeterStatsByStanza();
  expect(meterStatsD['short meter']).toBe(2);
  expect(meterStatsD['common meter']).toBe(2);
})

test('getStanzaMeters returns stanza meters', () => {
  const stanzaMeters = anth.getStanzaMeters();
  expect(stanzaMeters[1][1]).toBe("N/A");

  const stanzaMetersD = anthD.getStanzaMeters();
  expect(stanzaMetersD[0][1]).toBe("short meter");
})