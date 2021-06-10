import Anthology from '../utils/Anthology';

export const GET_RHYMES = 'GET_RHYMES';
export const GET_RHYME_SCHEME_DETAILS = 'GET_RHYME_SCHEME_DETAILS';
export const GET_RHYME_TYPE_DETAILS = 'GET_RHYME_TYPE_DETAILS';
export const GET_METER = 'GET_METER';
export const GET_LINE_METER_DETAILS = 'GET_LINE_METER_DETAILS';
export const GET_METER_TYPE_DETAILS = 'GET_METER_TYPE_DETAILS';
export const GET_STANZA_METER_DETAILS = 'GET_STANZA_METER_DETAILS';
export const SET_LINE_NUM = 'SET_LINE_NUM';

export const getRhymes = poetry => {
  const anth = new Anthology(poetry);
  return {type:GET_RHYMES, payload:{
  poetry: poetry,
  poems: anth.getPoems(),
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
  poems: anth.getPoems(),
  stanzaMeters: anth.getStanzaMeters(),
  stanzaMeterCounts: anth.getMeterStatsByStanza(),
}}};

export const getLineMeterDetails = num => ({type:GET_LINE_METER_DETAILS, payload:{stanzaNum: num}}); // this is the same as getRhymeSchemeDetails: refactor?

export const getMeterTypeDetails = meterType => ({type:GET_METER_TYPE_DETAILS, payload:{mt: meterType}});

export const getStanzaMeterDetails = stanzaType => ({type:GET_STANZA_METER_DETAILS, payload:{stanzaType: stanzaType}});

export const setLineNum = num => ({type:SET_LINE_NUM, payload:{lineNum: num}});