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
     * Given a list of prons and a str num representing which of the terms is at issue, returns the pron that makes for the fullest rhyme
     * Called by: Rhyme.resolvePron
     */

    // make a list of objects with each pron and its relative fullness
    const scores = candidates.map(pron => ({pron:pron, score: phonstants.RHYME_FULLNESS[which === 0 ? this.getRhymeType(pron) : this.getRhymeType(null, pron)]}));

    // return the pron that makes the fullest rhyme
    return scores.sort((a,b) => b.score - a.score)[0].pron;
  }

  resolvePron(prons) {
    /**
     * Given a list of possible pronunciations of one of the Rhyme's lines' terms, returns the pron that makes the fullest rhyme
     * Calls: Line.getTerm, Line.getStress, Word.getPron, Pron.getStress, Rhyme.checkFullness
     * Called by: Rhyme.getRhymeType
     */
    const term1 = new Line(this.line1).getTerm()[0].toLowerCase();
    const term2 = new Line(this.line2).getTerm()[0].toLowerCase();
     
    // decide which line we're dealing with
    let which;
    if (new Word(term1).getPron(true)[0] === prons[0]) which = 0; // we're pronouncing line1's term
    else if (new Word(term2).getPron(true)[0] === prons[0]) which = 1; // we're pronouncing line2's term

    // decide whether all possible prons are metrically equivalent
    const metricallyEquiv = prons.map(pron => new Pron(pron).getStress()).every(st => st === new Pron(prons[0]).getStress());

    // generate list of candidates
    const candidates = [];
    if (metricallyEquiv) prons.forEach(pron => candidates.push(pron));
    
    // if not all pronunciations are metrically equivalent, pick only the ones that work with the line's meter
    else {
      const lineStresses = new Line( which === 0 ? this.line1 : this.line2).getStress();
      prons.forEach(pron => {
        // make an array of pron's stresses as ints
        let pronStress = new Pron(pron).getStress().split('');
        pronStress = pronStress.map(num => {
          if (pronStress.length === 1 && num === '1') return 2;
          else return Number(num === '0' ? '4' : num);
        });
        
        // if the pron's stresses match the last n stresses of the correct pronunciation of the line, it's a candidate
        if (lineStresses.slice(-pronStress.length).every((pos,i) => pos === pronStress[i])) candidates.push(pron);
      })
    }

    // all remaining candidates are metrically equivalent, so decide which set of vowels makes for the best rhyme with the other term
    if (candidates.length === 1) {
      return candidates[0];
    }
    else {
      return this.checkFullness(candidates, which);
    }
  }

  getScore() {
    /*
     * Returns a number between 0 and 1 that represents the fullness of a rhymetype
     */
    const rhymeType = this.getRhymeType();
    if (rhymeType in phonstants.RHYME_SCORE) return phonstants.RHYME_SCORE[rhymeType];
    else {
      console.log(`Rhyme.getScore can't score rhymes of the type ${rhymeType}`);
      return 0.0;
    }
  }

  getRhymeType(pron1=null,pron2=null) {
    /*
     * Determines how and whether the two lines rhyme and returns a string labelling the rhyme type.
     * Pronunciation can be specified for either of the two terms
     */
    
    // establish necessary parts of term1
    const term1 = new Line(this.line1).getTerm()[0].toLowerCase();
    if (pron1 === null) {
      pron1 = new Word(term1).getPron(true);
    }
    if (pron1 instanceof Array) {
      // *** once resolvePron is written, use it here ***
      if (pron1.length === 1) pron1 = pron1[0];
      else pron1 = this.resolvePron(pron1);
    }
    const rimes1 = new Pron(pron1).getRimes();
    const nlRime1 = this.numless(rimes1.rime);
    const nlLastRime1 = this.numless(rimes1.lastRime);

    // establish necessary parts of term2
    const term2 = new Line(this.line2).getTerm()[0].toLowerCase();
    if (pron2 === null) {
      pron2 = new Word(term2).getPron(true);
    }
    if (pron2 instanceof Array) {
      if (pron2.length === 1) pron2 = pron2[0];
      else pron2 = this.resolvePron(pron2);
    }
    const rimes2 = new Pron(pron2).getRimes();
    const nlRime2 = this.numless(rimes2.rime);
    const nlLastRime2 = this.numless(rimes2.lastRime);

    let rhymeType = 'N/A';

    // check for full, ident, homo rhymes
    if (rimes1.rime === rimes2.rime) {
      if (pron1 !== pron2) rhymeType = 'full rhyme';
      else if (term1 === term2 || term1 + "'" === term2 || term1 === term2 + "'") {
        rhymeType = 'identical rhyme';
      } else {
        rhymeType = 'homophone rhyme';
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
    if (['N/A','maybe assonance'].includes(rhymeType) && rimes1.nucl.slice(0,2) in phonstants.DIPHTHONGS) {
      // diphthong-first rhymes
      if (rimes2.nucl.slice(0,2) in phonstants.DIPHTHONGS && rimes1.nucl.slice(-2) === rimes2.nucl.slice(-2)) {
        if (rimes1.coda === rimes2.coda) rhymeType = 'diphthong rhyme'; // 'diph-diph rhyme';
        else if (rimes1.nucl !== rimes2.nucl) rhymeType = 'diphthong assonance'; // 'diph-diph assonance';
      } else if ((rimes1.nucl.slice(-2,-1) === 'Y' && rimes2.nucl.slice(0,2) === 'IY') || (rimes1.nucl.slice(-2,-1) === 'W' && rimes2.nucl.slice(0,2) === 'UW')) {
        if (rimes1.coda === rimes2.coda) rhymeType = 'diphthong rhyme'; //'diph-vow rhyme';
        else rhymeType = 'diphthong assonance'; // 'diph-vow assonance';
      }
    }

    if (['N/A', 'maybe assonance'].includes(rhymeType) && !(rimes1.nucl.slice(0,2) in phonstants.DIPHTHONGS) && rimes2.nucl.slice(0,2) in phonstants.DIPHTHONGS) {
      // diphthong-second rhymes
      if ((rimes2.nucl.slice(-2,-1) === 'Y' && rimes1.nucl.slice(0,2) === 'IY') || (rimes2.nucl.slice(-2,-1) === 'W' && rimes1.nucl.slice(0,2) === 'UW')) {
        if (rimes1.coda === rimes2.coda) rhymeType = 'diphthong rhyme'; // 'vow-diph rhyme';
        else rhymeType = 'diphthong assonance'; // 'vow-diph assonance';
      }
    }

    // prom diph rhymes
    if (['N/A', 'maybe assonance', 'diphthong assonance'].includes(rhymeType) && rimes1.lastNucl.slice(0,2) in phonstants.DIPHTHONGS) {
      // promotion diphthong-first rhymes
      if (rimes2.lastNucl.slice(0,2) in phonstants.DIPHTHONGS) {
        // prom diph-diph rhymes
        if (rimes1.lastNucl.slice(-2,-1) === rimes2.lastNucl.slice(-2,-1)) {
          if (this.numless(rimes1.lastCoda) === this.numless(rimes2.lastCoda)) rhymeType = 'promotion diphthong rhyme'; // 'diph-diph promotion rhyme';
          else if (this.numless(rimes1.lastNucl) !== this.numless(rimes2.lastNucl) && rhymeType !== 'diphthong assonance') rhymeType = 'promotion diphthong assonance'; // 'diph-diph promotion assonance';
        }
      } else {
        if ((rimes1.lastNucl.slice(-2,-1) === 'Y' && rimes2.lastNucl.slice(0,2) === 'IY') || (rimes1.lastNucl.slice(-2,-2) === 'W' && rimes2.lastNucl.slice(0,2) === 'UW')) {
          // prom diph-vow rhymes
          if (this.numless(rimes1.lastCoda) === this.numless(rimes2.lastCoda)) rhymeType = 'promotion diphthong rhyme'; // 'diph-vow promotion rhyme';
          else if (rhymeType !== 'diphthong assonance') rhymeType = 'promotion diphthong assonance'; // 'diph-vow promotion assonance';
        }
      }
    }

    if (['N/A', 'maybe assonance', 'diphthong assonance'].includes(rhymeType) && !(rimes1.lastNucl.slice(0,2) in phonstants.DIPHTHONGS) && rimes2.lastNucl.slice(0,2) in phonstants.DIPHTHONGS) {
      // prom diph-second rhymes
      if ((rimes2.lastNucl.slice(-2,-1) === 'Y' && rimes1.lastNucl.slice(0,2) === 'IY') || (rimes2.lastNucl.slice(-2,-1) === 'W' && rimes1.lastNucl.slice(0,2) === 'UW')) {
        if (this.numless(rimes1.lastCoda) === this.numless(rimes2.lastCoda)) rhymeType = 'promotion diphthong rhyme'; // 'vow-diph promotion rhyme';
        else if (rhymeType !== 'diphthong assonance') rhymeType = 'promotion diphthong assonance'; // 'vow-diph promotion assonance';
      }
    }

    // consonantal rhymes
    if (['N/A','maybe assonance'].includes(rhymeType) && rimes1.coda === rimes2.coda) {
      if (rimes1.coda === '' && !((rimes1.nucl + rimes2.nucl).includes('ER'))) {
        rhymeType = 'zero consonance';
      } else {
        let has_vow = false;
        
        for (let vow of Object.keys(phonstants.CMUPD_VOWELS)) {
          if (rimes1.coda.includes(vow)) has_vow = true;
        }

        if (!has_vow) rhymeType = 'full consonance';
      }
    }

    if (['N/A','maybe assonance'].includes(rhymeType)) {
      if ((this.numless(rimes1.lastCoda) === this.numless(rimes2.coda) && rimes2.coda !== '') || 
      (this.numless(rimes1.coda) === this.numless(rimes2.lastCoda) && rimes1.coda !== '') ||
      (this.numless(rimes1.lastCoda) === this.numless(rimes2.lastCoda) && rimes1.lastCoda !== '')) {
        rhymeType = 'promotion consonance'
      } else if (rimes1.lastCoda !== '' && rimes2.lastCoda !== '') {
        for (let phone1 of rimes1.lastCoda.split(' ')) {
          if (rimes2.lastCoda.split(' ').includes(phone1) && !(phone1 in phonstants.CMUPD_VOWELS)) {
            if ((rimes1.rime === rimes2.unstRime || rimes1.lastRime === rimes2.unstRime) ||
            (rimes1.unstRime === rimes2.rime || rimes1.unstRime === rimes2.lastRime)) {
              rhymeType = 'anisobaric rhyme';
              break;
            } else if (rimes1.unstRime === rimes2.unstRime && rimes1.unstRime !== '') {
              rhymeType = 'unstressed rhyme';
              break;
            } else {
              rhymeType = 'partial consonance';
              break;
            }
          }
        }
      }
    }

    if (['N/A','maybe assonance'].includes(rhymeType) && rimes1.lastCoda.length) {
      if (rimes1.lastCoda === rimes2.lastcoda && rimes1.lastCoda !== '' && !((rimes1.lastNucl + rimes2.lastNucl).includes('ER'))) {
        rhymeType = 'zero consonance';
      } 
      for (let nas of phonstants.NASALS) {
        if (rimes1.lastCoda.includes(nas)) {
          for (let sal of phonstants.NASALS) {
            if (rimes2.lastCoda.includes(sal) && sal !== nas && !(new Pron(rimes1.lastCoda + rimes2.lastCoda).getStress())) {
              rhymeType = 'nasal consonance';
            }
          }
        }
      }
      for (let sib of phonstants.SIBILANTS) {
        if (rimes1.lastCoda.length && sib === rimes1.lastCoda.slice(-2)) {
          for (let bis of phonstants.SIBILANTS) {
            if (rimes2.lastCoda.length && bis === rimes2.lastCoda.slice(-2) && !(new Pron(rimes1.lastCoda + rimes2.lastCoda).getStress())) {
              rhymeType = 'sibilant consonance';
            }
          }
        }
      }
    }

    // rhymes with unstressed syllables
    if (['N/A','maybe assonance','partial consonance'].includes(rhymeType)) {
      if ((nlRime1 === this.numless(rimes2.unstRime) || nlLastRime1 === this.numless(rimes2.unstRime)) || (nlRime2 === this.numless(rimes1.unstRime) || nlLastRime2 === this.numless(rimes1.unstRime))) {
        rhymeType = 'anisobaric rhyme';
      } else if (rimes1.unstRime === rimes2.unstRime && rimes1.unstRime !== '') rhymeType = 'unstressed rhyme';
    } if (rhymeType === 'maybe assonance') rhymeType = 'assonance';

    // *** Check for mosaic rhyme here ***

    // if (rhymeType === 'N/A') console.log(`no rhyme for ${pron1} and ${pron2}`);

    // console.log("leaving getRhymeType for",term1,"and",term2,"with",rhymeType);

    return rhymeType;
  }
}

export default Rhyme;