import Line from './Line';
import Word from './Word';
import Pron from './Pron';
import * as phonstants from './phonstants';

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

  checkFullness(candidates,which) {
    /*
     * given a list of prons and a str num representing which of the terms is at issue, returns the pron that makes for the fullest rhyme
     * Called by: Rhyme.resolvePron
     */

  }

  getRhymeType(pron1=null,pron2=null) {
    /*
     * Determines how and whether the two lines rhyme and returns a string labelling the rhyme type.
     * Pronunciation can be specified for either of the two terms
     */
    
    // establish necessary parts of term1
    const term1 = new Line(this.line1).getTerm()[0];
    if (pron1 === null) {
      let pron1 = new Word(term1).getPron(true);
    }
    if (pron1 instanceof Array) {
      // *** once resolvePron is written, use it here ***
      pron1 = pron1[0];
    }
    const rimes1 = new Pron(pron1).getRimes();
    const nlRime1 = this.numless(rimes1.rime);
    const nlLastRime1 = this.numless(rimes1.lastRime);

    // establish necessary parts of term2
    const term2 = new Line(this.line2).getTerm()[0];
    if (pron2 === null) {
      let pron2 = new Word(term2).getPron(true);
    }
    if (pron2 instanceof Array) {
      pron2 = pron2[0];
    }
    const rimes2 = new Pron(pron2).getRimes();
    const nlRime2 = this.numless(rimes2.rime);
    const nlLastRime2 = this.numless(rimes2.lastRime);

    let rhymeType = 'N/A'

    // check for full, ident, homo rhymes
    if (rimes1.rime === rimes2.rime) {
      if (pron1 !== pron2) rhymeType = 'full rhyme';
      else if (term1 === term2 || term1 + "'" === term2 || term1 === term2 + "'") {
        rhymeType = 'identical rhyme'
      } else {
        rhymeType = 'homophone rhyme'
      }
    } else if ((!rimes1.rime.includes('1') || !rimes2.rime.includes('1')) && this.numless(rimes1.rime) === this.numless(rimes2.rime)) {
      rhymeType = 'full rhyme';
    }

    // check for stress-promotion rhyme
    else if (nlLastRime1 === nlRime2 || nlRime1 === nlLastRime2 || nlLastRime1 === nlLastRime2) rhymeType = 'promotion rhyme';

    // check for assonantal rhymes
    else if (rimes1.nucl === rimes2.nucl || this.numless(rimes1.lastNucl) === this.numless(rimes2.lastNucl)) {
      for (let nas of phonstants.NASALS) {
        if (rimes1.lastCoda.includes(nas)) {
          for (let sal of phonstants.NASALS) {
            if (rimes2.lastCoda.includes(sal) && sal !== nas) {
              rhymeType = 'nasal assonance';
            }
          }
        }
      }

      for (let sib of phonstants.SIBILANTS) {
        if (rimes1.lastCoda.length > 0 && sib === rimes1.lastCoda.slice(-2)) {
          for (let bis of phonstants.SIBILANTS) {
            if (bis !== sib && rimes2.lastCoda.length > 0 && bis === rimes2.lastCoda.slice(-2)) {
              rhymeType = 'sibilant assonance';
            }
          }
        }
      }
      if (rhymeType === 'N/A') rhymeType = 'maybe assonance';
    }

    // check for diphthong rhymes
    


    return rhymeType
  }
}

export default Rhyme;