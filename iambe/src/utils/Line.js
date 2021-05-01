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

  getTerm(n=1) {
    /*
     * returns a list in reverse order of the last n words in the line, where n is 1 by default
     */
    const tokens = this.getTokens();
    let term = [];
    if (tokens.length >= n) {
      for (let i=0; i < n; i++) {
        term.push(tokens.slice(-1-i)[0]);
      }
    } else {
      for (let i=0; i<tokens.length; i++) {
        term.push(tokens.slice(-1-i)[0]);
      }
    }

    return term;
  }
}

export default Line;