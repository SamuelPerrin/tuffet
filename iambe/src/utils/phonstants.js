
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
export const LONG_VOWELS = {'a':'EY1 ','e':'IY1 ','è':'IH0','i':'AY1 ','o':'OW1 ','u':'UW1 ','y':'AY1 '};
export const TERM_VOWELS = {'a':'AH0 ','i':'IY2 ','o':'OW2 ','u':'UW2 '};
export const CONSONANTS = {'b':'B ','c':'K ','d':'D ','f':'F ','g':'G ','h':'HH ','j':'JH ','k':'K ','l':'L ','m':'M ','n':'N ','p':'P ','s':'S ','t':'T ','v':'V ', 'x':'K S ','z':'Z '};
export const DIGRAPHS = {'ai':'EY1 ', 'au':'AO1 ', 'aw':'AO1 ', 'ay':'EY1 ', 'ea':'IY1 ', 'ee':'IY1 ', 'ei':'IY1 ', 'eu':'Y UW1 ', 'ew':'Y UW1 ', 'ey':'IY1 ', 'ie':'IY1 ', 'io':'AH0 ', 'oa':'OW1 ', 'oe':'OW1', 'oi':'OY1 ', 'oo':'UW1 ', 'ou':'AW1 ', 'ow':'AW1 ', 'oy':'OY1 ','ua':'W EY1 ', 'ue':'EH1 ', 'ui':'AY1 '};
export const DIGRAMS = {'bb':'B ', 'bl': 'B L ', 'br': 'B R ', 'ch':'CH ', 'ck':'K ', 'cl':'K L ', 'cr':'K R ', 'ct':'K T ', 'dd': 'D ', 'dg':'JH ', 'dr':'D R ', 'ff':'F ', 'fl':'F L ', 'fr':'F R ', 'ft': 'F T ', 'gg':'G ', 'gh':'', 'gl':'G L ', 'gr':'G R ', 'ld':'L D ', 'lf':'L F ', 'lk':'L K ', 'll':'L ', 'lm':'L M ', 'ln':'L N ', 'lp':'L P ', 'lt':'L T ', 'mb':'M ', 'mm':'M ', 'mp':'M P ', 'nd':'N D ', 'ng':'NG ', 'nk':'NG K ', 'nn':'N ', 'nt':'N T ', 'ph':'F ', 'pl':'P L ', 'pp':'P ', 'pr':'P R ', 'ps':'P S ', 'pt':'P T ', 'qu':'K W ', 'rr':'R ', 'sh':'SH ', 'sk':'S K ', 'sl':'S L ', 'sm':'S M ', 'ss':'S ', 'st':'S T ', 'th':'TH ', 'tr':'T R ', 'tt':'T ', 'vv':'V ', 'wh':'W ', 'wr':'R ', 'xx':'K S ', 'zz':'Z '};
export const VOWEL_R = {'ar':'AA1 R ', 'er':'ER0 ', 'ir': 'AY1 R ', 'or': 'AO1 R ', 'ur':'ER2 '};
export const TRIGRAPHS = {'are':'EH1 R ','eau':'OW1 ','eou':'IY0 AH3 ','ere':'IY1 R ','eue':'Y UW1 ','ieu':'Y UW1 ','iai':'IY0 EY1 ','iou':'IY0 AH3 ','ire':'AY1 R ','ore':'AO1 R ','oui':'UW1 IH0 ','uou':'UH0 AH3 ','ure':'ER0 '};
export const TRIGRAMS = {'fth':'F TH ', 'ght':'T ','lch':'L CH ', 'ldr':'L D R ', 'lph':'L F ', 'lth':'L TH ', 'ltr':'L T R ', 'mbr':'M B R ', 'mpr':'M P R ', 'mpt':'M P T ', 'nch':'N CH ', 'ncl':'N K L ', 'ndr':'N D R ', 'nfr':'N F R ', 'ngd':'NG D ', 'ngl':'NG L ', 'ngr':'NG R ', 'nst':'N S T ', 'nth':'N TH ', 'ntr':'N T R ', 'rld':'R L D ', 'sch':'SH ', 'scl':'S K L ', 'scr':'S K R ', 'shr':'SH R ', 'skr':'S K R ', 'spl':'S P L ', 'spr':'S P R ', 'str':'S T R ', 'tch':'CH ', 'thr':'TH R ', 'xcr':'K S K R ', 'xpr':'K S P R ', 'xtr':'K S T R '};
export const DIGRAPH_R = {'air':'EH1 R ','arr':'AA1 R ', 'ear':'IY1 R ', 'eer':'IY1 R ', 'eir':'IY1 R ', 'err':'EH1 R ', 'eur':'UH2 R ', 'ier':'IY1 R ', 'ior':'IY0 AO1 R ', 'irr':'ER1 ', 'oar':'AO1 R ', 'oer':'AO1 R ', 'oir':'W AA1 R ', 'oor':'UH1 R ', 'orr':'AO1 R ', 'our':'AW1 R ','urr':'ER1 '};
export const PUNCTS_TO_DELETE = [',','⁠','.','!','?','"',';',':','(',')']; // the one that looks empty is a zero-width word-joiner
export const PUNCTS_TO_SPACE = ['...','--',' – ','—','–','-','  '];
export const RHYME_FULLNESS = {
  'full rhyme':100,
  'homophone rhyme':95,
  'identical rhyme':90,
  'promotion rhyme':80,
  'mosaic full':79,
  'diphthong rhyme':77,
  'diph-diph rhyme':76,
  'diph-vow rhyme':75,
  'vow-diph rhyme':74,
  'promotion diphthong rhyme':73,
  'diph-vow promotion rhyme':72,
  'vow-diph promotion rhyme':71,
  'diph-diph promotion rhyme':70,
  'mosaic slant rhyme':68,
  'sibilant assonance':66,
  'nasal assonance':65,
  'assonance':51,
  'full consonance':50,
  'promotion consonance':40,
  'diphthong assonance':23,
  'diph-vow assonance':22,
  'vow-diph assonance':21,
  'diph-diph assonance':20,
  'partial consonance':19,
  'unstressed rhyme':18,
  'diph-vow promotion assonance':17,
  'vow-diph promotion assonance':16,
  'diph-diph promotion assonance':15,
  'promotion diphthong assonance':14,
  'anisobaric rhyme':13,
  'zero consonance':10,
  'sibilant consonance':9,
  'nasal consonance':8,
  'N/A':0,
};
export const RHYME_SCORE = {
  'full rhyme':1.0,
  'homophone rhyme':0.5,
  'identical rhyme':0.5,
  'promotion rhyme':0.75,
  'mosaic full':0.75,
  'diphthong rhyme':0.75,
  'diph-diph rhyme':0.75,
  'diph-vow rhyme':0.75,
  'vow-diph rhyme':0.75,
  'promotion diphthong rhyme':0.6,
  'diph-vow promotion rhyme':0.6,
  'vow-diph promotion rhyme':0.6,
  'diph-diph promotion rhyme':0.6,
  'mosaic slant rhyme':0.5,
  'sibilant assonance':0.6,
  'nasal assonance':0.6,
  'assonance':0.31,
  'full consonance':0.5,
  'promotion consonance':0.4,
  'diphthong assonance':0.2,
  'diph-vow assonance':0.2,
  'vow-diph assonance':0.2,
  'diph-diph assonance':0.2,
  'partial consonance':0.2,
  'unstressed rhyme':0.2,
  'promotion diphthong assonance':0.2,
  'diph-vow promotion assonance':0.2,
  'vow-diph promotion assonance':0.2,
  'diph-diph promotion assonance':0.2,
  'anisobaric rhyme':0.2,
  'zero consonance':0.33,
  'sibilant consonance':0.1,
  'nasal consonance':0.1,
  'N/A':0.0,
};
export const NASALS = ['M','N','NG'];
export const SIBILANTS = ['S', 'Z', 'SH', 'ZH'];
export const DIPHTHONGS = {'AW':true, 'AY':true, 'EY':true, 'OW':true, 'OY':true};
export const RHYME_SCHEMES = {
  'cplt1':'couplet (AA)',
  'aaaxx':'AAA',
  'aabxx':'AAB',
  'abaxx':'ABA',
  'abbxx':'ABB',
  'quatr':'ABCB',
  'ababx':'ABAB',
  'abbax':'ABBA',
  'aaaax':'AAAA',
  'cpls2':'2 couplets (AABB)',
  'abaax':'ABAA',
  'aabax':'AABA',
  'abccb':'ABCCB',
  'aabcb':'AABCB',
  'splt1':'ABCDC',
  'splt3':'ABCDB',
  'aabab':'AABAB',
  'aabbb':'AABBB',
  'aabbc':'AABBC',
  'ababa':'ABABA',
  'abbaa':'ABBAA',
  'ababb':'ABABB',
  'abbab':'ABBAB',
  'abaab':'ABAAB',
  'aabba':'AABBA',
  'aaabb':'AAABB',
  'compm':'AABCCB',
  'bcbdb':'ABCBDB',
  'babab':'ABABAB',
  'spl13':'ABCDEC',
  'spl12':'ABCDED',
  'cpls3':'AABBCC',
  'babcc':'ABABCC',
  'bacbc':'ABACBC',
  'baccc':'ABACCC',
  'baccb':'ABACCB',
  'bcabc':'ABCABC',
  'bccab':'ABCCAB',
  'a2b3a':'AABBBA',
  'babc3':'ABABCCC',
  'cacbb':'ABCACBB',
  'srima':'ABABACC',
  'royal':'rhyme royal (ABABBCC)',
  'oct24':'ABCDEBFD',
  'oct48':'ABCDEFGD',
  'oc458':'ABCDDEFD',
  'oc148':'AABCDDEC',
  'ocaaa':'AAABCCCB',
  'djuan':'ottava rima (ABABABCC)',
  'quat2':'ABCBDEFE',
  'cpmp3':'AABCCBDDB',
  'raven':'AABCCCBBB',
  'shalo':'AAAABCCCB',
  'spens':'spenserian stanza (ABABBCBCC)',
  'sonit':'Italian sonnet (ABBAABBACDCDCD)',
  'sonsh':'Shakespearean sonnet (ABABCDCDEFEFGG)',
  'sonpe':'Petrarchan sonnet (ABBAABBACDECDE)',
};
export const RHYME_TYPES = {
  'full rhyme':'full rhyme',
  'homophone rhyme':'homophone rhyme',
  'identical rhyme':'identical rhyme',
  'promotion rhyme':'promotion rhyme',
  'mosaic full':'mosaic rhyme',
  'diph-diph rhyme':'diphthong rhyme',
  'diph-vow rhyme':'diphthong rhyme',
  'vow-diph rhyme':'diphthong rhyme',
  'diphthong rhyme':'diphthong rhyme',
  'diph-vow promotion rhyme':'promotion diphthong rhyme',
  'vow-diph promotion rhyme':'promotion diphthong rhyme',
  'diph-diph promotion rhyme':'promotion diphthong rhyme',
  'promotion diphthong rhyme':'promotion diphthong rhyme',
  'mosaic slant rhyme':'mosaic slant rhyme',
  'sibilant assonance':'sibilant assonance',
  'nasal assonance':'nasal assonance',
  'assonance':'assonance',
  'full consonance':'consonance',
  'promotion consonance':'promotion consonance',
  'diphthong assonance':'diphthong assonance',
  'diph-vow assonance':'diphthong assonance',
  'vow-diph assonance':'diphthong assonance',
  'diph-diph assonance':'diphthong assonance',
  'partial consonance':'partial consonance',
  'unstressed rhyme':'unstressed rhyme',
  'diph-vow promotion assonance':'promotion diphthong assonance',
  'vow-diph promotion assonance':'promotion diphthong assonance',
  'diph-diph promotion assonance':'promotion diphthong assonance',
  'promotion diphthong assonance':'promotion diphthong assonance',
  'anisobaric rhyme':'anisobaric rhyme',
  'zero consonance':'zero consonance',
  'sibilant consonance':'sibilant consonance',
  'nasal consonance':'nasal consonance',
  'N/A':'nonrhyme',
};
export const METER_NAMES = {
  2: 'dimeter',
  3: 'trimeter',
  4: 'tetrameter',
  5: 'pentameter',
  6: 'hexameter',
  7: 'heptameter',
  8: 'octameter',
};
export const NONICTUS = '×';
export const ICTUS = '/';
export const UNCERTAIN_ICTUS = '×';
export const ALPHAPLUS = ['a','b','c','d','e','è','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','-',' ',"'","’",'“','”','(',')'];