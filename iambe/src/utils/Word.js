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
    let pron = [];
    // console.log(`in checkHardPron with ${this.word}`)
    
    
    // if (this.word.slice(-1) === 's' && this.word.slice(-2,-1) !== "'" && this.word.slice(0,-1) in lexicon) {
    //   const rootPron = lexicon[this.word.slice(0,-1)][0];
    //   const rootPronList = rootPron.split(' ');
    //   const lastPhon = rootPronList[rootPronList.length - 1];
    //   if (lastPhon in phonstants.MAKES_PLURAL_WITH_S) {
    //     pron = rootPron + ' S';
    //   } else if (lastPhon in phonstants.MAKES_PLURAL_WITH_IZ) {
    //     pron = rootPron + ' IH0 Z';
    //   } else {
    //     pron = rootPron + ' Z';
    //   }
    // } else if ((this.word.slice(-2) === "'s" || this.word.slice(-2) === "’s") && this.word.slice(0,-2) in lexicon) {
    //   const rootPron = lexicon[this.word.slice(0,-2)][0];
    //   const rootPronList = rootPron.split(' ');
    //   const lastPhon = rootPronList[rootPronList.length - 1];
    //   if (lastPhon in phonstants.MAKES_PLURAL_WITH_S) {
    //     pron = rootPron + ' S';
    //   } else if (lastPhon in phonstants.MAKES_PLURAL_WITH_IZ) {
    //     pron = rootPron + ' IH0 Z';
    //   } else {
    //     pron = rootPron + ' Z';
    //   }
    // }

    const checkLastPhon = (word, lastLet, phonstArr, elsePhon) => {
      let pron = []
      if (word.slice(-1) === lastLet && word.slice(0,-lastLet.length) in lexicon) {
        const rootPron = lexicon[word.slice(0,-lastLet.length)][0];
        const rootPronList = rootPron.split(' ');
        const lastPhon = rootPronList[rootPronList.length - 1];
        let added = false;
        for (let each of phonstArr) {
          if (lastPhon in each[0]) {
            pron = rootPron + each[1];
            added = true;
          }
        }
        if (!added) {
          pron = rootPron + elsePhon;
        }
      }
      return pron
    }
    while (pron === []) {
      // check if root + s can be pronounced
      pron = checkLastPhon(this.word, "s", [[phonstants.MAKES_PLURAL_WITH_S, ' S'], [phonstants.MAKES_PLURAL_WITH_IZ, ' IH0 Z']], ' Z');
      pron = checkLastPhon(this.word, "'s", [[phonstants.MAKES_PLURAL_WITH_S, ' S'], [phonstants.MAKES_PLURAL_WITH_IZ, ' IH0 Z']], ' Z');
      
      // check if root + d can be pronounced
      pron = checkLastPhon(this.word, "’s", [[phonstants.MAKES_PLURAL_WITH_S, ' S'], [phonstants.MAKES_PLURAL_WITH_IZ, ' IH0 Z']], ' Z');
      pron = checkLastPhon(this.word, "ed", [[phonstants.MAKES_PAST_WITH_T, ' T'], [phonstants.MAKES_PAST_WITH_ID, ' IH0 D']], ' D');
    }

    if (this.word.slice(-2) === 'ed' && this.word.slice(0,-1) in lexicon) {
      const rootPron = lexicon[this.word.slice(0,-1)][0];
      const rootPronList= rootPron.split(' ');
      const lastPhon = rootPronList[rootPronList.length - 1];
      if (lastPhon in phonstants.MAKES_PAST_WITH_T) {
        pron = rootPron + ' T';
      } else if (lastPhon in phonstants.MAKES_PAST_WITH_ID) {
        pron = rootPron + ' IH0 D';
      } else {
        pron = rootPron + ' D';
      }
    } else if (this.word.slice(-2) === "'d" && this.word.slice(0,-2) + 'e' in lexicon) {
      const rootPron = lexicon[this.word.slice(0,-2) + 'e'][0];
      const rootPronList = rootPron.split(' ');
      const lastPhon = rootPronList[rootPronList.length - 1];
      if (lastPhon in phonstants.MAKES_PAST_WITH_T) {
        pron = rootPron + ' T';
      } else if (lastPhon in phonstants.MAKES_PAST_WITH_ID) {
        pron = rootPron + ' IH0 D';
      } else {
        pron = rootPron + ' D';
      }
    }

    // check if root + ing can be pronounced
    else if (this.word.slice(-3) === 'ing' && this.word.slice(0,-3) in lexicon) {
      const stressStr = new Pron(lexicon[this.word.slice(0,-3)][0]).getStress();
      const lastSylStress = stressStr[stressStr.length - 1];
      if (lastSylStress === '0') {
        pron = lexicon[this.word.slice(0,-3)][0] + " IH3 NG";
      } else {
        pron = lexicon[this.word.slice(0,-3)][0] + " IH0 NG";
      }
    }

    // check if root + eth can be pronounced
    else if (this.word.slice(-3) === 'eth' && this.word.slice(0,-3) in lexicon) {
      pron = lexicon[this.word.slice(0,-3)][0] + ' IH0 TH';
    } else if (this.word.slice(-3) === "'th" && this.word.slice(0,-3) in lexicon) {
      pron = lexicon[this.word.slice(0,-3)][0] + ' TH';
    } else if (this.word.slice(-3) === 'eth' && this.word.slice(0,-2) in lexicon) {
      pron = lexicon[this.word.slice(0,-2)][0] + ' IH0 TH';
    }

    // check if root + er can be pronounced
    else if (this.word.slice(-2) === 'er' && this.word.slice(0,-2) in lexicon) {
      pron = lexicon[this.word.slice(0,-2)][0] + ' ER0';
    } else if (this.word.slice(-2) === 'er' && this.word.slice(0,-1) in lexicon) {
      pron = lexicon[this.word.slice(0,-1)][0] + ' ER0';
    }

    // check if root + est can be pronounced
    else if (this.word.slice(-3) === 'est' && this.word.slice(0,-3) in lexicon) {
      pron = lexicon[this.word.slice(0,-3)][0] + ' IH0 S T';
    } else if (this.word.slice(-3) === 'est' && this.word.slice(0,-2) in lexicon) {
      pron = lexicon[this.word.slice(0,-2)][0] + ' IH0 S T';
    }

    // check if root + less can be pronounced
    else if (this.word.slice(-4) === 'less' && this.word.slice(0,-4) in lexicon) {
      const stressStr = new Pron(lexicon[this.word.slice(0,-4)][0]).getStress();
      const lastSylStress = stressStr[stressStr.length - 1];
      if (lastSylStress === '0') {
        pron = lexicon[this.word.slice(0,-4)][0] + ' L AH3 S';
      } else {
        pron = lexicon[this.word.slice(0,-4)][0] + ' L AH0 S';
      }
    }

    // check if root + ness can be pronounced
    else if (this.word.slice(-4) === 'ness' && this.word.slice(0,-4) in lexicon) {
      const stressStr = new Pron(lexicon[this.word.slice(0,-4)][0]).getStress();
      const lastSylStress = stressStr[stressStr.length - 1];
      if (lastSylStress === '0') {
        pron = lexicon[this.word.slice(0,-4)][0] + ' N AH3 S';
      } else {
        pron = lexicon[this.word.slice(0,-4)][0] + ' N AH0 S';
      }
    }

    // check if root + ly can be pronounced
    else if (this.word.slice(-2) === 'ly' && this.word.slice(0,-2) in lexicon) {
      const stressStr = new Pron(lexicon[this.word.slice(0,-2)][0]).getStress();
      const lastSylStress = stressStr[stressStr.length - 1];
      if (lastSylStress === '0') {
        pron = lexicon[this.word.slice(0,-2)][0] + ' L IY3';
      } else {
        pron = lexicon[this.word.slice(0,-2)][0] + ' L IY0';
      }
    }

    return pron
  }
}

export default Word