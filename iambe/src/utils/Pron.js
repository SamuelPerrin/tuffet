
class Pron {
  /*
   * A string of capital letters and numerals representing the CMUPD pronunciation of a word.
   */
  constructor(text) {
    this.text = text;
    if (typeof this.text !== "string" || this.text.length === 0) {
      throw this.text.length ? new Error(`"${this.text}" is not a valid pron.`) : new Error("Pron cannot be empty.");
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
}

export default Pron