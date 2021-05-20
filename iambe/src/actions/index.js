import Anthology from '../utils/Anthology';

export const GET_RHYMES = 'GET_RHYMES';
export const GET_RHYME_SCHEME_DETAILS = 'GET_RHYME_SCHEME_DETAILS';
export const GET_RHYME_TYPE_DETAILS = 'GET_RHYME_TYPE_DETAILS';
export const GET_METER = 'GET_METER';

export const getRhymes = poetry => ({type:GET_RHYMES, payload:{
  poetry: poetry,
  rhymes: new Anthology(poetry).getRhymes(),
  rhymeTypeCounts: new Anthology(poetry).getRhymeStats(),
  rhymeSchemeCounts: new Anthology(poetry).getRhymeSchemeStats(),
}});

export const getRhymeSchemeDetails = num => ({type:GET_RHYME_SCHEME_DETAILS, payload:{stanzaNum: num}});

export const getRhymeTypeDetails = rhymeType => ({type:GET_RHYME_TYPE_DETAILS, payload:{rt: rhymeType}});

export const getMeter = poetry => ({type:GET_METER, payload:poetry})