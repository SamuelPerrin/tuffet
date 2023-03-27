import lexicon from './lexicon';
import cmupd from './cmupd';
import Pronunciation from './Pronunciation';
import * as phonstants from './phonstants';

/**
 * A string that represents a word
 */
export default class Word {
  text: string = "";
  static last: string[] = [];

  constructor(text: string) {
    this.text = text.toLowerCase();

    if (text.length === 0) throw new Error(`Word cannot be empty.`);

    // remove initial apostrophes except from words like 'tis and 'twas
    if (this.text.charAt(0) === "'" && this.text.slice(1, 4) !== 'tis' && this.text.slice(1, 3) !== 'tw') {
      this.text = this.text.slice(1);
    }

    // remove terminal apostrophes except from words like th' and i'
    if (this.text.slice(-1) === "'" && !["th'", "o'", "i'"].includes(this.text)) {
      this.text = this.text.slice(0, -1);
    }

    // replace certain accented characters
    if (this.text.includes('ó')) this.text = this.text.replace('ó', 'o');
    if (this.text.includes('é')) this.text = this.text.replace('é', 'e');
  }

  /**
   * Returns the pronunciation of the word in CMUPD symbols from lexicon.
   * Output is a string for words with only one possible pronunciation.
   * Output is an array of strings for words with multiple possible pronunciations.
   * 
   * @param returnArray optional flag to force the return value to be an array of strings
   */
  getPronunciation(returnArray: false): Pronunciation | Pronunciation[];
  getPronunciation(returnArray: true): Pronunciation[];
  getPronunciation(returnArray: boolean = false): Pronunciation | Pronunciation[] {
    let pronunciation: Pronunciation | Pronunciation[];

    // Check the lexicon for the pronunciation
    if (this.text in lexicon) {
      if (lexicon[this.text].length === 1) {
        pronunciation = returnArray
          ? lexicon[this.text].map(p => new Pronunciation(p))
          : new Pronunciation(lexicon[this.text][0]);
      } else if (returnArray) {
        pronunciation = lexicon[this.text].map(p => new Pronunciation(p));
      } else {
        // otherwise, if all pronunciations have the same stresses, return first, else return list
        pronunciation = lexicon[this.text].map(p => new Pronunciation(p));
        if (pronunciation
          .map(p => p.getStresses())
          .every(st => st === (pronunciation as Pronunciation[])[0].getStresses())) {
          pronunciation = pronunciation[0];
        }
      }
    }

    // If the lexicon doesn't have the pronunciation, get it from CMUPD or by guessing
    else {
      const hardPronunciation = this.getHardPronunciation(returnArray);
      if (hardPronunciation != null) {
        if (returnArray && Pronunciation.isPronunciation(hardPronunciation)) {
          pronunciation = [hardPronunciation];
        } else {
          pronunciation = hardPronunciation;
        }
      }
      else throw new Error(`Couldn't pronounce ${this.text} in getHardPronunciation.`);
    }

    pronunciation = this.correctPronunciation(pronunciation);

    return pronunciation;
  }

  /**
   * Checks for certain easily fixed problems in individual pronunciations or lists of pronunciations, returning correcting pronunciation(s)
   * @param pronunciation 
   */
  private correctPronunciation(pronunciation: Pronunciation | Pronunciation[]): Pronunciation | Pronunciation[] {
    const ENDS_IN_DACTYL: { [key: string]: boolean } = {
      '100': true,
      '0100': true,
      '2100': true,
      '20100': true,
      '10200': true,
    }
    let newPronunciation: Pronunciation | Pronunciation[] = pronunciation;

    // Add minimal stress to dactyl suffixes in -y 
    if (Pronunciation.isPronunciation(pronunciation)) {
      if (pronunciation.getStresses() in ENDS_IN_DACTYL && pronunciation.slice(-3) === 'IY0') {
        newPronunciation = new Pronunciation(pronunciation.slice(0, -1) + '3');
      }
    } else if (Array.isArray(pronunciation)) {
      newPronunciation = [];
      for (let each of pronunciation) {
        if (each.getStresses() in ENDS_IN_DACTYL && each.slice(-3) === 'IY0') {
          newPronunciation.push(new Pronunciation(each.slice(0, -1) + '3'));
        } else {
          newPronunciation.push(each);
        }
      }
    }

    // Resolve problems with lists of prons

    // *** come back to this with a diff-checking solution ***
    // pick between two prons when the only difference is pronouncing unstressed syl as AH0 or IH0 (picking IH0)

    // pick between two prons when the only difference is the presence of a T after an N (choosing T)

    // pick between two prons when the only difference is the presence of an H before W in 'wh' (choosing no H)

    // pick between two prons when the only difference is the presence of a P between M and T (choosing P)

    // pick between two prons when the only difference is the presence of an IH0 or IY0 after R (choosing IH0) ["R IH0 P AO1 R T", not "R IY0 P AO1 R T"]

    return newPronunciation;
  }

