import Line from './Line';
import Word, { PronunciationType } from './Word';
import Pronunciation from './Pronunciation';
import Rimes from './Rimes';
import * as phonstants from './phonstants';

/**
 * Two lines of verse that may or may not rhyme
 */
export default class Rhyme {
  line1: Line = null!;
  line2: Line = null!;
  rhymeInfoList: RhymeInfo[] = [];

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
    for (let i = 0; i < pronunciation.length - 1; i++) {
      if (pronunciation[i] === pronunciation[i + 1]) {
        pronunciation.splice(i, 1);
      } else if (pronunciation[i] === 'HH') {
        pronunciation.splice(i, 1);
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
    const scores: { pronunciation: Pronunciation; score: number; }[] = candidates
      .map(pron => {
        let rhymeType: phonstants.RhymeType = which === 0 ? this.getRhymeType(pron) : this.getRhymeType(null, pron);
        let score: number = this.getScoreForRhymeType(rhymeType);
        return {
          pronunciation: pron,
          score: score
        }
      });

    // Return the pronunciation that makes the fullest rhyme
    return scores.sort((a, b) => b.score - a.score)[0].pronunciation;
  }

  /**
   * Returns the pronunciation that makes the fullest rhyme
   * @param prons list of possible pronunciations for one of the Rhyme's lines' terms
   * @returns Pronunciation
   */
  resolvePron(prons: Pronunciation[]): Pronunciation {
    const term1 = new Word(this.line1.getTerm()[0].toLowerCase());
    const term2 = new Word(this.line2.getTerm()[0].toLowerCase());

    // Decide which line we're dealing with
    let which: 0 | 1 | 2 = 0;
    if (term1.getPronunciation(true)[0].equals(prons[0])) {
      // we're pronouncing line1's term
      which = 1;
    } 
    else if (term2.getPronunciation(true)[0].equals(prons[0])) {
      // we're pronouncing line2's term
      which = 2;
    }

    // Decide whether all possible pronunciations are metrically equivalent
    const metricallyEquivalent = prons
      .map(pron => pron.getStresses())
      .every(stress => stress === prons[0].getStresses());

    // Generate list of candidates
    const candidates: Pronunciation[] = [];
    if (metricallyEquivalent) {
      prons.forEach(pron => candidates.push(pron));
    } else {
      // Since not all pronunciations are metrically equivalent, we want
      // to pick only the ones that work with the line's meter
      const lineStresses: string[] = (which === 1 ? this.line1 : this.line2).getStresses();
      prons.forEach(pron => {
        // Make an array of the pronunciation's stresses as numerals
        let pronStress: string[] | number[] = pron.getStresses().split('');
        pronStress = pronStress.map((num: string) => {
          if (pronStress.length === 1 && num === "1") {
            return 2;
          } else return Number(num === '0' ? '4' : num);
        });

        // If the pronunciation's stresses match the last n stresses
        // of the best pronunciation of the line, it's a candidate
        if (lineStresses.slice(-pronStress.length).every((stress, idx) => stress === pronStress[idx])) {
          candidates.push(pron);
        }
      })
    }

    // All remaining candidates are metrically equivalent,
    // so all that's left is to decide which pronunciation
    // makes for the best rhyme with the other term
    if (candidates.length === 1) {
      return candidates[0];
    } else {
      return this.checkFullness(candidates, which);
    }
  }

  /**
   * Determines whether and how the two lines rhyme and returns the rhyme type.
   * @param pron1 Optional pronunciation to use for the term of the first line
   * @param pron2 Optional pronunciation to use for the term of the second line
   */
  getRhymeType(
    pron1: PronunciationType = null,
    pron2: PronunciationType = null
  ): phonstants.RhymeType {
    // Check to see if this rhyme type has been computed before
    if (this.rhymeInfoList.some(ri => ri.pron1.equals(pron1) && ri.pron2.equals(pron2))) {
      return this.rhymeInfoList.find(ri => ri!.pron1.equals(pron1) && ri!.pron2.equals(pron2)).rhymeType;
    }

    // To determine whether and how two lines rhyme,
    // we need to compare the final sounds (rimes)
    // of the last word (term) of each line

    // Establish necessary parts of term1
    const term1 = this.line1.getTerm()[0].toLowerCase();
    if (pron1 === null) {
      pron1 = new Word(term1).getPronunciation(true);
    }
    if (Array.isArray(pron1)) {
      if (pron1.length === 1) pron1 = pron1[0];
      else pron1 = this.resolvePron(pron1);
    }
    const rimes1: Rimes = pron1.getRimes();
    const numlessRime1: string = this.numless(rimes1.rime);
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
    const rimes2: Rimes = pron2.getRimes();
    const numlessRime2 = this.numless(rimes2.rime);
    const numlessLastRime2 = this.numless(rimes2.lastRime);

    // Now that we have pronunciations, check again to see if this rhyme type has been computed before
    if (this.rhymeInfoList.some(ri => ri.pron1.equals(pron1) && ri.pron2.equals(pron2))) {
      return this.rhymeInfoList.find(ri => ri!.pron1.equals(pron1) && ri!.pron2.equals(pron2)).rhymeType;
    }

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
      || numlessLastRime1 === numlessLastRime2) {
      rhymeType = phonstants.RhymeType.promotionRhyme;
    }

    // Check for assonantal rhymes
    else if (rimes1.nucl === rimes2.nucl
      || this.numless(rimes1.lastNucl) === this.numless(rimes2.lastNucl)) {
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
            if (bis !== sib && rimes2.lastCoda.length > 0
              && bis === rimes2.lastCoda.slice(-2)) {
              rhymeType = phonstants.RhymeType.sibilantAssonance;
            }
          }
        }
      }
      if (rhymeType === 'N/A') maybeAssonance = true;
    }

    // Check for diphthong rhymes
    if ((maybeAssonance || rhymeType === phonstants.RhymeType.none)
      && rimes1.nucl.slice(0, 2) in phonstants.DIPHTHONGS) {
      // diphthong-first rhymes
      if (rimes2.nucl.slice(0, 2) in phonstants.DIPHTHONGS
        && rimes1.nucl.slice(-2) === rimes2.nucl.slice(-2)) {
        if (rimes1.coda === rimes2.coda) {
          rhymeType = phonstants.RhymeType.diphthongRhyme; // 'diph-diph rhyme';
        }
        else if (rimes1.nucl !== rimes2.nucl) {
          rhymeType = phonstants.RhymeType.diphthongAssonance; // 'diph-diph assonance';
        }
      } else if ((rimes1.nucl.slice(-2, -1) === 'Y' && rimes2.nucl.slice(0, 2) === 'IY')
        || (rimes1.nucl.slice(-2, -1) === 'W' && rimes2.nucl.slice(0, 2) === 'UW')) {
        if (rimes1.coda === rimes2.coda) {
          rhymeType = phonstants.RhymeType.diphthongRhyme; //'diph-vow rhyme';
        }
        else {
          rhymeType = phonstants.RhymeType.diphthongAssonance; // 'diph-vow assonance';
        }
      }
    }

    if ((maybeAssonance || rhymeType === phonstants.RhymeType.none)
      && !(rimes1.nucl.slice(0, 2) in phonstants.DIPHTHONGS)
      && rimes2.nucl.slice(0, 2) in phonstants.DIPHTHONGS) {
      // diphthong-second rhymes
      if ((rimes2.nucl.slice(-2, -1) === 'Y' && rimes1.nucl.slice(0, 2) === 'IY') || (rimes2.nucl.slice(-2, -1) === 'W' && rimes1.nucl.slice(0, 2) === 'UW')) {
        if (rimes1.coda === rimes2.coda) rhymeType = phonstants.RhymeType.diphthongRhyme; // 'vow-diph rhyme';
        else rhymeType = RhymeType.diphthongAssonance; // 'vow-diph assonance';
      }
    }

    // prom diph rhymes
    if ((maybeAssonance || rhymeType === phonstants.RhymeType.none || rhymeType === phonstants.RhymeType.diphthongAssonance)
      && rimes1.lastNucl.slice(0, 2) in phonstants.DIPHTHONGS) {
      // promotion diphthong-first rhymes
      if (rimes2.lastNucl.slice(0, 2) in phonstants.DIPHTHONGS) {
        // prom diph-diph rhymes
        if (rimes1.lastNucl.slice(-2, -1) === rimes2.lastNucl.slice(-2, -1)) {
          if (this.numless(rimes1.lastCoda) === this.numless(rimes2.lastCoda)) rhymeType = phonstants.RhymeType.promotionDiphthongRhyme; // 'diph-diph promotion rhyme';
          else if (this.numless(rimes1.lastNucl) !== this.numless(rimes2.lastNucl) && rhymeType !== phonstants.RhymeType.diphthongAssonance) rhymeType = phonstants.RhymeType.promotionDiphthongAssonance; // 'diph-diph promotion assonance';
        }
      } else {
        if ((rimes1.lastNucl.slice(-2, -1) === 'Y' && rimes2.lastNucl.slice(0, 2) === 'IY')
          || (rimes1.lastNucl.slice(-2, -2) === 'W' && rimes2.lastNucl.slice(0, 2) === 'UW')) {
          // prom diph-vow rhymes
          if (this.numless(rimes1.lastCoda) === this.numless(rimes2.lastCoda)) rhymeType = phonstants.RhymeType.promotionDiphthongRhyme; // 'diph-vow promotion rhyme';
          else if (rhymeType !== phonstants.RhymeType.diphthongAssonance) rhymeType = phonstants.RhymeType.promotionDiphthongAssonance; // 'diph-vow promotion assonance';
        }
      }
    }

    if ((maybeAssonance || rhymeType === phonstants.RhymeType.none || rhymeType === phonstants.RhymeType.diphthongAssonance)
      && !(rimes1.lastNucl.slice(0, 2) in phonstants.DIPHTHONGS)
      && rimes2.lastNucl.slice(0, 2) in phonstants.DIPHTHONGS) {
      // prom diph-second rhymes
      if ((rimes2.lastNucl.slice(-2, -1) === 'Y' && rimes1.lastNucl.slice(0, 2) === 'IY')
        || (rimes2.lastNucl.slice(-2, -1) === 'W' && rimes1.lastNucl.slice(0, 2) === 'UW')) {
        if (this.numless(rimes1.lastCoda) === this.numless(rimes2.lastCoda)) rhymeType = phonstants.RhymeType.promotionDiphthongRhyme; // 'vow-diph promotion rhyme';
        else if (rhymeType !== phonstants.RhymeType.diphthongAssonance) rhymeType = phonstants.RhymeType.promotionDiphthongAssonance; // 'vow-diph promotion assonance';
      }
    }

    // consonantal rhymes
    if ((maybeAssonance || rhymeType === phonstants.RhymeType.none) && rimes1.coda === rimes2.coda) {
      if (rimes1.coda.toString() === '' && !((rimes1.nucl.toString() + rimes2.nucl.toString()).includes('ER'))) {
        rhymeType = phonstants.RhymeType.zeroConsonance;
      } else if (rimes1.coda.toString() !== '') rhymeType = phonstants.RhymeType.fullConsonance;
    }

    if ((maybeAssonance || rhymeType === phonstants.RhymeType.none)) {
      if ((this.numless(rimes1.lastCoda) === this.numless(rimes2.coda) && rimes2.coda.toString() !== '')
        || (this.numless(rimes1.coda) === this.numless(rimes2.lastCoda) && rimes1.coda.toString() !== '')
        || (this.numless(rimes1.lastCoda) === this.numless(rimes2.lastCoda) && rimes1.lastCoda.toString() !== '')) {
        rhymeType = phonstants.RhymeType.promotionConsonance;
      } else if (rimes1.lastCoda.toString() !== '' && rimes2.lastCoda.toString() !== '') {
        for (let phone1 of rimes1.lastCoda.split(' ')) {
          if (rimes2.lastCoda.split(' ').includes(phone1) && !(phone1 in phonstants.CMUPD_VOWELS)) {
            if ((rimes1.rime === rimes2.unstRime || rimes1.lastRime === rimes2.unstRime) ||
              (rimes1.unstRime === rimes2.rime || rimes1.unstRime === rimes2.lastRime)) {
              rhymeType = phonstants.RhymeType.anisobaricRhyme;
              break;
            } else if (rimes1.unstRime === rimes2.unstRime && rimes1.unstRime.toString() !== '') {
              rhymeType = phonstants.RhymeType.unstressedRhyme;
              break;
            } else {
              rhymeType = phonstants.RhymeType.partialConsonance;
              break;
            }
          }
        }
      }
    }

    if ((maybeAssonance || rhymeType === phonstants.RhymeType.none) && rimes1.lastCoda.length) {
      if (rimes1.lastCoda === rimes2.lastcoda && rimes1.lastCoda !== '' && !((rimes1.lastNucl + rimes2.lastNucl).includes('ER'))) {
        rhymeType = phonstants.RhymeType.zeroConsonance;
      }
      for (let nas of phonstants.NASALS) {
        if (rimes1.lastCoda.includes(nas)) {
          for (let sal of phonstants.NASALS) {
            if (rimes2.lastCoda.includes(sal) && sal !== nas && !(new Pronunciation(rimes1.lastCoda + rimes2.lastCoda).getStress())) {
              rhymeType = phonstants.RhymeType.nasalConsonance;
            }
          }
        }
      }
      for (let sib of phonstants.SIBILANTS) {
        if (rimes1.lastCoda.length && sib === rimes1.lastCoda.slice(-2)) {
          for (let bis of phonstants.SIBILANTS) {
            if (rimes2.lastCoda.length && bis === rimes2.lastCoda.slice(-2) && !(new Pronunciation(rimes1.lastCoda + rimes2.lastCoda).getStress())) {
              rhymeType = phonstants.RhymeType.sibilantConsonance;
            }
          }
        }
      }
    }

    // rhymes with unstressed syllables
    if ((maybeAssonance || rhymeType === phonstants.RhymeType.none || rhymeType === phonstants.RhymeType.partialConsonance)) {
      if ((nlRime1 === this.numless(rimes2.unstRime)
        || nlLastRime1 === this.numless(rimes2.unstRime))
        || (nlRime2 === this.numless(rimes1.unstRime)
          || nlLastRime2 === this.numless(rimes1.unstRime))) {
        rhymeType = phonstants.RhymeType.anisobaricRhyme;
      } else if (rimes1.unstRime === rimes2.unstRime && rimes1.unstRime !== '') rhymeType = phonstants.RhymeType.unstressedRhyme;
    } if (maybeAssonance) rhymeType = phonstants.RhymeType.assonance;

    // *** Check for mosaic rhyme here ***

    // if (rhymeType === 'N/A') console.log(`no rhyme for ${pron1} and ${pron2}`);

    // console.log("leaving getRhymeType for",term1,"and",term2,"with",rhymeType);

    // Store the rhymeType for these pronunciations in case we need it again later
    this.rhymeInfoList.push({ pron1, pron2, rhymeType });

    return rhymeType;
  }


  private getScoreForRhymeType(rhymeType: phonstants.RhymeType): number {
    switch (rhymeType) {
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

interface RhymeInfo {
  pron1: Pronunciation;
  pron2: Pronunciation;
  rhymeType: phonstants.RhymeType;
}