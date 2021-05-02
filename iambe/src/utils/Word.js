import lexicon from './lexicon';
import Pron from './Pron';
import * as phonstants from './phonstants';

class Word {
  // A string that represents a word
  constructor(word) {
    this.word = word.toLowerCase();
    if (typeof this.word !== "string" || this.word.length === 0) {
      throw this.word.length ? new Error(`"${word}" is not a word.`) : new Error("Word cannot be empty.");
    }
    if (this.word.charAt(0) === "'" && this.word.slice(1,4) !== 'tis' && this.word.slice(1,3) !== 'tw') {
      this.word = this.word.slice(1);
    }
    if (this.word.slice(-1) === "'" && !["th'", "o'", "i'"].includes(this.word)) {
      this.word = this.word.slice(0,-1);
    }
  }

  getPron(rhyme=false) {
    /*
     * Returns the pronunciation of the word in CMUPD symbols from lexicon.
     * Output is a string for words with only one possible pronunciation.
     * Output is an array of strings for words with multiple possible pronunciations.
     * When the parameter `rhyme` is true, output is always a list of possible pronunciations.
     */

    let pron = '';

    // Check the lexicon for the pronunciation
    if (lexicon.hasOwnProperty(this.word)) {
      if (lexicon[this.word].length === 1) {
        pron = rhyme ? lexicon[this.word] : lexicon[this.word][0];
      } else if (rhyme) {
        pron = lexicon[this.word];
      } else {
        // otherwise, if all prons have the same stresses, return first, else return list
        const stressWords = new Set();
        pron = lexicon[this.word];
        for (let prawn of pron) {
          stressWords.add(new Pron(prawn).getStress());
        }
        if (stressWords.length === 1) {
          pron = pron[0];
        }
      }
    }

    // if the lexicon doesn't have the pronunciation, get it from CMUPD, by guessing, or by asking the user
    else {
      // *** add in missing logic here for CMUPD ***
      pron = this.getHardPron();
    }
    pron = this.correctPron(pron);

    return pron;
  }

  correctPron(pron) {
    /*
     * Checks for certain fixable problems in individual prons or lists of prons, returning fixed pron(s)
     * Called by: Word.getPron
     */

    const ENDS_IN_DACTYL = {'100':true,'0100':true,'2100':true,'20100':true,'10200':true};
    let newPron = pron;

    // Correct problems with individual prons
    // add minimal stress to some -y suffixes
    if (typeof pron === 'string') {
      if (new Pron(pron).getStress() in ENDS_IN_DACTYL && pron.slice(-3) === 'IY0') {
        newPron = pron.slice(0,-1) + '3';
      }
    } else if(Array.isArray(pron)) {
      newPron = [];
      for (let nunc of pron) {
        if (new Pron(nunc).getStress() in ENDS_IN_DACTYL && nunc.slice(-3) === 'IY0') {
          newPron.push(nunc.slice(0,-1) + '3');
        } else {
          newPron.push(nunc);
        }
      }
    }

    // Resolve problems with lists of prons

    // *** come back to this with a diff-checking solution ***
    // pick between two prons when the only difference is pronouncing unstressed syl as AH0 or IH0 (picking IH0)

    // pick between two prons when the only difference is the presence of a T after an N (choosing T)

    // pick between two prons when the only difference is the presence of an H before W in 'wh' (choosing no H)

    // pick between two prons when the only difference is the presence of a P between M and T (choosing P)

    // pick between two prons when the only difference is the presence of an IH0 or IY0 after R (choosing IH0) ["R IH0 P AO1 R T", not "R IY0 P AO1 R T"]

    return newPron;
  }