  /**
   * Returns a guess at the pronunciation of a word that isn't in the lexicon.
   * @param returnArray optional flag to force the return value to be an array of strings
   * @returns 
   */
  private getHardPronunciation(returnArray: boolean): PronunciationType {
    // first check for a familiar root
    const check = this.checkHardPronunciation();
    if (check && check.length > 0) return check;

    // If that doesn't work, but the CMUPD has pronunciation(s) for the word, use that
    let pronunciation: Pronunciation | Pronunciation[] | null = null;

    if (this.text in cmupd) {
      if (cmupd[this.text].length === 1) {
        return returnArray
          ? cmupd[this.text].map(p => new Pronunciation(p))
          : new Pronunciation(cmupd[this.text][0]);
      } else if (returnArray) {
        return cmupd[this.text].map(p => new Pronunciation(p));
      } else {
        pronunciation = cmupd[this.text].map(p => new Pronunciation(p));
        if (pronunciation
          .map(p => p.getStresses())
          .every(st => st === (pronunciation as Pronunciation[])[0].getStresses())) {
          return pronunciation[0];
        }
      }
    }

    // Otherwise, guess the pronunciation
    const guess = this.guessHardPronunciation();
    if (guess.length > 0) return guess;

    return null;
  }

  /**
   * Returns a guess at the pronunciation of a word that isn't in CMUPD by pronouncing the root and affix(es) separately.
   */
  private checkHardPronunciation(): PronunciationType {
    let pronunciation: Pronunciation | null = null;

    // a helper function that makes different adjustments to pronunciations based on characteristic features of the last phoneme
    const checkLastPhone = function (
      word: string,
      lastLet: string,
      phonstArr: PhoneObject[],
      elsePhon: string,
      adjust: number = 0,
      addin: string = ''
    ): Pronunciation | null {
      const root = word.slice(0, lastLet.length + adjust) + addin;
      if (word.slice(-lastLet.length) === lastLet && root in lexicon) {
        const rootPronunciation = lexicon[root][0];
        const rootPronunciationList = rootPronunciation.split(' ');
        const lastPhone = rootPronunciationList[rootPronunciationList.length - 1];

        for (let each of phonstArr) {
          if (lastPhone in each.obj) {
            return new Pronunciation(rootPronunciation + each.phone);
          }
        }
        return new Pronunciation(rootPronunciation + elsePhon);
      }
      return null;
    }

    // check if root + -s, -'s, -es, -ed, or -'d can be pronounced
    pronunciation = checkLastPhone(this.text, "ed", [{ obj: phonstants.MAKES_PAST_WITH_T, phone: ' T' }, { obj: phonstants.MAKES_PAST_WITH_ID, phone: ' IH0 D' }], ' D', 1);
    if (pronunciation) return pronunciation;

    pronunciation = checkLastPhone(this.text, "s", [{ obj: phonstants.MAKES_PLURAL_WITH_S, phone: ' S' }, { obj: phonstants.MAKES_PLURAL_WITH_IZ, phone: ' IH0 Z' }], ' Z');
    if (pronunciation) return pronunciation;

    pronunciation = checkLastPhone(this.text, "'s", [{ obj: phonstants.MAKES_PLURAL_WITH_S, phone: ' S' }, { obj: phonstants.MAKES_PLURAL_WITH_IZ, phone: ' IH0 Z' }], ' Z');
    if (pronunciation) return pronunciation;

    pronunciation = checkLastPhone(this.text, "’s", [{ obj: phonstants.MAKES_PLURAL_WITH_S, phone: ' S' }, { obj: phonstants.MAKES_PLURAL_WITH_IZ, phone: ' IH0 Z' }], ' IH0 Z');
    if (pronunciation) return pronunciation;

    pronunciation = checkLastPhone(this.text, "es", [], ' IH0 Z');
    if (pronunciation) return pronunciation;

    pronunciation = checkLastPhone(this.text, "ed", [{ obj: phonstants.MAKES_PAST_WITH_T, phone: " T" }, { obj: phonstants.MAKES_PAST_WITH_ID, phone: " IH0 D" }], ' D');
    if (pronunciation) return pronunciation;

    pronunciation = checkLastPhone(this.text, "'d", [{ obj: phonstants.MAKES_PAST_WITH_T, phone: ' T' }, { obj: phonstants.MAKES_PAST_WITH_ID, phone: ' IH0 D' }], ' D', 0, 'e');
    if (pronunciation) return pronunciation;

    pronunciation = checkLastPhone(this.text, "’d", [{ obj: phonstants.MAKES_PAST_WITH_T, phone: ' T' }, { obj: phonstants.MAKES_PAST_WITH_ID, phone: ' IH0 D' }], ' D', 0, 'e');
    if (pronunciation) return pronunciation;

    pronunciation = checkLastPhone(this.text, "’d", [{ obj: phonstants.MAKES_PAST_WITH_T, phone: ' T' }, { obj: phonstants.MAKES_PAST_WITH_ID, phone: ' IH0 D' }], ' D', 0);
    if (pronunciation) return pronunciation;

    pronunciation = checkLastPhone(this.text, "'d", [{ obj: phonstants.MAKES_PAST_WITH_T, phone: ' T' }, { obj: phonstants.MAKES_PAST_WITH_ID, phone: ' IH0 D' }], ' D', 0);
    if (pronunciation) return pronunciation;

    // a helper function that makes different adjustments to pronunciations depending on the stress of the last syllable
    const checkLastStress = function (
      word: string,
      lastLet: string,
      afterUnstressedEnd: string,
      afterStressedEnd: string): Pronunciation | null {
      const root = word.slice(0, -lastLet.length);
      if (word.slice(-lastLet.length) === lastLet && root in lexicon) {
        const stressString = new Pronunciation(lexicon[root][0]).getStresses();
        const lastSyllableStress = stressString[stressString.length - 1];
        if (lastSyllableStress === '0') {
          return new Pronunciation(lexicon[root][0] + afterUnstressedEnd);
        }

        return new Pronunciation(lexicon[root][0] + afterStressedEnd);
      }
      return null;
    }

    // check if root + -ing, -less, -ness, -ly , -able, -ful, or -ment can be pronounced
    pronunciation = checkLastStress(this.text, 'ing', " IH3 NG", " IH0 NG");
    if (pronunciation) return pronunciation;

    pronunciation = checkLastStress(this.text, 'less', " L AH3 S", " L AH0 S");
    if (pronunciation) return pronunciation;

    pronunciation = checkLastStress(this.text, 'ness', " N AH3 S", " N AH0 S");
    if (pronunciation) return pronunciation;

    pronunciation = checkLastStress(this.text, 'ly', " L IY3", " L IY0");
    if (pronunciation) return pronunciation;

    pronunciation = checkLastStress(this.text, 'able', " AH3 B AH0 L", " AH0 B AH3 L");
    if (pronunciation) return pronunciation;

    pronunciation = checkLastStress(this.text, 'ful', " F AH3 L", " F AH0 L");
    if (pronunciation) return pronunciation;

    pronunciation = checkLastStress(this.text, 'ment', " M AH3 N T", " M AH0 N T");
    if (pronunciation) return pronunciation;

    // a helper function that tacks on an ending to a pronunciation if the word has a given ending
    const checkEnding = function (word: string, lastLet: string, substring: string, adjust: number = 0): Pronunciation | null {
      const root = word.slice(0, -lastLet.length + adjust);
      if (word.slice(-lastLet.length) === lastLet && root in lexicon) {
        return new Pronunciation(lexicon[root][0] + substring);
      }

      return null;
    }

    // check if root + -eth, -er, or -est can be pronounced
    pronunciation = checkEnding(this.text, 'eth', ' IH0 TH', 1);
    if (pronunciation) return pronunciation;

    pronunciation = checkEnding(this.text, "'th", ' TH');
    if (pronunciation) return pronunciation;

    pronunciation = checkEnding(this.text, 'eth', ' IH0 TH');
    if (pronunciation) return pronunciation;

    pronunciation = checkEnding(this.text, 'er', ' ER0', 1);
    if (pronunciation) return pronunciation;

    pronunciation = checkEnding(this.text, 'er', ' ER0');
    if (pronunciation) return pronunciation;

    pronunciation = checkEnding(this.text, 'est', 'IH0 S T', 1);
    if (pronunciation) return pronunciation;

    pronunciation = checkEnding(this.text, 'est', ' IH0 S T');
    if (pronunciation) return pronunciation;

    pronunciation = checkEnding(this.text, "'st", ' S T');
    if (pronunciation) return pronunciation;

    pronunciation = checkEnding(this.text, "’st", ' S T');
    if (pronunciation) return pronunciation;

    pronunciation = checkEnding(this.text, 'st', ' S T');
    if (pronunciation) return pronunciation;

    // A helper function that adds a prefix
    const checkPrefix = function (word: string, prefixSpelling: string, prefixPronunciation: string): Pronunciation | null {
      const root = word.slice(prefixSpelling.length);
      if (word.slice(0, prefixSpelling.length) === prefixSpelling && root in lexicon) {
        return new Pronunciation(prefixPronunciation + lexicon[root]);
      }
      return null;
    }

    // Check if un + root can be pronounced
    pronunciation = checkPrefix(this.text, 'un', "AH2 N");
    if (pronunciation) return pronunciation;

    // Check if word can be pronounced with any apostrophes changed to e
    if (this.text.includes("'")) {
      if (this.text.replace("'", 'e') in lexicon) return lexicon[this.text.replace("'", 'e')].map(p => new Pronunciation(p));
    }

    // Try switching apostrophes if necessary
    if (this.text.includes("’")) {
      this.text = this.text.replace("’", "'");
      return this.getPronunciation(false);
    }

    return pronunciation;
  }

