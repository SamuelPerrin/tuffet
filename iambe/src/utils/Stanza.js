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

  winnower() {
    /*
     * Given a list of possible rhyme schemes and Rhymes from Stanza.getRhymeScheme, returns a list of guesses for the rhyme schemes of the stanza
     */
    
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
    else if (stan.length === 4) {
      const onetwo = new Rhyme(stan[0], stan[1]).getScore();
      const onethree = new Rhyme(stan[0], stan[2]).getScore();
      const onefour = new Rhyme(stan[0], stan[3]).getScore();
      const twothree = new Rhyme(stan[1], stan[2]).getScore();
      const twofour = new Rhyme(stan[1], stan[3]).getScore();
      const threefour = new Rhyme(stan[2], stan[3]).getScore();
      const possibles = [
        {rs:'quatr', pairs:[twofour]},
        {rs:'ababx', pairs:[onethree, twofour]},
        {rs:'abbax', pairs:[onefour, twothree]},
        {rs:'aaaax', pairs:[onetwo, onethree, onefour, twothree, twofour, threefour]},
        {rs:'cpls2', pairs:[onetwo, threefour]},
        {rs:'abaax', pairs:[onethree, onefour, threefour]},
        {rs:'aabax', pairs:[onetwo, onefour, twofour]}
      ];
      const pairs = [onetwo, onethree, onefour, twothree, twofour, threefour];
      let output = this.winnower(possibles, pairs);
    }
  }
}

export default Stanza;