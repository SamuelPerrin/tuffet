import Anthology from '../utils/Anthology';

export const GET_RHYMES = 'GET_RHYMES';
export const GET_RHYME_SCHEME_DETAILS = 'GET_RHYME_SCHEME_DETAILS';
export const GET_RHYME_TYPE_DETAILS = 'GET_RHYME_TYPE_DETAILS';
export const GET_METER = 'GET_METER';
export const GET_LINE_METER_DETAILS = 'GET_LINE_METER_DETAILS';
export const GET_METER_TYPE_DETAILS = 'GET_METER_TYPE_DETAILS';
export const GET_STANZA_METER_DETAILS = 'GET_STANZA_METER_DETAILS';
export const SET_LINE_NUM = 'SET_LINE_NUM';
export const INCREMENT_LINE_NUM = 'INCREMENT_LINE_NUM';
export const DECREMENT_LINE_NUM = 'DECREMENT_LINE_NUM';
export const INCREMENT_STANZA_NUM = 'INCREMENT_STANZA_NUM';
export const DECREMENT_STANZA_NUM = 'DECREMENT_STANZA_NUM';
export const TOGGLE_MENU = 'TOGGLE_MENU';
export const TOGGLE_ABOUT_MENU = 'TOGGLE_ABOUT_MENU';
export const CLOSE_ABOUT_MENU = 'CLOSE_ABOUT_MENU';
export const TOGGLE_SAMPLE_MENU = 'TOGGLE_SAMPLE_MENU';
export const CLOSE_SAMPLE_MENU = 'CLOSE_SAMPLE_MENU';
export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const SAVE_POEM = 'SAVE_POEM';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_ERROR = 'SET_ERROR';
export const SET_MESSAGES = 'SET_MESSAGES';

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

export const crement = (direction, toCrement) => {
  if (direction === 'in' && toCrement === 'lineNum') return {type:INCREMENT_LINE_NUM, payload:{}};
  else if (direction === 'de' && toCrement === 'lineNum') return {type:DECREMENT_LINE_NUM, payload:{}};
  else if (direction === 'in' && toCrement === 'stanzaNum') return {type:INCREMENT_STANZA_NUM, payload:{}};
  else if (direction === 'de' && toCrement === 'stanzaNum') return {type:DECREMENT_STANZA_NUM, payload:{}};
}

export const toggleMenu = () => ({type:TOGGLE_MENU});

export const toggleAboutSubMenu = () => ({type:TOGGLE_ABOUT_MENU});

export const closeAboutSubMenu = () => ({type:CLOSE_ABOUT_MENU});

export const toggleSampleMenu = () => ({type:TOGGLE_SAMPLE_MENU});

export const closeSampleMenu = () => ({type:CLOSE_SAMPLE_MENU});

export const getCurrentUser = (userData) => ({type:GET_CURRENT_USER, payload:userData});

export const savePoem = (poemObj) => ({type:SAVE_POEM, payload:poemObj});

export const signOut = () => ({type:SIGN_OUT});

export const setError = (error) => ({type:SET_ERROR, payload:error});

export const setMessages = (messages) => ({type:SET_MESSAGES, payload:messages});