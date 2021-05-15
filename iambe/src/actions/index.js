import Anthology from '../utils/Anthology';

export const GET_RHYMES = 'GET_RHYMES';
export const GET_METER = 'GET_METER';

export const getRhymes = poetry => ({type:GET_RHYMES, payload:{
  poetry: poetry,
  rhymes: new Anthology(poetry).getRhymes(),
  rhymeTypeCounts: new Anthology(poetry).getRhymeStats(),
  rhymeSchemeCounts: new Anthology(poetry).getRhymeSchemeStats(),
}})

export const getMeter = poetry => ({type:GET_METER, payload:poetry})