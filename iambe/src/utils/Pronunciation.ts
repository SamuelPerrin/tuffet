import Rimes from "./Rimes";
import * as phonstants from './phonstants';

export default class Pronunciation extends String {
  private rimes : Rimes | null = null;

  /**
   * A string of Arab numerals representing the relative stress of the pronunciation's syllables:
   * 1 is primary stress, 
   * 2 is secondary stress,
   * 0 is minimal stress
   */
  private stresses : string = "";
  private stressesList : string[] = [];

  /* Getters */
  getStresses() : string {
    if (this.stresses.length) return this.stresses;

    const arabNumerals = ['1', '2', '3', '4', '0'];
    let stressList = [];
    for (let char of this) {
      if (arabNumerals.includes(char)) {
        stressList.push(char);
      }
    }
    this.stresses = stressList.join('');
    return this.stresses;
  }

  getStressesList() {
    if (this.stressesList.length) return this.stressesList;
    if (this.stresses.length) return this.stresses.split("");
    return this.getStresses().split("");
  }

  getRimes() {
    if (this.rimes !== null) {
      return this.rimes;
    }
    
    this.rimes = new Rimes(this);
    return this.rimes;
  }

  /* Helpers */

  /**
   * 
   * @param phone The phoneme to test as a vowel
   * @returns true is the phoneme is a CMUPD vowel, else false 
   */
  static isAVowel(phone : string) : boolean {
    return phone.length === 3
      && phone.slice(0, 2) in phonstants.CMUPD_VOWELS
      && ['1', '2', '3', '4', '0'].includes(phone.slice(2));
  }

  /**
   * Check if an object is a Pronunciation
   * @param input An object, either a pronunciation or a list of them, to check the type of
   * @returns True if input is a Pronunciation, else false
   */
  static isPronunciation(input: Pronunciation | Pronunciation[]) : input is Pronunciation {
    return (input as Pronunciation).type;
  }
}