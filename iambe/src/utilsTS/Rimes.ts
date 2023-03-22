import Pronunciation from "./Pronunciation";

export default class Rimes {
  rime: Pronunciation = null!; // the vowel of the last stressed syllable and everything after it
  nucl: Pronunciation = null!; // the vowel of the last stressed syllable
  coda: Pronunciation = null!; // everything following the last stressed syllable
  lastRime: Pronunciation = null!; // rime of the last syllable with at least secondary stress (can be same as rime)
  lastNucl: Pronunciation = null!; // vowel of the last syllable with at least secondary stress (can be same as nucleus)
  lastCoda: Pronunciation = null!; // everything following the last syllable with at least secondary stress
  unstRime: Pronunciation = null!; // the rime of the last vowel in the word, if it's unstressed
  unstNucl: Pronunciation = null!; // the last vowel of the word, if it's unstressed
  unstCoda: Pronunciation = null!; // everything that comes after the last vowel in the word, if it's unstressed
  lastPrime: number = -1000; // the index of the last vowel in the word with primary stress

  /**
   * Creates an object with properties representing parts of the pronunciation that are relevant for determining whether and how it rhymes
   * @param pronunciation the pronunciation to get rimes for
   */
  constructor(pronunciation: Pronunciation) {
    const phoneList = pronunciation.split(' ');
    this.lastPrime = this.getLastPrime(phoneList);

    // Assign rime, nucleus, and coda
    this.rime = new Pronunciation(pronunciation.slice(pronunciation.indexOf(phoneList[this.lastPrime])));
    this.nucl = new Pronunciation(phoneList[this.lastPrime]);
    if (this.rime.length > 3) this.coda = new Pronunciation(this.rime.slice(4));

    // Assign lastRime, lastNucl, and lastCoda
    if (this.coda.toString() !== '') {
      const codaPhoneList = this.coda.split(' ');
      let codaVowel = -1;
      for (let phone in codaPhoneList) {
        if (Pronunciation.isAVowel(codaPhoneList[phone])) {
          if (Number(codaPhoneList[phone].slice(-1)) > 1) {
            codaVowel = Number(phone);
            break;
          }
        }
      }

      if (codaVowel !== -1) {
        this.lastRime = new Pronunciation(this.coda.slice(this.coda.indexOf(codaPhoneList[codaVowel])));
        this.lastNucl = new Pronunciation(codaPhoneList[codaVowel]);
        if (this.lastRime.length > 3) {
          this.lastCoda = new Pronunciation(this.lastRime.slice(4));
        }
      }
    }

    if (this.lastRime.toString() === '') {
      this.lastRime = new Pronunciation(this.rime);
      this.lastNucl = new Pronunciation(this.nucl);
      this.lastCoda = new Pronunciation(this.coda);
    }

    // Assign unstRime, unstNucl, and unstCoda
    if (this.lastCoda.toString() !== '') {
      const lastCodaPhoneList = this.lastCoda.split(' ');
      let lastCodaVowel = -1;
      for (let phone in lastCodaPhoneList) {
        if (Pronunciation.isAVowel(lastCodaPhoneList[phone])) {
          lastCodaVowel = Number(phone);
          break;
        }
      }

      if (lastCodaVowel !== -1) {
        this.unstRime = new Pronunciation(this.lastCoda.slice(this.lastCoda.indexOf(lastCodaPhoneList[lastCodaVowel])));
        this.unstNucl = new Pronunciation(lastCodaPhoneList[lastCodaVowel]);
        if (this.unstRime.length > 3) {
          this.unstCoda = new Pronunciation(this.unstRime.slice(4));
        }
      }
    }
  }

  /**
   * Returns the index of the last primary-stressed syllable in a list of CMUPD phonemes.
   * If there is no primary-stressed syllable, returns the index of the last most-stressed syllable.
   * If no vowel stress is detected, returns -1.
   * @param phoneList a list of CMUPD phonemes
   */
  private getLastPrime(stressList: string[]): number {
    const phoneString: string = stressList
      .join(' ')
      .replace(/0/g, "4"); // replace 0s with 4s to make stress comparison unidirectional
    const phoneList: string[] = phoneString.split(' ');

    let indexOfLastPrime: number = -1;
    let greatestStress: number = 5;
    phoneList.forEach((phone, index) => {
      let stress = Number(phone.slice(-1));
      if (isNaN(stress)) { return; }
      if (stress <= greatestStress) {
        indexOfLastPrime = index;
        greatestStress = stress;
      }
    })

    return indexOfLastPrime;
  }
}