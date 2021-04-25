
class Pron {
  /*
   * A string of capital letters and numerals representing the CMUPD pronunciation of a word.
   */
  constructor(text) {
    this.text = text;
  }

  getStress() {
    const arabs = ['1','2','3','4','0'];
    let stresses = [];
    for (let char in this.text) {
      if (arabs.includes(char)) {
        stresses.push(char);
      }
    }
    stresses = stresses.join('');
    return stresses
  }
}

export default Pron