import * as phonstants from './phonstants';

class Pron {
  /*
   * A string of capital letters and numerals representing the CMUPD pronunciation of a word.
   */
  constructor(text) {
    this.text = text;
    if (typeof this.text !== "string" || this.text.length === 0) {
      throw this.text.length ? new Error(`"${this.text}" (${typeof this.text}) is not a valid pron.`) : new Error("Pron cannot be empty.");
    }
  }

  getStress() {
    const arabs = ['1','2','3','4','0'];
    let stresses = [];
    for (let char of this.text) {
      if (arabs.includes(char)) {
        stresses.push(char);
      }
    }
    stresses = stresses.join('');
    return stresses
  }

  getLastPrime(pron) {
    /*
     * returns the index of the last primary-stressed syllable in a list of CMUPD phones.
     * if there is no primary-stressed syllable, returns the index of the last, most-stressed syllable
     */
    let ind = 'N/A';
    for (let phon in pron) {
      if (pron[phon].includes('1')) {
        ind = Number(phon);
      }
    } if (ind !== 'N/A') {
      return ind;
    } else {
      for (let phon in pron) {
        if (pron[phon].includes('2')) {
          ind = Number(phon);
        }
      } if (ind !== 'N/A') {
        return ind;
      } else {
        for (let phon in pron) {
          if (pron[phon].includes('3')) {
            ind = Number(phon);
          }
        } if (ind !== 'N/A') {
          return ind;
        } else {
          for (let phon in pron) {
            if (pron[phon].includes('0')) {
              ind = Number(phon);
            }
          } if (ind !== 'N/A') {
            return ind;
          }
        }
      }
    } return ind;
  }

  isAVowel(phon) {
    /*
     * returns True if phon is a CMUPD vowel, else returns false
     */
    if (phon.length === 3 && phon.slice(0,2) in phonstants.CMUPD_VOWELS && ['1','2','3','4','0'].includes(phon.slice(2))) {
      return true;
    } return false;
  }
}

export default Pron