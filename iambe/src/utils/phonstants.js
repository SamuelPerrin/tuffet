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
export const ALPHA_VOWELS = {'a':true, 'e':true, 'è':true, 'i':true, 'o':true, 'u':true};
export const SHORT_VOWELS = {'a':'AE2 ','e':'EH2 ','è':'IH0 ','i':'IH0 ','o':'AA2 ','u':'AH2 '};
export const LONG_VOWELS = {'a':'EY1 ','e':'IY1 ','i':'AY1 ','o':'OW1 ','u':'UW1 ','y':'AY1 '};
export const TERM_VOWELS = {'a':'AH0 ','i':'IY2 ','o':'OW2 ','u':'UW2 '};
export const CONSONANTS = {'b':'B ','c':'K ','d':'D ','f':'F ','g':'G ','h':'HH ','j':'JH ','k':'K ','l':'L ','m':'M ','n':'N ','p':'P ','s':'S ','t':'T ','v':'V ', 'x':'K S ','z':'Z '};
export const DIGRAPHS = {'ai':'EY1 ', 'au':'AO1 ', 'aw':'AO1 ', 'ay':'EY1 ', 'ea':'IY1 ', 'ee':'IY1 ', 'ei':'IY1 ', 'eu':'Y UW1 ', 'ew':'Y UW1 ', 'ey':'IY1 ', 'ie':'IY1 ', 'io':'AH0 ', 'oa':'OW1 ', 'oi':'OY1 ', 'oo':'UW1 ', 'ou':'AW1 ', 'ow':'AW1 ', 'oy':'OY1 ','ua':'W EY1 ', 'ue':'EH1 '};
export const DIGRAMS = {'bb':'B ', 'bl': 'B L ', 'br': 'B R ', 'ch':'CH ', 'ck':'K ', 'cl':'K L ', 'cr':'K R ', 'ct':'K T ', 'dd': 'D ', 'dg':'JH ', 'dr':'D R ', 'ff':'F ', 'fl':'F L ', 'fr':'F R ', 'ft': 'F T ', 'gg':'G ', 'gh':'', 'gl':'G L ', 'gr':'G R ', 'ld':'L D ', 'lf':'L F ', 'lk':'L K ', 'll':'L ', 'lm':'L M ', 'ln':'L N ', 'lp':'L P ', 'lt':'L T ', 'mb':'M ', 'mm':'M ', 'mp':'M P ', 'nd':'N D ', 'ng':'NG ', 'nk':'NG K ', 'nn':'N ', 'nt':'N T ', 'ph':'F ', 'pl':'P L ', 'pp':'P ', 'pr':'P R ', 'ps':'P S ', 'pt':'P T ', 'qu':'K W ', 'rr':'R ', 'sh':'SH ', 'sk':'S K ', 'sl':'S L ', 'sm':'S M ', 'ss':'S ', 'st':'S T ', 'th':'TH ', 'tr':'T R ', 'tt':'T ', 'vv':'V ', 'wh':'W ', 'wr':'R ', 'xx':'K S ', 'zz':'Z '};
export const VOWEL_R = {'ar':'AA1 R ', 'er':'ER0 ', 'ir': 'AY1 R ', 'or': 'AO1 R ', 'ur':'ER2 '};
export const TRIGRAPHS = {'are':'EH1 R ','eau':'OW1 ','eou':'IY0 AH3 ','ere':'IY1 R ','eue':'Y UW1 ','ieu':'Y UW1 ','iai':'IY0 EY1 ','iou':'IY0 AH3 ','ire':'AY1 R ','ore':'AO1 R ','oui':'UW1 IH0 ','uou':'UH0 AH3 ','ure':'ER0 '};
export const TRIGRAMS = {'fth':'F TH ', 'ght':'T ','lch':'L CH ', 'ldr':'L D R ', 'lph':'L F ', 'lth':'L TH ', 'ltr':'L T R ', 'mbr':'M B R ', 'mpr':'M P R ', 'mpt':'M P T ', 'nch':'N CH ', 'ncl':'N K L ', 'ndr':'N D R ', 'nfr':'N F R ', 'ngd':'NG D ', 'ngl':'NG L ', 'ngr':'NG R ', 'nst':'N S T ', 'nth':'N TH ', 'ntr':'N T R ', 'rld':'R L D ', 'sch':'SH ', 'scl':'S K L ', 'scr':'S K R ', 'shr':'SH R ', 'skr':'S K R ', 'spl':'S P L ', 'spr':'S P R ', 'str':'S T R ', 'tch':'CH ', 'thr':'TH R ', 'xcr':'K S K R ', 'xpr':'K S P R ', 'xtr':'K S T R '};
export const DIGRAPH_R = {'air':'EH1 R ','arr':'AA1 R ', 'ear':'IY1 R ', 'eer':'IY1 R ', 'eir':'IY1 R ', 'err':'EH1 R ', 'eur':'UH2 R ', 'ier':'IY1 R ', 'ior':'IY0 AO1 R ', 'irr':'ER1 ', 'oar':'AO1 R ', 'oer':'AO1 R ', 'oir':'W AA1 R ', 'oor':'UH1 R ', 'orr':'AO1 R ', 'our':'AW1 R ','urr':'ER1 '};
export const PUNCTS_TO_DELETE = [',','⁠','.','!','?','"',';',':','(',')']; // the one that looks empty is a zero-width word-joiner
export const PUNCTS_TO_SPACE = ['...','--','—','–','-'];
export const RHYME_FULLNESS = {
  'full rhyme':100,
  'homophone rhyme':95,
  'identical rhyme':90,
  'promotion rhyme':80,
  'mosaic full':79,
  'diph-diph rhyme':76,
  'diph-vow rhyme':75,
  'vow-diph rhyme':74,
  'diph-vow promotion rhyme':72,
  'vow-diph promotion rhyme':71,
  'diph-diph promotion rhyme':70,
  'mosaic slant rhyme':68,
  'sibilant assonance':66,
  'nasal assonance':65,
  'assonance':51,
  'full consonance':50,
  'promotion consonance':40,
  'diph-vow assonance':22,
  'vow-diph assonance':21,
  'diph-diph assonance':20,
  'partial consonance':19,
  'unstressed rhyme':18,
  'diph-vow promotion assonance':17,
  'vow-diph promotion assonance':16,
  'diph-diph promotion assonance':15,
  'anisobaric rhyme':14,
  'zero consonance':10,
  'sibilant consonance':9,
  'nasal consonance':8,
  'N/A':0,
};
export const NASALS = ['M','N','NG'];
export const SIBILANTS = [' S', ' Z', 'SH', 'SH'];
export const DIPHTHONGS = {'AW':true, 'AY':true, 'EY':true, 'OW':true, 'OY':true};