  checkHardPron() {
    /*
     * returns a guess at the pronunciation of a word that isn't in CMUPD by pronouncing the root and affix(es) separately.
     * Called by: Word.getHardPron()
     */
    let pron = null;
    // console.log(`in checkHardPron with ${this.word}`)
    
    // a helper function that makes different adjustments to prons based on characteristic features of the last phone
    const checkLastPhon = (word, lastLet, phonstArr, elsePhon, adjust = 0, addin = '') => {
      const root = word.slice(0,-lastLet.length + adjust) + addin;
      if (word.slice(-lastLet.length) === lastLet && root in lexicon) {
        const rootPron = lexicon[root][0];
        const rootPronList = rootPron.split(' ');
        const lastPhon = rootPronList[rootPronList.length - 1];

        for (let each of phonstArr) {
          if (lastPhon in each[0]) {
            return rootPron + each[1];
          }
        }
        return rootPron + elsePhon;
      }
      return null;
    }

    // check if root + -s, -'s, -es, -ed, or -'d can be pronounced
    pron = checkLastPhon(this.word, "ed", [[phonstants.MAKES_PAST_WITH_T, ' T'], [phonstants.MAKES_PAST_WITH_ID, ' IH0 D']], ' D', 1);
    if (pron !== null) return pron;
    else {
      pron = checkLastPhon(this.word, "s", [[phonstants.MAKES_PLURAL_WITH_S, ' S'], [phonstants.MAKES_PLURAL_WITH_IZ, ' IH0 Z']], ' Z');
      if (pron !== null) return pron;
      else {
        pron = checkLastPhon(this.word, "'s", [[phonstants.MAKES_PLURAL_WITH_S, ' S'], [phonstants.MAKES_PLURAL_WITH_IZ, ' IH0 Z']], ' Z');
        if (pron !== null) return pron;
        else {
          pron = checkLastPhon(this.word, "’s", [[phonstants.MAKES_PLURAL_WITH_S, ' S'], [phonstants.MAKES_PLURAL_WITH_IZ, ' IH0 Z']], ' Z');
          if (pron !== null) return pron;
          else {
            pron = checkLastPhon(this.word, "es", [[[]]], ' IH0 Z');
            if (pron !== null) return pron;
            else {
              pron = checkLastPhon(this.word, "ed", [[phonstants.MAKES_PAST_WITH_T, ' T'], [phonstants.MAKES_PAST_WITH_ID, ' IH0 D']], ' D');
              if (pron !== null) return pron;
              else {
                pron = checkLastPhon(this.word, "'d", [[phonstants.MAKES_PAST_WITH_T, ' T'], [phonstants.MAKES_PAST_WITH_ID, ' IH0 D']], ' D', 0, 'e');
                if (pron !== null) return pron;
              }
            }
          }
        }
      }
    }

    // a helper function that makes different adjustments to prons depending on the stress of the last syl
    const checkLastStress = (word, lastLet, afUnsEnd, afStrEnd) => {
      const root = word.slice(0,-lastLet.length);
      if (word.slice(-lastLet.length) === lastLet && root in lexicon) {
        const stressStr = new Pron(lexicon[root][0]).getStress();
        const lastSylStress = stressStr[stressStr.length - 1];
        if (lastSylStress === '0') {
          return lexicon[root][0] + afUnsEnd;
        } else {
          return lexicon[root][0] + afStrEnd;
        }
      }
      return null;
    }

    // check if root + -ing, -less, -ness, or -ly can be pronounced
    pron = checkLastStress(this.word, 'ing', " IH3 NG", " IH0 NG");
    if (pron !== null) return pron
    else {
      pron = checkLastStress(this.word, 'less', " L AH3 S", " L AH0 S");
      if (pron !== null) return pron
      else {
        pron = checkLastStress(this.word, 'ness', " N AH3 S", " N AH0 S");
        if (pron !== null) return pron
        else {
          pron = checkLastStress(this.word, 'ly', " L IY3", " L IY0");
          if (pron !== null) return pron
        }
      }
    }

    // a helper function that tacks on an ending to a pron if the word has a given ending
    const checkEnding = (word, lastLet, subst, adjust=0) => {
      const root = word.slice(0,-lastLet.length + adjust);
      if (word.slice(-lastLet.length) === lastLet && root in lexicon) {
        return lexicon[root][0] + subst
      }
      return null
    }

    // check if root + -eth, -er, or -est can be pronounced
    pron = checkEnding(this.word, 'eth', ' IH0 TH', 1);
    if (pron !== null) return pron
    else {
      pron = checkEnding(this.word, "'th", ' TH');
      if (pron !== null) return pron
      else {
        pron = checkEnding(this.word, "eth", ' IH0 TH');
        if (pron !== null) return pron
        else {
          pron = checkEnding(this.word, 'er', ' ER0', 1);
          if (pron !== null) return pron
          else {
            pron = checkEnding(this.word, 'er', ' ER0');
            if (pron !== null) return pron
            else {
              pron = checkEnding(this.word, 'est', ' IH0 S T', 1);
              if (pron !== null) return pron
              else {
                pron = checkEnding(this.word, 'est', ' IH0 S T');
                if (pron !== null) return pron
              }
            }
          }
        }
      }
    }

    return pron
  }

