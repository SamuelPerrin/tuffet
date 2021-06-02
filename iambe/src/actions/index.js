import Anthology from '../utils/Anthology';

export const GET_RHYMES = 'GET_RHYMES';
export const GET_RHYME_SCHEME_DETAILS = 'GET_RHYME_SCHEME_DETAILS';
export const GET_RHYME_TYPE_DETAILS = 'GET_RHYME_TYPE_DETAILS';
export const GET_METER = 'GET_METER';

export const getRhymes = poetry => {
  const anth = new Anthology(poetry);
  return {type:GET_RHYMES, payload:{
  poetry: poetry,
  rhymes: anth.getRhymes(),
  rhymeTypeCounts: anth.getRhymeStats(),
  rhymeSchemeCounts: anth.getRhymeSchemeStats(),
}}};

export const getRhymeSchemeDetails = num => ({type:GET_RHYME_SCHEME_DETAILS, payload:{stanzaNum: num}});

export const getRhymeTypeDetails = rhymeType => ({type:GET_RHYME_TYPE_DETAILS, payload:{rt: rhymeType}});

export const getMeter = poetry => {
  const anth = new Anthology(poetry);
  return {type:GET_METER, payload:{
  poetry: poetry,
  stanzaMeters: anth.getStanzaMeters(),
  stanzaMeterCounts: anth.getMeterStatsByStanza(),
}}};