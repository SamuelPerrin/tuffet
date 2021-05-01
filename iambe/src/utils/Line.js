import * as phonstants from './phonstants';

class Line {
  // a string that represents a line of verse
  constructor(text) {
    this.text = text.trim();
  }

  getTokens() {
    /*
     * returns an order-preserving list of strings representing the words in the line, with punctuation removed
     */
    let line = this.text;
    for (let i in phonstants.PUNCTS_TO_DELETE) {
      line = line.replace(phonstants.PUNCTS_TO_DELETE[i],'');
    }
    for (let i in phonstants.PUNCTS_TO_SPACE) {
      line = line.replace(phonstants.PUNCTS_TO_SPACE[i],' ');
    }

    return line.split(' ');
  }
}

export default Line;