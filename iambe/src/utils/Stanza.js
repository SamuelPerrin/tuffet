

class Stanza {
  // a string that represents a stanza of verse, with lines divided by \n
  constructor(text) {
    this.text = text;
  }

  getLines() {
    // returns an order-preserving list of strings representing the lines of the stanza
    const lines = this.text.split('\n').filter(x => !!x);
    return lines;
  }
}

export default Stanza;