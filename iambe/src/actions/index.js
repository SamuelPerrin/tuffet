import Stanza from '../utils/Stanza';

export const GET_RHYMES = 'GET_RHYMES';
export const GET_METER = 'GET_METER';

export const getRhymes = poetry => ({type:GET_RHYMES, payload:{poetry: poetry,rs:new Stanza(poetry).getRhymeScheme()}})

export const getMeter = poetry => ({type:GET_METER, payload:poetry})