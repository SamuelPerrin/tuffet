import lexicon from './lexicon';
import Pron from './Pron';

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
        //*** if all prons have the same stresses, return first, else return list ***
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
}

export default Word