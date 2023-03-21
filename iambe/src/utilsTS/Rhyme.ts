import Line from './Line';
import Word, { PronunciationType } from './Word';
import Pronunciation from './Pronunciation';
import Rimes from './Rimes';
import * as phonstants from './phonstants';

export default class Rhyme {
  line1: Line = null!;
  line2: Line = null!;

  constructor(line1: string, line2: string) {
    this.line1 = new Line(line1);
    this.line2 = new Line(line2);
  }

  /**
   * Given a pronunciation, removes the numerals that represent vowels' stress and returns the rest of the string
   * @param pronunciation a pronunciation in CMUPD symbols
   */
  numless(pronunciation: Pronunciation): string {
    ['1', '2', '3', '0'].forEach(num => pronunciation = new Pronunciation(pronunciation.replace(num, '')));

    return pronunciation.toString();
  }

  /**
   * Removes doubled consonants and HH and returns the rest as a Pronunciation
   * @param pronunciation a list representing the phonemes of a CMUPD pronunciation
   */
  mosaicize(pronunciation: string[]): Pronunciation {
    for (let i = 0; i < pronunciation.length-1; i++) {
      if (pronunciation[i] === pronunciation[i + 1]) {
        pronunciation.splice(i, 1);
      } else if (pronunciation[i] === 'HH') {
        pronunciation.splice(i,1);
      }
    }

    // turn the list into a spaced string
    return new Pronunciation(pronunciation.join(' '));
  }

  /**
   * Checks which of the pronunciations makes the fullest rhyme and returns that pronunciation
   * @param candidates a list of Pronunciations for one of the terms in the line
   * @param which a number representing which of the terms is at issue
   */
  checkFullness(candidates: Pronunciation[], which: number): Pronunciation {
    // Make a list of objects with each pronunciation and the relative fullness of the rhyme it makes
    const scores : {pronunciation: Pronunciation; score: number; }[] = candidates
      .map(pron => {
        let rhymeType : phonstants.RhymeType = which === 0 ? this.getRhymeType(pron) : this.getRhymeType(null, pron);
        let score : number = this.getScoreForRhymeType(rhymeType);
        return {
        pronunciation: pron,
        score: score
      }});

    // Return the pronunciation that makes the fullest rhyme
    return scores.sort((a,b) => b.score - a.score)[0].pronunciation;
  }

  /**
   * Returns the pronunciation that makes the fullest rhyme
   * @param prons list of possible pronunciations for one of the Rhyme's lines' terms
   * @returns Pronunciation
   */
  resolvePron(prons: Pronunciation[]): Pronunciation {
    return prons[0];
  }