  atomize() {
    /*
     * returns a sequential list of the vowel- and consonant-clusters that make up the word's spelling, so that its pronunciation can be guessed at.
     * Called by: Word.guessHardPron
     */
    let atom = '';
    const atoms = [];
    for (let alph of this.word) {
      if (alph in phonstants.ALPHA_VOWELS) {
        if (atom.length === 0 || atom.slice(-1) in phonstants.ALPHA_VOWELS) {
          atom += alph;
        } else if (atom.slice(-1) in phonstants.CONSONANTS) {
          atoms.push(atom);
          atom = alph;
        } else switch (atom.slice(-1)) {
          case 'r':
            if (atom.length > 1 && atom.slice(-2,-1) in phonstants.ALPHA_VOWELS) {
              if (alph === 'e') {
                atom += alph;
              } else {
                atoms.push(atom);
                atom = alph;
              }
            } else {
              atoms.push(atom);
              atom = alph;
            }
            break;
          case 'w':
          case 'y':
            atoms.push(atom);
            atom = alph;
            break;
          case 'q':
            atom += alph;
            atoms.push(atom);
            atom = '';
            break;
          default:
            console.log(`in Word.atomize with ${this.word} and got this letter I don't know what to do with: ${alph}`)
            break;
        }
      } else if (alph in phonstants.CONSONANTS) {
        if (atom.length === 0) {
          atom = alph;
        } else if (atom.slice(-1) in phonstants.ALPHA_VOWELS) {
            atoms.push(atom);
            atom = alph;
        } else if (atom.slice(-1) in phonstants.CONSONANTS) {
            if (atom.length === 2 && alph === 'l' && !((atom + alph) in phonstants.TRIGRAMS)) {
              atoms.push(atom);
              atom = alph;
            } else {
              atom += alph;
            }
        } else switch (atom.slice(-1)) {
            case 'r':
            case 'y':
              atoms.push(atom);
              atom = alph;
              break;
            case 'w':
              if (atom.length > 1 && atom.slice(-2,-1) in phonstants.ALPHA_VOWELS) {
                atoms.push(atom);
                atom = alph;
              } else if (atom.length > 1 && atom.slice(-2,-1) in phonstants.CONSONANTS) {
                  atom += alph;
              } else if (atom.length === 1) {
                  atom += alph;
              }
              break;
            default:
              break;
          }
      } else if (alph === 'r') {
          if (atom.length === 0) atom = alph;
          else if (atom.slice(-1) === 'y') {
            atoms.push(atom);
            atom = alph;
          } else {
            atom += 'r'
          }
      } else if (alph === 'w') {
        if (atom.length === 0) atom = alph;
        else if (atom.slice(-1) in phonstants.ALPHA_VOWELS) {
          atom += alph;
          atoms.push(atom);
          atom = '';
        } else if (atom.slice(-1) in phonstants.CONSONANTS) atom += alph;
          else if (atom.slice(-1) in ['r', 'y']) {
            atoms.push(atom)
            atom = alph;
          }
      } else if (alph === 'y') {
        if (atom.length === 0) atom = alph;
        else if (atom.slice(-1) in phonstants.ALPHA_VOWELS) atom += alph;
        else if (atom.slice(-1) in phonstants.CONSONANTS) {
          atoms.push(atom);
          atom = alph;
        } else if (atom.slice(-1) in ['r', 'w']) {
          atoms.push(atom);
          atom = alph;
        }
      } else if (alph === 'q') {
        if (atom !== '') {
          atoms.push(atom);
          atom = alph;
        } else atom = alph;
      }
    } if (atom !== '') atoms.push(atom);

    return atoms;
  }

