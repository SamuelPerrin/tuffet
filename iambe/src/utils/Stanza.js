import Line from './Line';
import Rhyme from './Rhyme';

class Stanza {
  // a string that represents a stanza of verse, with lines divided by \n
  constructor(text) {
    this.text = text;
  }

  getLines() {
    // returns an order-preserving list of strings representing the lines of the stanza
    return this.text.split('\n').filter(x => !!x);
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

    // console.log(`about to check length of nonzeroes: ${nonzeroes}`);
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
      // console.log(`secondPossibles: ${secondPossibles.map(x => " | " + x.rs + ": " + x.pairs.toString())}`);

      // if there aren't any stanzas that account for all the full rhymes, reset 1s to 0.9 and try again
      if (!secondPossibles.length) {
        const noOnes = Object.fromEntries(Object.entries(rhymes).map(k => k[1] === 1 ? [k[0],0.9] : [k[0],k[1]]));
        // console.log(`too many ones, so trying again with noOnes: ${Object.entries(noOnes)}`);
        if (!recurring) return this.winnower(rhymeSchemes,noOnes,true);
      } 
      else {
        // count how many nonrhymes the remaining options would produce
        if (secondPossibles.length === 1) {
          let zeroes = 0;
          // console.log(`secondPossibles[0]: ${secondPossibles[0].rs}, ${secondPossibles[0].pairs}`);
          secondPossibles[0].pairs.forEach(x => zeroes += rhymes[x] === 0 ? 1 : 0);
          if (zeroes < 2) return [secondPossibles[0].rs]
          else {
            // console.log(`My best guess was ${secondPossibles[0].rs}, but it had ${zeroes} zeroes`);
            return bestGuess;
          }
        } else {
          // check if the rhymes in each rhymeScheme in secondPossibles are also in nonzeroes
          // only stanzas that don't result in any non-rhymes will be allowed into thirdPossibles
          const thirdPossibles = secondPossibles.filter(scheme => scheme.pairs.every(pair => nonzeroes.map(item => item[0]).includes(pair)));
          if (!thirdPossibles.length) {
            // console.log(`that filtered out all of them: length ${thirdPossibles.length}\nRunning again with nonzeroes instead of rhymes`);
            const new_scores = {};
            nonzeroes.forEach(i => new_scores[i[0]] = i[1]);
            return this.winnower(rhymeSchemes,new_scores);
          }
          else {
            // console.log(`thirdPossibles: ${thirdPossibles.map(x => " | " + x.rs + ": " + x.pairs.toString())}`);
            if (thirdPossibles.length === 1) { // found it?!
              bestGuess = thirdPossibles[0].rs;
              return [bestGuess];
            } else {
              // Average the scores of the rhymes of each remaining rs, returning the one with the highest average
              // In other words, only the rs that best accounts for the stanza's rhymes will be allowed through
              const fourthPossibles = thirdPossibles.map(i => [i.rs, (i.pairs.reduce((a,b) => a + rhymes[b], 0)) / i.pairs.length]);
              // console.log(`fourthPossibles: ${fourthPossibles.toString()}`);
              bestGuess = fourthPossibles.sort((a,b) => b[1] - a[1]);
              return bestGuess;
            }
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
      let fourthPossibles = [];

      const allScores = {
        'onetwo':onetwo,
        'onethree':onethree,
        'onefour':onefour,
        'twothree':twothree,
        'twofour':twofour,
        'threefour':threefour,
      };

      let output = this.winnower(possibles, allScores);
      if (!!output) bestGuess = output[0];
      if (!!output && output.length > 1) {
        fourthPossibles = output;
      } else if (!!output && output.length === 1) {
        return output[0];
      }

      // Perform a few last checks to correct some of winnower's biases
      const schemes = {quatr:false,ababx:false,aabax:false,cpls2:false,aaaax:false};
      fourthPossibles.forEach(scheme => {schemes[scheme[0]] = true});
      if (schemes.quatr) {
        if (schemes.ababx && allScores['onethree'] > THRESHOLD) bestGuess = 'ababx';
        else bestGuess = 'ababx';
        if (schemes.aabax && allScores['onewo'] > THRESHOLD && allScores['onefour'] > THRESHOLD) bestGuess = 'aabax';
        return bestGuess;
      } else if (schemes.cpls2 && schemes.aaaax && allScores['twothree'] > THRESHOLD) {
        bestGuess = 'aaaax';
        return bestGuess
      } else {
        if (fourthPossibles.length > 0) {
          bestGuess = fourthPossibles[0][0];
        } return bestGuess;
      }
    }
    else if (stan.length === 5) {
      const onetwo = new Rhyme(stan[0], stan[1]).getScore();
      const onethree = new Rhyme(stan[0], stan[2]).getScore();
      const onefour = new Rhyme(stan[0], stan[3]).getScore();
      const onefive = new Rhyme(stan[0], stan[4]).getScore();
      const twothree = new Rhyme(stan[1], stan[2]).getScore();
      const twofour = new Rhyme(stan[1], stan[3]).getScore();
      const twofive = new Rhyme(stan[1], stan[4]).getScore();
      const threefour = new Rhyme(stan[2], stan[3]).getScore();
      const threefive = new Rhyme(stan[2], stan[4]).getScore();
      const fourfive = new Rhyme(stan[3], stan[4]).getScore();

      const possibles = [
        {rs:'abccb', pairs:['twofive', 'threefour']},
        {rs:'aabcb', pairs:['onetwo', 'threefive']},
        {rs:'splt1', pairs:['threefive']},
        {rs:'splt3', pairs:['twofive']},
        {rs:'aabab', pairs:['onetwo', 'onefour', 'twofour', 'threefive']},
        {rs:'aabbb', pairs:['onetwo', 'threefour', 'threefive', 'fourfive']},
        {rs:'aabbc', pairs:['onetwo', 'threefour']},
        {rs:'ababa', pairs:['onethree', 'onefive', 'twofour', 'threefive']},
        {rs:'abbaa', pairs:['onefour', 'onefive', 'twothree', 'fourfive']},
        {rs:'ababb', pairs:['onethree', 'twofour', 'twofive', 'fourfive']},
        {rs:'abbab', pairs:['onefour', 'twothree', 'twofive', 'threefive']},
        {rs:'abaab', pairs:['onethree', 'onefour', 'twofive', 'threefour']},
        {rs:'aabba', pairs:['onetwo','onefive','twofive','threefour']},
      ];
      let fourthPossibles = [];

      const allScores = {
        'onetwo':onetwo,
        'onethree':onethree,
        'onefour':onefour,
        'onefive':onefive,
        'twothree':twothree,
        'twofour':twofour,
        'twofive':twofive,
        'threefour':threefour,
        'threefive':threefive,
        'fourfive':fourfive,
      };

      let output = this.winnower(possibles, allScores);
      if (!!output) bestGuess = output[0];
      if (!!output && output.length > 1) {
        fourthPossibles = output;
      } else if (!!output && output.length === 1) {
        return output[0];
      }

      // Perform a few last checks to correct some of winnower's biases
      const schemes = {
        splt1:false,
        aabcb:false,
        aabbb:false,
        ababa:false,
        splt3:false,
        abccb:false,
        abaab:false,
        ababb:false,
        abbab:false,
        aabbc:false,
        aabba:false
      };
      fourthPossibles.forEach(scheme => {schemes[scheme[0]] = true});

      if (schemes.splt1) {
        if (schemes.aabcb && allScores['onetwo'] > THRESHOLD) {
          bestGuess = 'aabcb';
          if (schemes.aabbb && allScores['threefour'] > THRESHOLD && allScores['fourfive'] > THRESHOLD) {
            bestGuess = 'aabbb';
          }
        } else if (bestGuess === 'N/A') bestGuess = 'splt1';
        if (schemes.ababa && ['onethree','onefive','twofour'].every(x => allScores[x] > THRESHOLD)) {
          bestGuess = 'ababa';
        }
      }
      if (schemes.splt3) {
        if (schemes.abccb && allScores['threefour'] > THRESHOLD) {
          bestGuess = 'abccb';
          if (schemes.abaab && ['onethree','onefour'].every(x => allScores[x] > THRESHOLD)) {
            bestGuess = 'abaab';
          }
        } else if (bestGuess === 'N/A') bestGuess = 'splt3';
        if (schemes.ababb && ['onethree','twofour','fourfive'].every(x => allScores[x] > THRESHOLD)) {
          bestGuess = 'ababb';
        }
        if (schemes.abbab && ['onefour','twothree','threefive'].every(x => allScores[x] > THRESHOLD)) {
          bestGuess = 'abbab';
        }
        if (schemes.aabba && ['onetwo','onefive','threefour'].every(x => allScores[x] > THRESHOLD)) {
          bestGuess = 'aabba';
        }
      }
      if (schemes.aabcb) {
        if (allScores['threefive'] > allScores['threefour']) {
          if ((bestGuess === 'N/A' || bestGuess === 'aabbc') && fourthPossibles[0][0] === 'aabcb') {
            bestGuess = 'aabcb';
          }
        } else if (allScores['threefive'] < allScores['threefour']) {
          if (bestGuess === 'N/A' || bestGuess === 'aabcb') bestGuess = 'aabbc';
        }
      }
      if (bestGuess === 'N/A') {
        if (fourthPossibles.length > 0) bestGuess = fourthPossibles[0][0];
      }
      return bestGuess;
    }
  }

  getRhymes() {
    /**
     * returns an object containing the rhymes in the stanza, with each rhyme consisting of a list of the lines, the rhyme words, and the rhymetype
     */

    const rs = this.getRhymeScheme();
    const lines = this.getLines();
    const rhymes = [];

    if (lines.length === 2) {
      if (rs === 'cplt1') {
        const rhyme1 = {}
        rhyme1.lines = lines;
        rhyme1.words = [new Line(lines[0]).getTerm()[0], new Line(lines[1]).getTerm()[0]];
        rhyme1.rt = new Rhyme(lines[0],lines[1]).getRhymeType();
        rhymes.push(rhyme1);
        return rhymes;
      }
    }
    else if (lines.length === 4) {
      if (rs === 'quatr') {
        const rhyme1 = {};
        rhyme1.lines = [lines[1],lines[3]];
        rhyme1.words = [new Line(lines[1]).getTerm()[0], new Line(lines[3]).getTerm()[0]];
        rhyme1.rt = new Rhyme(lines[1], lines[3]).getRhymeType();
        rhymes.push(rhyme1);
        return rhymes;
      } else if (rs === 'ababx') {
        const rhyme1 = {};
        const rhyme2 = {};
        rhyme1.lines = [lines[0],lines[2]];
        rhyme2.lines = [lines[1],lines[3]];
        rhyme1.words = [new Line(lines[0]).getTerm()[0], new Line(lines[2]).getTerm()[0]];
        rhyme2.words = [new Line(lines[1]).getTerm()[0], new Line(lines[3]).getTerm()[0]];
        rhyme1.rt = new Rhyme(lines[0], lines[2]).getRhymeType();
        rhyme2.rt = new Rhyme(lines[1], lines[3]).getRhymeType();
        rhymes.push(rhyme1,rhyme2);
        return rhymes;
      } else if (rs === 'abbax') {
        const rhyme1 = {};
        const rhyme2 = {};
        rhyme1.lines = [lines[0],lines[3]];
        rhyme2.lines = [lines[1],lines[2]];
        rhyme1.words = [new Line(lines[0]).getTerm()[0], new Line(lines[3]).getTerm()[0]];
        rhyme2.words = [new Line(lines[1]).getTerm()[0], new Line(lines[2]).getTerm()[0]];
        rhyme1.rt = new Rhyme(lines[0],lines[3]).getRhymeType();
        rhyme2.rt = new Rhyme(lines[1],lines[2]).getRhymeType();
        rhymes.push(rhyme1,rhyme2);
        return rhymes;
      }
    }
  }
}

export default Stanza;