  /**
   * Determines how and whether the two lines rhyme and returns the rhyme type.
   * @param pron1 Optional pronunciation to use for the term of the first line
   * @param pron2 Optional pronunciation to use for the term of the second line
   */
  getRhymeType(pron1: PronunciationType = null, pron2: PronunciationType = null): phonstants.RhymeType {
    // Establish necessary parts of term1
    const term1 = this.line1.getTerm()[0].toLowerCase();
    if (pron1 === null) {
      pron1 = new Word(term1).getPronunciation(true);
    }
    if (Array.isArray(pron1)) {
      if (pron1.length === 1) pron1 = pron1[0];
      else pron1 = this.resolvePron(pron1);
    }
    const rimes1 : Rimes = pron1.getRimes();
    const numlessRime1 : string = this.numless(rimes1.rime);
    const numlessLastRime1 = this.numless(rimes1.lastRime);

    // Establish necessary parts of term2
    const term2 = this.line2.getTerm()[0].toLowerCase();
    if (pron2 === null) {
      pron2 = new Word(term2).getPronunciation(true);
    }
    if (Array.isArray(pron2)) {
      if (pron1.length === 1) pron2 = pron2[0];
      else pron2 = this.resolvePron(pron2);
    }
    const rimes2 : Rimes = pron2.getRimes();
    const numlessRime2 = this.numless(rimes2.rime);
    const numlessLastRime2 = this.numless(rimes2.lastRime);

    // Start checking for rhyme types
    let rhymeType = phonstants.RhymeType.none;
    let maybeAssonance = false;

    // Check for full, identical, and homophone rhymes
    if (rimes1.rime === rimes2.rime) {
      if (pron1 !== pron2) rhymeType = phonstants.RhymeType.fullRhyme;
      else if (term1 === term2 || term1 + "'" === term2 || term1 === term2 + "'") {
        rhymeType = phonstants.RhymeType.identicalRhyme;
      } else {
        rhymeType = phonstants.RhymeType.homophoneRhyme;
      }
    }

    // Check for stress-promotion rhyme
    else if (numlessLastRime1 === numlessRime2
      || numlessRime1 === numlessLastRime2
      || numlessLastRime1 === numlessLastRime2)
    {
      rhymeType = phonstants.RhymeType.promotionRhyme;
    }

    // Check for assonantal rhymes
    else if (rimes1.nucl === rimes2.nucl || this.numless(rimes1.lastNucl) === this.numless(rimes2.lastNucl)) {
      for (let nas of phonstants.NASALS) {
        if (rimes1.lastCoda.includes(nas)) {
          for (let sal of phonstants.NASALS) {
            if (rimes2.lastCoda.includes(sal) && sal !== nas) {
              rhymeType = phonstants.RhymeType.nasalAssonance;
            }
          }
        }
      }

      for (let sib of phonstants.SIBILANTS) {
        if (rimes1.lastCoda.length > 0 && sib === rimes1.lastCoda.slice(-2)) {
          for (let bis of phonstants.SIBILANTS) {
            if (bis !== sib && rimes2.lastCoda.length > 0 && bis === rimes2.lastCoda.slice(-2)) {
              rhymeType = phonstants.RhymeType.sibilantAssonance;
            }
          }
        }
      }
      if (rhymeType === 'N/A') maybeAssonance = true;
    }

    // Check for diphthong rhymes
    if ((maybeAssonance || rhymeType == phonstants.RhymeType.none) && rimes1.nucl.slice(0,2) in phonstants.DIPHTHONGS) {
      // diphthong-first rhymes
      if (rimes2.nucl.slice(0,2) in phonstants.DIPHTHONGS && rimes1.nucl.slice(-2) === rimes2.nucl.slice(-2)) {
        if (rimes1.coda === rimes2.coda) rhymeType = phonstants.RhymeType.diphthongRhyme; // 'diph-diph rhyme';
        else if (rimes1.nucl !== rimes2.nucl) rhymeType = phonstants.RhymeType.diphthongAssonance; // 'diph-diph assonance';
      } else if ((rimes1.nucl.slice(-2,-1) === 'Y' && rimes2.nucl.slice(0,2) === 'IY') || (rimes1.nucl.slice(-2,-1) === 'W' && rimes2.nucl.slice(0,2) === 'UW')) {
        if (rimes1.coda === rimes2.coda) rhymeType = phonstants.RhymeType.diphthongRhyme; //'diph-vow rhyme';
        else rhymeType = phonstants.RhymeType.diphthongAssonance; // 'diph-vow assonance';
      }
    }

    return rhymeType;
  }


  private getScoreForRhymeType(rhymeType: phonstants.RhymeType) : number {
    switch(rhymeType) {
      case 'full rhyme': 
        return 100;
      case 'homophone rhyme':
        return 95;
      case 'identical rhyme':
        return 90;
      case 'promotion rhyme':
        return 80;
      case 'diphthong rhyme':
        return 77;
      case 'promotion diphthong rhyme':
        return 73;
      case 'sibilant assonance':
        return 66;
      case 'nasal assonance':
        return 65;
      case 'assonance':
        return 51;
      case 'full consonance':
        return 50;
      case 'promotion consonance':
        return 40;
      case 'diphthong assonance':
        return 23;
      case 'partial consonance':
        return 19;
      case 'unstressed rhyme':
        return 18;
      case 'promotion diphthong assonance':
        return 14;
      case 'anisobaric rhyme':
        return 13;
      case 'zero consonance':
        return 10;
      case 'sibilant consonance':
        return 9;
      case 'nasal consonance':
        return 8;
      case 'N/A':
        return 0;
      default:
        throw new Error(`Rhyme type ${rhymeType} not found!`);
    };
  }
}

