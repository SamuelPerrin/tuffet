import Rhyme from './Rhyme';

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

  getRhymeScheme() {
    /*
     * returns a guess about the stanza's rhyme scheme as a five-character string or as 'N/A'
     */
    let bestGuess = 'N/A';
    const THRESHOLD = 0.3;
    const stan = this.getLines();
    if (stan.length === 2) {
      const onetwo = new Rhyme(...stan).getScore();
      if (onetwo > THRESHOLD) bestGuess = 'cplt1';
      else bestGuess = 'irreg';
      return bestGuess;
    }
    else if (stan.length === 3) {
      const onetwo = new Rhyme(stan[0],stan[1]).getScore();
      const onethree = new Rhyme(stan[0],stan[2]).getScore();
      const twothree = new Rhyme(stan[1],stan[2]).getScore();
      if (onetwo > THRESHOLD && onethree > THRESHOLD && twothree > THRESHOLD) bestGuess = 'aaaxx';
      else if (onetwo > THRESHOLD) bestGuess = 'aabxx';
      else if (onethree > THRESHOLD) bestGuess = 'abaxx';
      else if (twothree > THRESHOLD) bestGuess = 'abbxx';
      else {
        console.log(`I'm not sure of the rhyme scheme for ${stan}`);
        bestGuess = 'irreg';
      }
      return bestGuess;
    }

  }
}

export default Stanza;