import Anthology from "./Anthology";
import Pronunciation from "./Pronunciation";
import Word from "./Word";
import Line from "./Line";
import { RhymeType, RhymeScheme } from "./phonstants";
import { FootType } from "./Foot";
import { LineRhythmType } from "./LineMeter";
import { VerseForm } from "./Stanza";

const anth = new Anthology("The apparition of these faces in the crowd\nPetals on a wet, black bough\n\n\n\nMe up at does\nout of the floor\nquietly Stare\na poisoned mouse\n\nstill who alive\nis asking What\nhave i done that\nYou wouldn't have");
const anthD = new Anthology("They shut me up in Prose–\nAs when a little Girl\nThey put me in the Closet–\nBecause they liked me \"still\"–\n\nStill! Could themself have peeped–\nAnd seen my Brain–go round–\nThey might as wise have lodged a Bird\nFor Treason–in the Pound–\n\n\n\nAs if I asked a common alms–\nAnd in my wandering hand,\nA stranger pressed a kingdom–\nAnd I–bewildered stand–\n\nAs if I asked the Orient\nHad it for me a morn?\nAnd it sh'd lift its purple dikes\nAnd flood me with the Dawn!");

test('getRhymes returns a list of rhyme info from each poem', () => {
  const rhymes = anth.getRhymes();
  expect(rhymes[0].length).toBe(1);
  expect(rhymes[1].length).toBe(2);
  expect(rhymes[0][0][0].rhymeType).toBe(RhymeType.assonance);
  expect(rhymes[1][0][0].rhymeType).toBe(RhymeType.sibilantConsonance);
  expect(rhymes[1][1][1].rhymeType).toBe(RhymeType.fullConsonance);
});

test("getRhymeTypeCounts counts rhyme types", () => {
  const counts = anth.getRhymeTypeCounts();
  expect(counts[RhymeType.assonance]).toBe(1);
  expect(counts[RhymeType.sibilantConsonance]).toBe(1);
  expect(counts[RhymeType.fullConsonance]).toBe(3);
  expect(counts[RhymeType.diphthongRhyme]).toBe(0);
  expect(counts[RhymeType.none]).toBe(0);
});

test("getRhymeSchemeCounts counts rhyme schemes", () => {
  const counts = anth.getRhymeSchemeCounts();
  expect(counts[RhymeScheme.cplt1]).toBe(1);
  expect(counts[RhymeScheme.abbax]).toBe(2);
  expect(counts[RhymeScheme.quatr]).toBe(0);
  expect(counts[RhymeScheme.irreg]).toBe(0);
});

test("getLineMeters identifies meter for each line", () => {
  const meters = anth.getLineMeters();
  const lastOne = meters[1][1][1];
  expect(lastOne.feet.map(foot => foot.stresses)).toStrictEqual([
    [2, 1],
    [4, 2]
  ]);
  expect(lastOne.feet.map(foot => foot.type)).toStrictEqual([
    FootType.iamb,
    FootType.iamb
  ]);
  expect(lastOne.getMeasures()).toBe(2);
  expect(lastOne.isCatalectic()).toBe(false);
  expect(lastOne.getRhythm()).toBe(LineRhythmType.iambic);
});

test("getMeterStatsByStanza counts meters by stanza", () => {
  const meterStats = anth.getMeterStatsByStanza();
  expect(meterStats[VerseForm.alexandrines]).toBe(0);
  expect(meterStats[VerseForm.unknown]).toBe(3);

  const meterStatsDickinson = anthD.getMeterStatsByStanza();
  // console.log("meterStatsDickinson", meterStatsDickinson);
  expect(meterStatsDickinson[VerseForm.shortMeter]).toBe(2);
  expect(meterStatsDickinson[VerseForm.commonMeter]).toBe(2);
});

test("getStanzaMeters returns stanzas' meters", () => {
  const stanzaMeters = anth.getStanzaMeters();
  expect(stanzaMeters[1][1]).toBe(VerseForm.unknown);

  const stanzaMetersDickinson = anthD.getStanzaMeters();
  // console.log(stanzaMetersDickinson);
  expect(stanzaMetersDickinson[0][1]).toBe(VerseForm.shortMeter);
})