  guessHardPron() {
    /*
     * returns a guess at the pronunciation of a word that isn't in the lexicon by guessing for each vowel- and consonant-cluster.
     * Called by: Word.getHardPron
     */
    let pron = '';
    const clusters = this.atomize();
    for (let c = 0; c < clusters.length; c++) {
      if (clusters[c].length === 1) {
        if (clusters[c] in phonstants.ALPHA_VOWELS) { // it's a vowel
          if (clusters.length >= c+3 && clusters[c+1] in phonstants.CONSONANTS && clusters[c+2] === 'e') {// check for terminal VCe
            pron += phonstants.LONG_VOWELS[clusters[c]];
          } else if (clusters[c] === 'e') { // letter is e
            if (clusters.length === c+2) { // e is penult cluster
              // if (pron.slice(-2,-1) === 'L' && pron.slice(-4,-3).toLowerCase() in phonstants.CONSONANTS) { // is this for "whistled"? turned off for "pleft"
              //   pron = pron.slice(0,-2) + 'AH0 L ';
              // } else 
              if (pron.slice(-2,-1) === 'R' && pron.length >= 4 && pron.slice(-4,-3) in ['B','C','D','F','G','K','P','T','V']) {
                pron += 'IH0 '; // not sure this rule is right: Cre
              } else if (clusters[c+1] === 'd') { // ends in ed
                if (pron.slice(-2,-1) in ['T','D']) {
                  pron += 'IH0 ';
                } else continue
              } else if (clusters[c+1] === 's') { // ends in es
                pron += 'IH0 ' // this might be wrong
              } else pron += 'EH2 ';
            } else if (clusters.length === c+1) { // e is last cluster
              if (pron.slice(-2,-1) === 'L' && pron.slice(-4,-3).toLowerCase() in phonstants.CONSONANTS) { // terminal Cle
                pron = pron.slice(0,-2) + 'AH0 L ';
              }
            } else pron += 'EH0 ';
          } else if (c+1 === clusters.length) { // last cluster is non-e vowel
            pron += phonstants.TERM_VOWELS[clusters[c]];
          } else { // vowel isn't e and isn't before 'silent' e and isn't terminal
            pron += phonstants.SHORT_VOWELS[clusters[c]];
          }
        } else if (clusters[c] in phonstants.CONSONANTS) { // it's a single consonant
          pron += phonstants.CONSONANTS[clusters[c]];
        } else if (clusters[c] === 'r') { // it's an r
          pron += 'R ';
        } else if (clusters[c] === 'y') { // it's a y
          if (c === 0) pron += 'Y '; // it's an initial Y
          else if (clusters.length >= c+2  && clusters[c+1] in phonstants.CONSONANTS && clusters[c+2] === 'e') { // it's yCe
            pron += phonstants.LONG_VOWELS[clusters[c]];
          } else if (clusters[c-1][0] in phonstants.CONSONANTS) { // y is preceded by a consonant cluster
            if (clusters.length > 2) pron += 'IY2 ';
            else pron += 'AY1 ';
          } else pron += 'IY2 ';
        } else if (clusters[c] === 'w') pron += 'W ';
      } else if (clusters[c].length === 2) {
        if (clusters[c] in phonstants.DIGRAPHS) pron += phonstants.DIGRAPHS[clusters[c]];
        else if (clusters[c] in phonstants.DIGRAMS) pron += phonstants.DIGRAMS[clusters[c]];
        else if (clusters[c].slice(-1) === 'r') {
          if (clusters[c].slice(-2,-1) in phonstants.ALPHA_VOWELS) {
            pron += phonstants.VOWEL_R[clusters[c]];
          }
        } else if (clusters[c].slice(-1) in phonstants.CONSONANTS) {
          for (let char in clusters[c]) {
            pron += phonstants.CONSONANTS[char];
          }
        } else if (clusters[c].slice(0,1) in phonstants.ALPHA_VOWELS && clusters[c].slice(1,2) in phonstants.ALPHA_VOWELS) {
          pron += phonstants.LONG_VOWELS[clusters[c].slice(0,1)];
          pron += phonstants.SHORT_VOWELS[clusters[c].slice(1,2)];
        }
      } else if (clusters[c].length === 3) { 
        if (clusters[c] in phonstants.TRIGRAPHS) pron += phonstants.TRIGRAPHS[clusters[c]];
        else if (clusters[c] in phonstants.TRIGRAMS) pron += phonstants.TRIGRAMS[clusters[c]];
        else if (clusters[c] in phonstants.DIGRAPH_R) pron += phonstants.DIGRAPH_R[clusters[c]];
        else if (clusters[c].slice(-1) in phonstants.CONSONANTS || clusters[c].slice(-1) === 'r') { // weird cons cluster ending in r (?)
          if (clusters[c].slice(0,2) in phonstants.DIGRAMS) pron += phonstants.DIGRAMS[clusters[c].slice(0,2)] + 'R ';
        }
      } else if (clusters[c].length === 4) {
        if (clusters[c].slice(0,2) in phonstants.DIGRAMS) {
          pron += phonstants.DIGRAMS[clusters[c].slice(0,2)]
          if (clusters[c].slice(2) in phonstants.DIGRAMS) {
            pron += phonstants.DIGRAMS[clusters[c].slice(2)]
          } else if (clusters[c].slice(2) in phonstants.VOWEL_R) pron += phonstants.VOWEL_R[clusters[c].slice(2)]
        } else if (clusters[c].slice(0,2) in phonstants.VOWEL_R) {
          pron += phonstants.VOWEL_R[clusters[c].slice(0,2)];
          if (clusters[c].slice(2) in phonstants.VOWEL_R) pron += phonstants.VOWEL_R[clusters[c].slice(2)];
          else if (clusters[c].slice(2) in phonstants.DIGRAMS) pron += phonstants.DIGRAM[clusters[c].slice(2)];
        } else {
          for (let char in clusters[c]) {
            if (char in phonstants.CONSONANTS) pron += phonstants.CONSONANTS[char];
          }
        }
      } else if (clusters[c].length > 4) {
          for (let char in clusters[c]) {
            if (char in phonstants.CONSONANTS) pron += phonstants.CONSONANTS[char];
          }
      }
    }

    pron = pron.trim();

    // check for mistakes related to 'tion' and 'ed'
    if (this.word.includes('tion') && pron.includes('T AH0 N')) {
      if (pron.includes('AE2 T AH0 N')) pron = pron.replace('AE2 T AH0 N', 'EY1 SH AH0 N');
      else if (pron.includes('AH2 T AH0 N')) pron = pron.replace('AH2 T AH0 N', 'UW1 SH AH0 N');
      else if (pron.includes('AA2 T AH0 N')) pron = pron.replace('AA2 T AH0 N', 'OW1 SH AH0 N');
      else pron = pron.replace('T AH0 N', 'SH AH0 N');
    } else if (this.word.slice(-2) === 'ed' && pron.slice(-3,-2) in ['F', 'K', 'P', 'S']) pron = pron.slice(0,-1) + 'T';

    pron = this.guessStress(pron);

    return pron
  }

  getHardPron() {
    /*
     * returns a guess at the pronunciation of a word that isn't in the lexicon.
     * Called by: Word.getPron
     */
    const check = this.checkHardPron();
    if (check.length > 0) return check;
    const guess = this.guessHardPron();
    if (guess.length > 0) return guess;
  }

  guessStress(pron) {
    /*
     * makes a guess at the correct stress for a word from guessHardPron and returns the corrected pron.
     * Called by: Word.guessHardPron
     */
    // add primary stress to a one-syllable pron
    if (new Pron(pron).getStress().length === 1 && !pron.includes('1')) {
      for (let char of pron) {
        if (['2','3','4','0'].includes(char)) {
          pron = pron.replace(char,'1');
        }
      }
    }

    return pron;
  }
}

export default Word