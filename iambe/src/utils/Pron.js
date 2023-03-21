import * as phonstants from '../utilsTS/phonstants';

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
    /**
     * Returns a string of numerals representing the relative stress of syllables in the word's pronunciation
     */
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

  getRimes() {
    /*
     * returns an object with properties representing parts of the word's pron that are relevant to determining whether and how it rhymes
     * Called by: Rhyme.getRhymeType
     */
    const rimes = {
      rime:'',
      nucl:'',
      coda:'',
      lastRime:'',
      lastNucl:'',
      lastCoda:'',
      unstRime:'',
      unstNucl:'',
      unstCoda:'',
    }
    const prawn = this.text.split(' ');
    const lastPrime = this.getLastPrime(prawn);

    // assign rime, nucl, and coda
    // rime is the vowel of the last stressed syl and everything after it
    // nucl (nucleus) is the vowel of the last stressed syl
    // coda is everything that follows nucl
    // console.log(`prawn: ${prawn}\nlastPrime: ${lastPrime}\nthis.text.indexOf(prawn[lastPrime]): ${this.text.indexOf(prawn[lastPrime])}`)
    rimes.rime = this.text.slice(this.text.indexOf(prawn[lastPrime]));
    rimes.nucl = prawn[lastPrime];
    if (rimes.rime.length > 3) {
      rimes.coda = rimes.rime.slice(4);
    }

    // assign lastRime, lastNucl, and lastCoda
    // these parts refer to the rime, nucl, and coda of the word's last vowel with at least secondary stress
    if (rimes.coda !== '') {
      const codaPrawn = rimes.coda.split(' ');
      let codaVow = -1;
      for (let phon in codaPrawn) {
        if (this.isAVowel(codaPrawn[phon])) {
          if (Number(codaPrawn[phon].slice(-1)) > 1) {
            codaVow = phon;
            break;
          }
        }
      }
      
      if (codaVow !== -1) {
        rimes.lastRime = rimes.coda.slice(rimes.coda.indexOf(codaPrawn[codaVow]));
        rimes.lastNucl = codaPrawn[codaVow];
        if (rimes.lastRime.length > 3) {
          rimes.lastCoda = rimes.lastRime.slice(4);
        }
      }
    }

    if (rimes.lastRime === '') {
      rimes.lastRime = rimes.rime;
      rimes.lastNucl = rimes.nucl;
      rimes.lastCoda = rimes.coda;
    }

    // assign unstRime, unstNucl, and unstCoda
    // these parts refer to the rime, nucl, and coda of the last vowel in the word, if it's unstressed
    if (rimes.lastcoda !== '') {
      const lastCodaPrawn = rimes.lastCoda.split(' ');
      let lastCodaVow = -1;
      for (let phon in lastCodaPrawn) {
        if (this.isAVowel(lastCodaPrawn[phon])) {
          lastCodaVow = phon;
          break;
        }
      }

      if (lastCodaVow !== -1) {
        rimes.unstRime = rimes.lastCoda.slice(rimes.lastCoda.indexOf(lastCodaPrawn[lastCodaVow]));
        rimes.unstNucl = lastCodaPrawn[lastCodaVow];
        if (rimes.unstRime.length > 3){
          rimes.unstCoda = rimes.unstRime.slice(4);
        }
      }
    }

    return rimes
  }
}

export default Pron