  /**
   * Returns a guess at the pronunciation of a word that isn't in the lexicon by guessing for each vowel- and consonant-cluster
   */
  private guessHardPronunciation(): Pronunciation {
    let pronunciation = '';
    const clusters = this.atomize();
    for (let c = 0; c < clusters.length; c++) {
      if (clusters[c].length === 1) {
        if (clusters[c] in phonstants.ALPHA_VOWELS) { // it's a vowel
          if (clusters.length >= c + 3 && clusters[c + 1] in phonstants.CONSONANTS && clusters[c + 2] === 'e') { // check for terminal VCe
            pronunciation += phonstants.LONG_VOWELS[clusters[c]];
          } else if (clusters[c] === 'e') { // letter is e
            if (clusters.length === c + 2) { // e is penult cluster
              if (pronunciation.slice(-2, -1) === 'R' && pronunciation.length >= 4 && pronunciation.slice(-4, -3) in ['B', 'C', 'D', 'F', 'G', 'K', 'P', 'T', 'V']) {
                pronunciation += 'IH0 '; // not sure this rule is right: Cre
              } else if (clusters[c + 1] === 'd') { // ends in ed
                if (pronunciation.slice(-2, -1) in ['T', 'D']) {
                  pronunciation += 'IH0 ';
                } else continue
              } else if (clusters[c + 1] === 's') { // ends in es
                pronunciation += 'IH0 '; // this might be wrong
              } else pronunciation += 'EH2 ';
            } else if (clusters.length === c + 1) { // e is last cluster
              if (pronunciation.slice(-2, -1) === 'L' && pronunciation.slice(-4, -3).toLowerCase() in phonstants.CONSONANTS) { // terminal Cle
                pronunciation = pronunciation.slice(0, -2) + 'AH0 L ';
              }
            } else pronunciation += 'EH0 ';
          } else if (c + 1 === clusters.length) { // last cluster in non-e vowel
            pronunciation += phonstants.TERM_VOWELS[clusters[c]];
          } else { // vowel isn't e and isn't before 'silent' e and isn't terminal
            pronunciation += phonstants.SHORT_VOWELS[clusters[c]];
          }
        } else if (clusters[c] in phonstants.CONSONANTS) { // it's a single consonant
          pronunciation += phonstants.CONSONANTS[clusters[c]];
        } else if (clusters[c] === 'r') { // it's an r
          pronunciation += 'R ';
        } else if (clusters[c] === 'y') { // it's a y
          if (c === 0) pronunciation += 'Y '; // it's an initial Y
          else if (clusters.length >= c + 2 && clusters[c + 1] in phonstants.CONSONANTS && clusters[c + 2] === 'e') { // it's yCe
            pronunciation += phonstants.LONG_VOWELS[clusters[c]];
          } else if (clusters[c - 1][0] in phonstants.CONSONANTS) { // y is preceded by a consonant cluster
            if (clusters.length > 2) pronunciation += 'IY2 ';
            else pronunciation += 'AY1 ';
          } else pronunciation += 'IY2 ';
        } else if (clusters[c] === 'w') pronunciation += 'W ';
      } else if (clusters[c].length === 2) {
        if (clusters[c] in phonstants.DIGRAPHS) pronunciation += phonstants.DIGRAPHS[clusters[c]];
        else if (clusters[c] in phonstants.DIGRAMS) pronunciation += phonstants.DIGRAMS[clusters[c]];
        else if (clusters[c].slice(-1) === 'r') {
          if (clusters[c].slice(-2, -1) in phonstants.ALPHA_VOWELS) {
            pronunciation += phonstants.VOWEL_R[clusters[c]];
          }
        } else if (clusters[c].slice(-1) in phonstants.CONSONANTS) {
          for (let char of clusters[c]) {
            pronunciation += phonstants.CONSONANTS[char];
          }
        } else if (clusters[c].slice(0, 1) in phonstants.ALPHA_VOWELS && clusters[c].slice(1, 2) in phonstants.ALPHA_VOWELS) {
          pronunciation += phonstants.LONG_VOWELS[clusters[c].slice(0, 1)];
          pronunciation += phonstants.SHORT_VOWELS[clusters[c].slice(1, 2)];
        }
      } else if (clusters[c].length === 3) {
        if (clusters[c] in phonstants.TRIGRAPHS) pronunciation += phonstants.TRIGRAPHS[clusters[c]];
        else if (clusters[c] in phonstants.TRIGRAMS) pronunciation += phonstants.TRIGRAMS[clusters[c]];
        else if (clusters[c] in phonstants.DIGRAPH_R) pronunciation += phonstants.DIGRAPH_R[clusters[c]];
        else if (clusters[c].slice(-1) in phonstants.CONSONANTS || clusters[c].slice(-1) === 'r') { // weird cons cluster ending in r (?)
          if (clusters[c].slice(0, 2) in phonstants.DIGRAMS) pronunciation += phonstants.DIGRAMS[clusters[c].slice(0, 2)] + 'R ';
        }
      } else if (clusters[c].length === 4) {
        if (clusters[c].slice(0, 2) in phonstants.DIGRAMS) {
          pronunciation += phonstants.DIGRAMS[clusters[c].slice(0, 2)];
          if (clusters[c].slice(2) in phonstants.DIGRAMS) {
            pronunciation += phonstants.DIGRAMS[clusters[c].slice(2)];
          } else if (clusters[c].slice(2) in phonstants.VOWEL_R) pronunciation += phonstants.VOWEL_R[clusters[c].slice(2)];
        } else if (clusters[c].slice(0, 2) in phonstants.VOWEL_R) {
          pronunciation += phonstants.VOWEL_R[clusters[c].slice(0, 2)];
          if (clusters[c].slice(2) in phonstants.VOWEL_R) pronunciation += phonstants.VOWEL_R[clusters[c].slice(2)];
          else if (clusters[c].slice(2) in phonstants.DIGRAMS) pronunciation += phonstants.DIGRAMS[clusters[c].slice(2)];
        } else {
          for (let char of clusters[c]) {
            if (char in phonstants.CONSONANTS) pronunciation += phonstants.CONSONANTS[char];
          }
        }
      } else if (clusters[c].length > 4) {
        for (let char of clusters[c]) {
          if (char in phonstants.CONSONANTS) pronunciation += phonstants.CONSONANTS[char];
        }
      }
    }

    pronunciation = pronunciation.trim();

    // check for mistakes related to 'tion' and 'ed'
    if (this.text.includes('tion') && pronunciation.includes('T AH0 N')) {
      if (pronunciation.includes('AE2 T AH0 N')) pronunciation = pronunciation.replace('AE2 T AH0 N', 'EY1 SH AH0 N');
      else if (pronunciation.includes('AH2 T AH0 N')) pronunciation = pronunciation.replace('AH2 T AH0 N', 'UW1 SH AH0 N');
      else if (pronunciation.includes('AA2 T AH0 N')) pronunciation = pronunciation.replace('AA2 T AH0 N', 'OW1 SH AH0 N');
      else pronunciation = pronunciation.replace('T AH0 N', 'SH AH0 N');
    } else if (this.text.slice(-2) === 'ed' && pronunciation.slice(-3, -2) in ['F', 'K', 'P', 'S']) pronunciation = pronunciation.slice(0, -1) + 'T';

    pronunciation = this.guessStress(pronunciation);

    return new Pronunciation(pronunciation);
  }

