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

  winnower(rhymeSchemes,rhymes,recurring=false) {
    /*
     * Given a list of possible rhyme scheme objects and an object of rhyme scores from Stanza.getRhymeScheme, returns a list of guesses for the rhyme schemes of the stanza
     */
    let bestGuess = 'N/A';
    // console.log(`in winnower with rhymes: ${rhymes}\nand rhymeSchemes ${rhymeSchemes}`)

    // Weed out linepairs that don't rhyme in any discernible way, leaving only rhyming pairs
    // a list of linepairs that rhyme somehow, where each element is a list [key, rhymes[key]]
    const nonzeroes = Object.entries(rhymes).filter(x => x[1] > 0); 

    console.log(`about to check length of nonzeroes: ${nonzeroes}`)
    if (nonzeroes.length === 0) return [bestGuess];
    else {
      nonzeroes.sort((a,b) => a[1] - b[1]) // sort rhyme scores in ascending order
      const ones = nonzeroes.filter(x => x[1] === 1); // a list of all the linepairs with full rhyme
    
      // Check if the fullest rhyme in nonzeroes is also in each rhyme scheme in rhymeSchemes, adding them to a list called secondPossibles
      // The only rhyme schemes that can go on are those that can account for the fullest rhyme(s) in the stanza
      const secondPossibles = rhymeSchemes.filter(scheme => {
        if (ones.length > 0) {
          return ones.every(pair => scheme.pairs.includes(pair[0]));
        } else {
          return scheme.pairs.includes(nonzeroes[nonzeroes.length - 1][0]) ? true : false;
          // if (scheme.pairs.includes(nonzeroes[nonzeroes.length - 1][0])) {
          //   console.log(`scheme.pairs, ${scheme.pairs}, includes ${nonzeroes[nonzeroes.length - 1][0]}`)
          //   return true;
          // } else {
          //   console.log(`scheme.pairs, ${scheme.pairs}, doesn't include ${nonzeroes[nonzeroes.length - 1][0]}`)
          //   return false;
          // }
        }
      })
      console.log(`secondPossibles: ${secondPossibles}`);

      // if there aren't any stanzas that account for all the full rhymes, reset 1s to 0.9 and try again
      if (!secondPossibles.length) {
        const noOnes = Object.fromEntries(Object.entries(rhymes).map(k => k[1] === 1 ? [k[0],0.9] : [k[0],k[1]]));
        console.log(`too many ones, so trying again with noOnes: ${Object.entries(noOnes)}`);
        if (!recurring) return this.winnower(rhymeSchemes,noOnes,true);
      } else {
        // count how many nonrhymes the remaining options would produce
        if (secondPossibles.length === 1) {
          let zeroes = 0;
          console.log(`secondPossibles[0]: ${secondPossibles[0].rs}, ${secondPossibles[0].pairs}`)
          secondPossibles[0].pairs.forEach(x => zeroes += rhymes[x] === 0 ? 1 : 0);
          if (zeroes < 2) return [secondPossibles[0].rs]
          else {
            console.log(`My best guess was ${secondPossibles[0].rs}, but it had ${zeroes} zeroes`);
            return bestGuess;
          }
        }

      }

    }


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
        {rs:'quatr', pairs:['twofour']},
        {rs:'ababx', pairs:['onethree', 'twofour']},
        {rs:'abbax', pairs:['onefour', 'twothree']},
        {rs:'aaaax', pairs:['onetwo', 'onethree', 'onefour', 'twothree', 'twofour', 'threefour']},
        {rs:'cpls2', pairs:['onetwo', 'threefour']},
        {rs:'abaax', pairs:['onethree', 'onefour', 'threefour']},
        {rs:'aabax', pairs:['onetwo', 'onefour', 'twofour']},
      ];
      const allScores = {
        'onetwo':onetwo,
        'onethree':onethree,
        'onefour':onefour,
        'twothree':twothree,
        'twofour':twofour,
        'threefour':threefour,
      };
      let output = this.winnower(possibles, allScores);
    }
  }
}

export default Stanza;