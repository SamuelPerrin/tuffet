import React from 'react';
// import {BlueSpan} from '../components/styled/Spans';

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
export const RHYME_TYPE_DESCRIPTIONS = {
  'full rhyme':<div className={'paragraph'}>
    <p><strong>Full rhyme</strong> is what most people imagine when they think about rhyme. Defining full rhyme linguistically is more complicated than it might seem, but generally speaking a rhyme between two words is full whenever all the sounds match from the last stressed vowel to the end of the word. For example, <i>Tennyson</i> rhymes with <i>venison</i> because the sounds in both words match beginning at the last stressed vowel, [ɛ], and continuing through the end of each word. Likewise, <i>Shelley</i> rhymes with <i>vermicelli</i> because the words match from the last stressed vowel, which again is [ɛ].</p>
    <p>Full rhyme is sometimes called <strong>exact rhyme</strong> or <strong>perfect rhyme</strong>, but these terms can give the impression that rhymes of other types are the result of either a defective ear or laziness on the part of the poet. In fact, many poets consciously choose other types of rhyme because of the effect those rhymes have on the ear.</p>
    <p>Full rhyme can be divided into <strong>masculine rhyme</strong>, <strong>feminine rhyme</strong>, and <strong>triple rhyme</strong>, depending on the number of syllables that the two words share. In masculine rhyme, the last stressed vowel occurs in the final syllable of the word. For instance, <i>Keats–completes</i> is a masculine rhyme because the stressed vowel [i] occurs in the last syllable of each word. In feminine rhyme, the last stressed vowel comes in the penultimate syllable. <i>Shelley–vermicelli</i> is an example of feminine rhyme because the final stressed vowel in both words, [ɛ], is the next-to-last syllable. In triple rhyme, the last stressed vowel is in the antepenultimate syllable. For instance, <i>Tennyson–venison</i> is a triple rhyme because the last stressed vowel, [ɛ], is two syllables before the last syllable of each word.</p>
  </div>,
  'homophone rhyme':<div className={'paragraph'}>
    <p><strong>Homophone rhyme</strong> occurs between any two words that have the same sound but a different spelling. For instance, in the homophone rhyme <i>urn</i>&ndash;<i>earn</i>, both words have all the same sounds. Homophone rhyme differs from full rhyme because in full rhyme, the sounds match only from the last stressed vowel to the end. A rhyme like <i>fair</i>&ndash;<i>fare</i> is homophone rhyme rather than full rhyme because both words match entirely. Homophone rhyme differs from identical rhyme because in identical rhyme, both words have the same spelling in addition to the same sounds.</p>
  </div>,
  'identical rhyme':<div className={'paragraph'}>
    <p>In an <strong>identical rhyme</strong>, both words are spelled and pronounced the same. For instance, in the identical rhyme <i>me</i>&ndash;<i>me</i>, both words have all the same sounds, and they are spelled the same. Identical rhyme differs from homophone rhyme because in homophone rhyme, the words have the same pronunciation but different spellings. Identical rhyme differs from full rhyme because in full rhyme, the sounds match only from the last stressed vowel to the end while in identical rhyme all the sounds match.</p>
  </div>,
  'promotion rhyme':<div className={'paragraph'}>
    <p><strong>Promotion rhyme</strong> is a type of partial rhyme in which at least one of the rhyming syllables has its degree of stress promoted by the meter of the line in which it appears. For instance, in a promotion rhyme like <em>sea</em>&ndash;<em>Eternity</em>, the last syllable of <i>Eternity</i> has its stress promoted by the line&rsquo;s iambic meter from its natural unstressed state to a state of secondary stress. A full rhyme for <i>eternity</i> would be a word like <i>modernity</i>, which matches it from the last stressed vowel, /ɝ/, all the way to the end. In a promotion rhyme, however, <i>sea</i> is made to rhyme with the stress-promoted last syllable of <i>Eternity</i>.</p>
  </div>,
  'mosaic full':<div className={'paragraph'}>
    <p><strong>Mosaic rhyme</strong> is rhyme in which at least one of the rhyme-fellows consists of multiple words strung together to match the sounds of the other. For instance, <i>Shakespeare</i>&ndash;<i>lake&rsquo;s pier</i> is a mosaic rhyme in which two words (<i>lake&rsquo;s pier</i>) are pieced together like tiles in a mosaic to give the impression of a rhyme with the other term (<i>Shakespeare</i>). Even when the sound resemblance is quite close, these are partial rhymes because of the intervening word boundaries, which affect pronunciation.</p>
    <p>The most notorious practitioners of mosaic rhyme in the nineteenth century must include Byron (<i>mahogany</i>&ndash;<i>a dog any</i>) and Robert Browning (<i>appetite</i>&ndash;<i>clap it tight</i>). Whether mosaic rhyme is more tour de force or tour de farce is perhaps best determined on a case-by-case basis. Whatever the case, it must have been in the nineteenth-century Anglophone air, with everyone from Poe (<i>lattice</i>&ndash;<i>thereat is</i>) to Hopkins (<i>I am, and</i>&ndash;<i>diamond</i>) trying their hand at it, often unsuccessfully.</p>
  </div>,
  'diphthong rhyme':<div className={'paragraph'}>
    <p>A diphthong is a vowel sound that glides from one vowel to another. For instance, in the word <i>ride</i>, the diphthong [aɪ] begins at the vowel [a] and glides to a finish toward the vowel [ɪ]. Standard English has several diphthongs, including the vowels in the following words: <i>bait</i>, <i>bite</i>, <i>boat</i>, <i>bout</i>, and <i>boy</i>.</p>
    <p>A <strong>diphthong rhyme</strong> is a rhyme is like a full rhyme with one exception: instead of having matching vowels, a diphthong rhyme has vowels that match only in the second half of the vowel (the &lsquo;off-glide&rsquo;). For instance, in the diphthong rhyme <i>fate</i>&ndash;<i>bright</i>, the [eɪ] diphthong in <i>fate</i> ends at the same place as the [aɪ] diphthong in <i>bright</i>: [ɪ]. In a slightly different variety of diphthong rhyme, the off-glide of a diphthong matches a long vowel. For instance, in the diphthong rhyme <i>Pope</i>&ndash;<i>soup</i>, the off-glide of the diphthong [oʊ] in <i>Pope</i> is equivalent to the long vowel [u] in <i>soup</i>.</p>
    <p>Some kinds of diphthong rhyme are more common in English poetry than you might think. Eye rhymes like <i>how</i>&ndash;<i>slow</i> or <i>frown</i>&ndash;<i>shown</i> sound like diphthong rhymes, and due to changes in the pronunciation of English vowels, pairs like <i>join</i>&ndash;<i>line</i> and <i>smiles</i>&ndash;<i>toils</i> sound like diphthong rhymes in today's Standard English, even though their authors probably thought of them as full rhymes.</p>
    <p>The greatest practitioner of diphthong rhyme in English was Emily Dickinson, whose creative re-imaginings of this pattern extended the category far beyond its humble beginnings.</p>
  </div>,
  'promotion diphthong rhyme':<div className={'paragraph'}>
    <p>A diphthong is a vowel sound that glides from one vowel to another. For instance, in the word <i>ride</i>, the diphthong [aɪ] begins at the vowel [a] and glides to a finish toward the vowel [ɪ]. Standard English has several diphthongs, including the vowels in the following words: <i>bait</i>, <i>bite</i>, <i>boat</i>, <i>bout</i>, and <i>boy</i>.</p>
    <p>A <em>diphthong rhyme</em> is a rhyme is like a full rhyme with one exception: instead of having matching vowels, a diphthong rhyme has vowels that match only in the second half of the vowel (the &lsquo;off-glide&rsquo;). For instance, in the diphthong rhyme <i>fate</i>&ndash;<i>bright</i>, the [eɪ] diphthong in <i>fate</i> ends at the same place as the [aɪ] diphthong in <i>bright</i>: [ɪ]. In a slightly different variety of diphthong rhyme, the off-glide of a diphthong matches a long vowel. For instance, in the diphthong rhyme <i>Pope</i>&ndash;<i>soup</i>, the off-glide of the diphthong [oʊ] in <i>Pope</i> is equivalent to the long vowel [u] in <i>soup</i>.</p>
    <p>A rhyme that combines this diphthong pattern with the stress-pattern of <em>promotion rhyme</em> can be called <strong>promotion diphthong rhyme</strong>. One kind of promotion diphthong is relatively common in traditional English poetry: rhymes like <i>die</i>&ndash;<i>mystery</i> and <i>poetry</i>&ndash;<i>high</i> match a stress-promoted [i] with the off-glide of the diphthong [aɪ].</p>
  </div>,
  'mosaic slant rhyme':'mosaic slant rhyme',
  'sibilant assonance':<div className={'paragraph'}>
    <p>Most types of rhyme rely on the <em>principle of identity</em>, which says that the sounds in rhyming words must be identical, as are the endings in the rhyme <i>Pope</i>&ndash;<i>elope</i>. But another class of rhymes relies on the <em>principle of equivalence</em>, which says that it&rsquo;s enough for the sounds in rhyming words to be equivalent (see Shapiro). Here, <i>equivalent</i> has a special meaning that has to do with a concept linguists call the &ldquo;distinctive features&rdquo; of speech sounds.</p>
    <p>Every speech sound has a set of distinctive features, each of which is a binary value (denoted by + or -), that collectively describe how the sound is produced. For instance, if a speech sound is produced in part by allowing air to escape through the nose&mdash;as in [m], [n], and [ŋ]&mdash;it has the [+ nasal] distinctive feature. If it is produced by directing a high-energy stream of turbulent air toward two surfaces&mdash;as in [s], [z], [dʒ], and [ʃ]&mdash;it has the [+ sibilant] feature.</p>
    <p>For any two speech sounds that differ, they must differ by at least one distinctive feature; for instance, [m] differs from [ŋ] because, although both have the [+ nasal] feature, [m] is [+ labial] while [ŋ] is [- labial] and [m] is [- velar] while [ŋ] is [+ velar]&mdash;all of which is just a technical way of describing the fact that [m] is produced with the lips closed while [ŋ] is produced with the back of the tongue raised to the soft palate.</p>
    <p>When we say that a rhyme obeys the principle of equivalence, what we mean is that, instead of the corresponding sounds of the two words being identical, they are equivalent because they share distinctive features.</p>
    <p><strong>Sibilant assonance</strong> is the name we give to a variety of rhyme obeying the principle of equivalence. For instance, in the sibilant assonance rhyme <i>eyes</i>&ndash;<i>paradise</i>, the /z/ at the end of <i>eyes</i> and the /s/ at the end of <i>paradise</i> are equivalent because they share the distinctive feature [+ sibilant]. The &lsquo;assonance&rsquo; part of the name indicates that both words share the same last stressed vowel, [aɪ]. Sibilant assonance is a rare variety of rhyme, but it is used in the work of Emily Dickinson.</p>
  </div>,
  'nasal assonance':<div className={'paragraph'}>
    <p>Most types of rhyme rely on the <em>principle of identity</em>, which says that the sounds in rhyming words must be identical, as are the endings in the rhyme <i>Pope</i>&ndash;<i>elope</i>. But another class of rhymes relies on the <em>principle of equivalence</em>, which says that it&rsquo;s enough for the sounds in rhyming words to be equivalent (see Shapiro). Here, <i>equivalent</i> has a special meaning that has to do with a concept linguists call the &ldquo;distinctive features&rdquo; of speech sounds.</p>
    <p>Every speech sound has a set of distinctive features, each of which is a binary value (denoted by + or -), that collectively describe how the sound is produced. For instance, if a speech sound is produced in part by allowing air to escape through the nose&mdash;as in [m], [n], and [ŋ]&mdash;it has the [+ nasal] distinctive feature. If it is produced by directing a high-energy stream of turbulent air toward two surfaces&mdash;as in [s], [z], [dʒ], and [ʃ]&mdash;it has the [+ sibilant] feature.</p>
    <p>For any two speech sounds that differ, they must differ by at least one distinctive feature; for instance, [m] differs from [ŋ] because, although both have the [+ nasal] feature, [m] is [+ labial] while [ŋ] is [- labial] and [m] is [- velar] while [ŋ] is [+ velar]&mdash;all of which is just a technical way of describing the fact that [m] is produced with the lips closed while [ŋ] is produced with the back of the tongue raised to the soft palate.</p>
    <p>When we say that a rhyme obeys the principle of equivalence, what we mean is that, instead of the corresponding sounds of the two words being identical, they are equivalent because they share distinctive features.</p>
    <p><strong>Nasal assonance</strong> is the name we give to a variety of rhyme that obeys the principle of equivalence. For instance, in the nasal assonance rhyme <i>hung</i>&ndash;<i>sun</i>, the /ŋ/ at the end of <i>hung</i> and the /n/ at the end of <i>sun</i> are equivalent because they share the distinctive feature [+ nasal]. The &lsquo;assonance&rsquo; part of the name indicates that both words share the same last stressed vowel, [ʌ]. Nasal assonance is uncommon, but it does occur in the work of Emily Dickinson as in <i>run</i>&ndash;<i>come</i> and <i>name</i>&ndash;<i>gain</i>.</p>
  </div>,
  'assonance':<div className={'paragraph'}>
    <p>When the matching sounds in two words are vowel sounds, they may be said to demonstrate <strong>assonance</strong> or <strong>assonantal rhyme</strong>. In an assonantal rhyme like <i>Blake</i>&ndash;<i>fate</i>, both words share the [eɪ] vowel, but all the consonants differ. Assonance differs from full rhyme, in which both the last stressed vowel and any consonants that follow are identical. The opposite of assonance is <em>consonance</em>, in which the only matching sounds are consonant sounds rather than vowels. Assonance in place of end rhyme is not especially common in formal English poetry before the twentieth century, but it is very common in other traditions, including rap and hiphop.</p>
  </div>,
  'full consonance':<div className={'paragraph'}>
    <p><strong>Consonantal rhymes</strong> are rhymes in which the sound resemblance between two words is limited to their consonants (especially consonants coming after the last stressed vowel). For instance, in consonantal rhymes like <i>winds</i>&ndash;<i>stands</i> and <i>light</i>&ndash;<i>forgot</i>, the vowel sounds are different, but the final consonant sounds are identical. Sometimes called <strong>suspended rhyme</strong> or <strong>consonance</strong>, consonantal rhyme has a long history in English poetry. In the work of the hymnist Isaac Watts, for example, consonantal rhymes constitute about one-fourth of all rhymes. Consonance differs from <em>alliteration</em>, in which the matching consonants come at the beginning of the word, rather than at the end.</p>
  </div>,
  'promotion consonance':<div className={'paragraph'}>
    <p>Rhymes that combine the metrical pattern of promotion rhyme with the consonant-matching of consonantal rhyme can be called <strong>promotion consonance</strong>. In such pairings, consonants at the end of words with final stress are made to rhyme with consonants in the stress-promoted last syllable of words with antepenultimate stress. For instance, in the promotion consonance rhyme <i>south</i>&ndash;<i>Nazareth</i>, the [θ] in <i>south</i> rhymes with the [θ] in the stress-promoted last syllable of <i>Nazareth</i>, even though the vowels do not match.</p>
  </div>,
  'diphthong assonance':<div className={'paragraph'}>
    <p>A diphthong is a vowel sound that glides from one vowel to another. For instance, in the word <i>ride</i>, the diphthong [aɪ] begins at the vowel [a] and glides toward the vowel [ɪ]. Standard English has several diphthongs, including the vowels in the following words: <i>bait</i>, <i>bite</i>, <i>boat</i>, <i>bout</i>, and <i>boy</i>. <strong>Diphthong assonance</strong> is a rhyme like assonance with one exception: instead of having matching vowels, a diphthong rhyme has vowels that match only in the second half of the vowel (the &lsquo;off-glide&rsquo;). For instance, in a pairing like <i>Blake</i>&ndash;<i>meet</i>, the off-glide of the diphthong [eɪ] in <i>Blake</i> is equivalent to the [i] vowel in <i>meet</i>.</p>
  </div>,
  'partial consonance':<div className={'paragraph'}>
    <p><strong>Partial consonance</strong> differs from what might be called full consonance because not all of the consonant sounds in a cluster are present in both words. For instance, in the partial consonantal rhyme <i>book</i>&ndash;<i>think</i>, both words share the [k] sound, but <i>book</i> doesn&rsquo;t have the [ŋ] sound that is present in <i>think</i>. In the rhyme <i>dissolved</i>&ndash;<i>proved</i>, both words end in [vd], but <i>dissolved</i>&rsquo;s [l] is missing from <i>proved</i>.</p>
  </div>,
  'unstressed rhyme':<div className={'paragraph'}>
    <p>One way to make a partial rhyme with words that end in unstressed syllables is to ignore the stressed syllables altogether, leaving the sound resemblance to the unstressed syllables alone. Such a rhyme might be called <strong>unstressed rhyme</strong> or <strong>homeoteleuton</strong>, which is Greek for &ldquo;same endings&rdquo;. Traditionally, the term <i>homeoteleuton</i> has referred to the resemblance between the ending of two words when they have the same grammatical endings. Wimsatt gives the example of <i>exstinguendam</i>&ndash;<i>infringendam</i> from Latin, where the <i>-endam</i> ending on both words is something like the <i>-ing</i> at the end of <i>extinguishing</i> and <i>infringing</i> in English.</p>
    <p>For our purposes, <i>unstressed rhyme</i> will refer to the sound resemblance in final, unstressed syllables, whether the endings are the same grammatical morpheme or not, as in <i>window</i>&ndash;<i>meadow</i> or <i>happy</i>&ndash;<i>sorry</i>. Such a sound resemblance may not feel like much of a rhyme at all, but poets do occasionally use them.</p>
  </div>,
  'promotion diphthong assonance':<div className={'paragraph'}>
    <p>A diphthong is a vowel sound that glides from one vowel to another. For instance, in the word <i>ride</i>, the diphthong [aɪ] begins at the vowel [a] and glides to a finish toward the vowel [ɪ]. Standard English has several diphthongs, including the vowels in the following words: <i>bait</i>, <i>bite</i>, <i>boat</i>, <i>bout</i>, and <i>boy</i>. In a rhyme like <strong>promotion diphthong assonance</strong>, instead of having matching vowels, the words&rsquo; vowels match only in the second half of the vowel (the &lsquo;off-glide&rsquo;). For instance, in the promotion diphthong assonance rhyme <i>fate</i>&ndash;<i>justify</i>, the [eɪ] diphthong in <i>fate</i> ends at the same place as the stress-promoted [aɪ] diphthong in <i>justify</i>: [ɪ].</p>
  </div>,
  'anisobaric rhyme':<div className={'paragraph'}>
    <p>Instead of rhyming stressed syllables with stressed and unstressed with unstressed, as in full rhyme, one might also match a stressed syllable with an unstressed, as in <i>be</i>&ndash;<i>happy</i> or <i>go</i>&ndash;<i>sorrow</i>. Such pairs are called <strong>anisobaric rhymes</strong>, from the Greek for &ldquo;unequal weight&rdquo;. Anisobaric rhymes differ from promotion rhymes in one important aspect: the unstressed syllable rhymed in anisobaric pairs is not (and cannot be) promoted by the line&rsquo;s meter. In promotion rhymes, the unstressed &lt;y&gt; in a word like <i>eternity</i> can be stress-promoted in iambic lines because it is two syllables away from the word&rsquo;s primary stress. But in an anisobaric rhyme, the unstressed &lt;y&gt; in a word like <i>happy</i> is directly adjacent to the syllable with primary stress and cannot be promoted without a stress-clash.</p>
  </div>,
  'zero consonance':<div className={'paragraph'}>
    <p>In the work of Emily Dickinson, rhymes words sometimes have only one thing in common: they both have no final consonant sounds. In such rhymes, which we can term <strong>zero consonance</strong>, the only resemblance is that both words end with vowel sounds. For instance, in the rhyme <i>so</i>&ndash;<i>me</i> (from Dickinson&rsquo;s Fr431), the sound resemblance is limited to the lack of final consonants. Though it is uncommon in the work of her predecessors, Dickinson uses such rhymes relatively frequently, often in pairings that feature stress-promotion. Many rhymes that first seem to be zero consonance are better classified as diphthong rhyme.</p>
    <p>Zero consonance is among the most distant rhyme types since the words often don&rsquo;t have any sounds in common. As an example, consider the zero consonance rhyme <i>Doe</i>&ndash;<i>reply</i> from the second stanza of Dickinson&rsquo;s &ldquo;My Life had stood – a Loaded Gun –&rdquo; (Fr764).</p>
  </div>,
  'sibilant consonance':<div className={'paragraph'}>
    <p>Most types of rhyme rely on the <em>principle of identity</em>, which says that the sounds in rhyming words must be identical, as are the endings in the rhyme <i>Pope</i>&ndash;<i>elope</i>. But another class of rhymes relies on the <em>principle of equivalence</em>, which says that it&rsquo;s enough for the sounds in rhyming words to be equivalent (see Shapiro). Here, <i>equivalent</i> has a special meaning that has to do with a concept linguists call the &ldquo;distinctive features&rdquo; of speech sounds.</p>
    <p>Every speech sound has a set of distinctive features, each of which is a binary value (denoted by + or -), that collectively describe how the sound is produced. For instance, if a speech sound is produced in part by allowing air to escape through the nose&mdash;as in [m], [n], and [ŋ]&mdash;it has the [+ nasal] distinctive feature. If it is produced by directing a high-energy stream of turbulent air toward two surfaces&mdash;as in [s], [z], [dʒ], and [ʃ]&mdash;it has the [+ sibilant] feature.</p>
    <p>For any two speech sounds that differ, they must differ by at least one distinctive feature; for instance, [m] differs from [ŋ] because, although both have the [+ nasal] feature, [m] is [+ labial] while [ŋ] is [- labial] and [m] is [- velar] while [ŋ] is [+ velar]&mdash;all of which is just a technical way of describing the fact that [m] is produced with the lips closed while [ŋ] is produced with the back of the tongue raised to the soft palate.</p>
    <p>When we say that a rhyme obeys the principle of equivalence, what we mean is that, instead of the corresponding sounds of the two words being identical, they are equivalent because they share distinctive features.</p>
    <p>One type of rhyme that obeys the principle of equivalence might be called <strong>sibilant consonance</strong>. Such rhymes are a type of consonantal rhyme, but instead of having identical consonants at the end of the two rhyming words, they have consonants that are <em>equivalent</em> because they share the [+ sibilant] distinctive feature. For instance, in the rhyme <i>suffice</i>&ndash;<i>mysteries</i>, the [s] at the end of <i>suffice</i> is equivalent to, but not identical with, the [z] at the end of <i>mysteries</i> since both are [+ sibilant]. Thus, <i>suffice</i>&ndash;<i>mysteries</i> is an example of sibilant consonance. What makes rhymes like this so interesting is that the two words do not need to share any of the same sounds at all, but we can still say that they rhyme. As a result, rhymes of equivalence like sibilant consonance are surely among the most distant sound resemblances that can meaningfully be classified as rhyme.</p>
    <p>Sibilant consonance is present, but quite rare in Emily Dickinson's poems. When it does occur, it is often mistaken for a total lack of rhyme. Many of Dickinson&rsquo;s readers, for instance, miss that <i>Forge</i>&ndash;<i>Blaze</i> in &ldquo;Dare you see a Soul at the &lsquo;White Heat&rsquo;?&rdquo; (Fr401) really is a rhyme, since the [dʒ] at the end of <i>Forge</i> and the [z] at the end of <i>Blaze</i> are both [+ voiced] and [+ sibilant]. Such rhymes, however, are very unusual, even for Dickinson. More often, she will add assonance to such rhymes, perhaps to reinforce the feeling that they are rhymes. For instance, in the rhyme <i>eyes</i>&ndash;<i>Paradise</i> (Fr224), in addition to the sibilant consonance between the [z] in <i>eyes</i> and the [s] in <i>Paradise</i>, both words have the vowel [aɪ].</p>
  </div>,
  'nasal consonance':<div className={'paragraph'}>
    <p>Most types of rhyme rely on the <em>principle of identity</em>, which says that the sounds in rhyming words must be identical, as are the endings in the rhyme <i>Pope</i>&ndash;<i>elope</i>. But another class of rhymes relies on the <em>principle of equivalence</em>, which says that it&rsquo;s enough for the sounds in rhyming words to be equivalent (see Shapiro). Here, <i>equivalent</i> has a special meaning that has to do with a concept linguists call the &ldquo;distinctive features&rdquo; of speech sounds.</p>
    <p>Every speech sound has a set of distinctive features, each of which is a binary value (denoted by + or -), that collectively describe how the sound is produced. For instance, if a speech sound is produced in part by allowing air to escape through the nose&mdash;as in [m], [n], and [ŋ]&mdash;it has the [+ nasal] distinctive feature. If it is produced by directing a high-energy stream of turbulent air toward two surfaces&mdash;as in [s], [z], [dʒ], and [ʃ]&mdash;it has the [+ sibilant] feature.</p>
    <p>For any two speech sounds that differ, they must differ by at least one distinctive feature; for instance, [m] differs from [ŋ] because, although both have the [+ nasal] feature, [m] is [+ labial] while [ŋ] is [- labial] and [m] is [- velar] while [ŋ] is [+ velar]&mdash;all of which is just a technical way of describing the fact that [m] is produced with the lips closed while [ŋ] is produced with the back of the tongue raised to the soft palate.</p>
    <p>When we say that a rhyme obeys the principle of equivalence, what we mean is that, instead of the corresponding sounds of the two words being identical, they are equivalent because they share distinctive features.</p>
    <p><strong>Nasal consonance</strong> is a consonantal rhyme that uses the principle of equivalence such that the equivalence of the terminal consonants is due to their shared [+ nasal] feature. For example, in the rhyme <i>Tongue</i>&ndash;<i>unknown</i> (Fr1112) the [ŋ] at the end of <i>Tongue</i> and the [n] at the end of <i>unknown</i> are equivalent because they are both nasal consonants. In Emily Dickinson's work, nasal consonance is often paired with assonance, so that the rhyming words have identical vowels and equivalent nasal consonants. For instance, in the rhyme <i>noon</i>&ndash;<i>perfume</i>, both words share the vowel [u] and both end with nasal consonants.</p>
  </div>,
  'N/A':'nonrhyme',
};