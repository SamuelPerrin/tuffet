

class Rhyme {
  constructor(line1, line2) {
    this.line1 = line1;
    this.line2 = line2;
  }

  numless(pron) {
    /*
     * Given a string representing a CMUPD pron, removes the numerals that represent vowels' stress and returns the rest of the string
     */
    for (let num of ['1','2','3','0']) {
      pron = pron.replace(num,'');
    }

    return pron;
  }

  mosaicize(pron) {
    /*
     * given a list representing a CMUPD pron, removes doubled consonants and HH and returns the rest as a string
     */
    for (let phon = 0; phon < pron.length-1; phon++) {
      if (pron[phon] === pron[phon+1]) {
        pron.splice(phon,1);
      } else if (pron[phon] === 'HH') {
        pron.splice(phon,1);
      }
    }
    pron = pron.reduce((a,b) => a + b + ' ', '').trim();
    return pron;
  }
}

export default Rhyme;