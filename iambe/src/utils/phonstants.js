// this file contains constants to be used in other utils
export const MAKES_PLURAL_WITH_S = {'F':true, 'K':true, 'P':true, 'T':true, 'TH':true,};
export const MAKES_PLURAL_WITH_IZ = {'S':true, 'Z':true, 'SH':true, 'ZH':true, 'CH':true, 'JH':true,};
export const MAKES_PAST_WITH_T = {'F':true, 'K':true, 'P':true, 'S':true, 'SH':true, 'CH':true};
export const MAKES_PAST_WITH_ID = {'T':true, 'D':true}
export const CMUPD_VOWELS = {
  'AA':true,
  'AE':true,
  'AH':true,
  'AO':true, 
  'AW':true,
  'AY':true,
  'EH':true,
  'ER':true,
  'EY':true,
  'IH':true,
  'IY':true,
  'OW':true,
  'OY':true,
  'UH':true,
  'UW':true,
};
export const DETERMINERS = {
  'a':true,
  'an':true,
  'the':true,
  'my':true,
  'thy':true,
  'his':true,
  'its':true,
  'our':true,
  'your':true,
  'their':true,
};
export const PREPOSITIONS = {
  'as':true,
  'at':true,
  'by':true,
  'for':true,
  'from':true,
  'in':true,
  'of':true,
  'on':true,
  'thro':true,
  'through':true,
  'to':true,
  'with':true,
};
export const PER_PRON_OBJ = {
  'me':true,
  'thee':true,
  'him':true,
  'her':true,
  'it':true,
  'us':true,
  'you':true,
  'them':true,
};
export const PER_PRON_SUB = {
  'i':true,
  'thou':true,
  'he':true,
  'she':true,
  'it':true,
  'we':true,
  'you':true,
  'they':true,
};
export const VERB_TO_BE = {
  'am':true,
  'art':true,
  'is':true,
  'are':true,
  'was':true,
  'wast':true,
  'were':true,
  'wert':true,
};
export const ALPHA_VOWELS = new Set(['a', 'e', 'è', 'i', 'o', 'u']);
export const SHORT_VOWELS = {'a':'AE2 ','e':'EH2 ','è':'IH0 ','i':'IH0 ','o':'AA2 ','u':'AH2 '};
export const LONG_VOWELS = {'a':'EY1 ','e':'IY1 ','i':'AY1 ','o':'OW1 ','u':'UW1 ','y':'AY1 '};
export const TERM_VOWELS = {'a':'AH0 ','i':'IY2 ','o':'OW2 ','u':'UW2 '};