  /**
   * Makes a guess at the correct stress for a word from guessHardPronunciation and returns the corrected pronunciation;
   * @param pronunciation The pronunciation to have its stress corrected
   * @returns The pronunciation with corrected stress
   */
  private guessStress(pronunciation: string): string {
    // Add primary stress to a one-syllable pronunciation
    if (new Pronunciation(pronunciation).getStresses().length === 1 && !pronunciation.includes('1')) {
      for (let char of pronunciation) {
        if (['2', '3', '4', '0'].includes(char)) {
          pronunciation = pronunciation.replace(char, '1');
        }
      }
    }

    return pronunciation;
  }

  /**
   * Returns a sequential list of the vowel- and consonant-clusters that make up the word's spelling, so that its pronunciation can be guessed at
   */
  private atomize(): string[] {
    let atom = '';
    const atoms: string[] = [];
    for (let char of this.text) {
      if (char in phonstants.ALPHA_VOWELS) {
        if (char.length === 0 || atom.slice(-1) in phonstants.ALPHA_VOWELS) {
          atom += char;
        } else if (atom.slice(-1) in phonstants.CONSONANTS) {
          atoms.push(atom);
          atom = char;
        } else switch (atom.slice(-1)) {
          case 'r':
            if (atom.length > 1 && atom.slice(-2, -1) in phonstants.ALPHA_VOWELS) {
              if (char === 'e') atom += char;
              else {
                atoms.push(char);
                atom = char;
              }
            } else {
              atoms.push(atom);
              atom = char;
            }
            break;
          case 'w':
          case 'y':
            atoms.push(atom);
            atom = char;
            break;
          case 'q':
            atom += char;
            atoms.push(atom);
            atom = '';
            break;
          default:
            console.log(`in Word.atomize with ${this.text} and got this letter I don't know what to do with: ${char}.
            `);
            break;
        }
      } else if (char in phonstants.CONSONANTS) {
        if (atom.length === 0) atom = char;
        else if (atom.slice(-1) in phonstants.ALPHA_VOWELS) {
          atoms.push(atom);
          atom = char;
        } else if (atom.slice(-1) in phonstants.CONSONANTS) {
          if (atom.length === 2 && char === 'l' && !((atom + char) in phonstants.TRIGRAMS)) {
            atoms.push(atom);
            atom = char;
          } else atom += char;
        } else switch (atom.slice(-1)) {
          case 'r':
          case 'y':
            atoms.push(atom);
            atom = char;
            break;
          case 'w':
            if (atom.length > 1 && atom.slice(-2, -1) in phonstants.ALPHA_VOWELS) {
              atoms.push(atom);
              atom = char;
            } else if (atom.length > 1 && atom.slice(-2, -1) in phonstants.CONSONANTS) atom += char;
            else if (atom.length === 1) atom += char;
            break;
          default:
            break;
        }
      } else if (char === 'r') {
        if (atom.length === 0) atom = char;
        else if (atom.slice(-1) === 'y') {
          atoms.push(atom);
          atom = char;
        } else atom += 'r';
      } else if (char === 'w') {
        if (atom.length === 0) atom = char;
        else if (atom.slice(-1) in phonstants.ALPHA_VOWELS) {
          atom += char;
          atoms.push(atom);
          atom = '';
        } else if (atom.slice(-1) in phonstants.CONSONANTS) atom += char;
        else if (atom.slice(-1) in ['r', 'y']) {
          atoms.push(atom);
          atom = char;
        }
      } else if (char === 'y') {
        if (atom.length === 0) atom = char;
        else if (atom.slice(-1) in phonstants.ALPHA_VOWELS) atom += char;
        else if (atom.slice(-1) in phonstants.CONSONANTS) {
          atoms.push(atom);
          atom = char;
        } else if (atom.slice(-1) in ['r', 'w']) {
          atoms.push(atom);
          atom = char;
        }
      } else if (char === 'q') {
        if (atom !== '') {
          atoms.push(atom);
          atom = char;
        } else atom = char;
      }
    } if (atom !== '') atoms.push(atom);

    return atoms;
  }

