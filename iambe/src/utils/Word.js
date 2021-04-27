import lexicon from './lexicon';
import Pron from './Pron';
import * as phonstants from './phonstants';

class Word {
  /*
   * A string that represents a word.
   */
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
    let corrected = false;
    let pron = '';

    // Check the lexicon for the pronunciation
    if (lexicon.hasOwnProperty(this.word)) {
      if (lexicon[this.word].length === 1) {
        pron = rhyme ? lexicon[this.word] : lexicon[this.word][0];
      } else if (rhyme) {
        pron = lexicon[this.word];
      } else {
        //otherwise, if all prons have the same stresses, return first, else return list
        const stressWords = new Set();
        pron = lexicon[this.word];
        for (let prawn in pron) {
          stressWords.add(new Pron(prawn).getStress());
        }
        if (stressWords.length === 1) {
          pron = pron[0];
        }
      }
    }

    // if the lexicon doesn't have the pronunciation, get it from CMUPD, by guessing, or by asking the user
    else {
      // *** add in missing logic here for CMUPD and getHardPron ***
    }

    if (!corrected) {
      pron = this.correct_pron(pron);
    }

    return pron;
  }

  correct_pron(pron) {
    /*
     * Checks for certain fixable problems in individual prons or lists of prons, returning fixed pron(s)
     */

    let newPron = pron;

    // Correct problems with individual prons
    // add minimal stress to some -y suffixes
    if (pron instanceof String) {
      // *** insert logic once Pron.getStress is written ***
    } else if(pron instanceof Array) {
      // *** insert logic once Pron.getStress is written ***
    }

    // Resolve problems with lists of prons
    // pick between two prons when the only difference is pronouncing unstressed syl as AH0 or IH0 (picking IH0)

    // pick between two prons when the only difference is the presence of a T after an N (choosing T)

    // pick between two prons when the only difference is the presence of an H before W in 'wh' (choosing no H)

    // pick between two prons when the only difference is the presence of a P between M and T (choosing P)

    // pick between two prons when the only difference is the presence of an IH0 or IY0 after R (choosing IH0) ["R IH0 P AO1 R T", not "R IY0 P AO1 R T"]

    return newPron;
  }

  checkHardPron() {
    /*
     * returns a guess at the pronunciation of a word that isn't in CMUPD by pronouncing the root and affix(es) separately
     */
    let pron = null;
    // console.log(`in checkHardPron with ${this.word}`)
    
    // a helper function for checkHardPron that makes different adjustments to prons based on characteristic features of the last phone
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
    pron = checkEnding(this.word, 'eth', ' IH0 TH');
    if (pron !== null) return pron
    else {
      pron = checkEnding(this.word, "'th", ' TH');
      if (pron !== null) return pron
      else {
        pron = checkEnding(this.word, "eth", ' IH0 TH', 1);
        if (pron !== null) return pron
        else {
          pron = checkEnding(this.word, 'er', ' ER0');
          if (pron !== null) return pron
          else {
            pron = checkEnding(this.word, 'er', ' ER0', 1);
            if (pron !== null) return pron
            else {
              pron = checkEnding(this.word, 'est', ' IH0 S T');
              if (pron !== null) return pron
              else {
                pron = checkEnding(this.word, 'est', ' IH0 S T', 1);
                if (pron !== null) return pron
              }
            }
          }
        }
      }
    }

    

    return pron
  }
}

export default Word