  /**
   * Returns an order-preserving array of integers representing the relative stress of each syllable in the word.
   * @param crux Optional flag to return a list that preserves the ambiguity in the line's pronunciation
   */
  getStressList(crux: boolean = false): number[] | number[][] | 'crux' {
    const ALWAYS_STRESSED = { 'ah': true, 'o': true };

    let pronunciation = this.getPronunciation(false);

    // For words with multiple possible pronunciations
    if (Array.isArray(pronunciation)) {
      if (!crux) return 'crux';
      else {
        const possibles = [];
        for (let each of pronunciation) {
          let stress = [];
          for (let phone of each) {
            switch (phone) {
              case '0':
                stress.push(4);
                break;
              case '1':
                stress.push(1);
                break;
              case '2':
                stress.push(2);
                break;
              case '3':
                stress.push(3);
                break;
              case '4':
                stress.push(4);
                break;
              default:
                break;
            }
          }

          // stressed monosyllables get secondary stress
          if (stress.length === 1 && stress[0] === 1 && !(this.text in ALWAYS_STRESSED)) {
            stress = [2];
          }

          possibles.push(stress);
        }

        return possibles;
      }
    }

    // For words with only one possible pronunciation
    // Make some corrections for particular words
    const lastWord = Word.last.length > 0 ? Word.last[Word.last.length - 1] : '';
    if (this.text === 'yet' && lastWord === 'and') pronunciation = new Pronunciation('Y EH1 T');
    else if (this.text === 'so' && lastWord === 'and') pronunciation = new Pronunciation('S OW1');
    else if (this.text === 'if' && (lastWord === 'and' || lastWord == 'as')) pronunciation = new Pronunciation('IH1 F');
    else if (Word.last.length > 0) {
      if (lastWord in phonstants.PREPOSITIONS) {
        if (this.text in phonstants.DETERMINERS) {
          // de-stress determiners after prepositions
          pronunciation = new Pronunciation(pronunciation.toString().replace(/[123]/g, '4'));
        } else if (this.text in phonstants.PER_PRON_OBJ) {
          pronunciation = new Pronunciation(pronunciation.toString().replace('3', '2'));
        }
      }
    }

    // Convert pronunciation to stress list
    let stress = [];
    for (let phone of pronunciation) {
      switch (phone) {
        case '0':
          stress.push(4);
          break;
        case '1':
          stress.push(1);
          break;
        case '2':
          stress.push(2);
          break;
        case '3':
          stress.push(3);
          break;
        case '4':
          stress.push(4);
          break;
        default:
          break;
      }
    }

    // A couple more corrections
    if (stress.length === 1 && stress[0] === 1 && !(this.text in ALWAYS_STRESSED)) stress = [2];

    if (stress.length === 1 && Word.last.length > 0 && lastWord in ['how', 'so']) {
      if (!(this.text in phonstants.DETERMINERS || this.text in phonstants.PREPOSITIONS || this.text in phonstants.PER_PRON_SUB || this.text in phonstants.PER_PRON_OBJ || this.text in phonstants.VERB_TO_BE || this.text === 'much')) {
        stress = [1];
      }
    }

    Word.last.push(this.text);

    return stress;
  }
}

interface PhoneObject {
  obj: { [key: string]: boolean };
  phone: string;
}

export type PronunciationType = Pronunciation | Pronunciation[] | null;