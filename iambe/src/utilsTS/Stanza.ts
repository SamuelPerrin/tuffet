import Line from './Line';
import Word from './Word';
import Rhyme from './Rhyme';
import { RhymeScheme } from './phonstants';

/**
 * A stanza of verse
 */
export default class Stanza {
  private THRESHOLD: number = 0.3;
  public text: string = "";
  private lines: Line[] = [];

  constructor(text: string) {
    this.text = text;
  }

  /**
   * Returns an order-preserving list of the stanza's lines
   * @returns List of the stanza's lines
   */
  public getLines(): Line[] {
    if (this.lines && this.lines.length) return this.lines;
    this.lines = this.text.split('\n').filter(l => !!l).map(l => new Line(l));

    return this.lines;
  }

  /**
   * Returns true if the score of each pair in the array is greater than the THRESHOLD
   * @param scores Object for determining the fullness of rhymetypes
   * @param arr Array of rhymetypes in the stanza
   */
  private allOver(scores: { [key: string]: number }, arr: string[]) {
    return arr.every(rhyme => scores[rhyme] > this.THRESHOLD);
  }

  /**
   * Returns a guess about the stanza's rhyme scheme
   */
  public getRhymeScheme(): RhymeScheme {
    let bestGuess: RhymeScheme = RhymeScheme.irreg;
    const lines : string[] = this.getLines().map(l => l.text);

    if (lines.length === 2) {
      const onetwo = new Rhyme(lines[0], lines[1]).getScore();
      if (onetwo > this.THRESHOLD) bestGuess = RhymeScheme.cplt1;
      else bestGuess = RhymeScheme.irreg;
      return bestGuess;
    }
    else if (lines.length === 3) {
      const onetwo = new Rhyme(lines[0], lines[1]).getScore();
      const onethree = new Rhyme(lines[0], lines[2]).getScore();
      const twothree = new Rhyme(lines[1], lines[2]).getScore();
      if (onetwo > this.THRESHOLD && onethree > this.THRESHOLD && twothree > this.THRESHOLD) {
        bestGuess = RhymeScheme.aaaxx;
      } else if (onetwo > this.THRESHOLD) bestGuess = RhymeScheme.aabxx;
      else if (onethree > this.THRESHOLD) bestGuess = RhymeScheme.abaxx;
      else if (twothree > this.THRESHOLD) bestGuess = RhymeScheme.abbxx;
      else {
        console.log(`I'm not sure of the rhyme scheme for ${lines}`);
      }
      return bestGuess;
    }
    else if (lines.length === 4) {
      const onetwo = new Rhyme(lines[0], lines[1]).getScore();
      const onethree = new Rhyme(lines[0], lines[2]).getScore();
      const onefour = new Rhyme(lines[0], lines[3]).getScore();
      const twothree = new Rhyme(lines[1], lines[2]).getScore();
      const twofour = new Rhyme(lines[1], lines[3]).getScore();
      const threefour = new Rhyme(lines[2], lines[3]).getScore();

      const possibles : RhymeSchemeData[] = [
        {rs: RhymeScheme.quatr, pairs:['twofour']},
        {rs: RhymeScheme.ababx, pairs:['onethree', 'twofour']},
        {rs: RhymeScheme.abbax, pairs:['onefour', 'twothree']},
        {rs: RhymeScheme.aaaax, pairs:['onetwo', 'onethree', 'onefour', 'twothree', 'twofour', 'threefour']},
        {rs: RhymeScheme.cpls2, pairs:['onetwo', 'threefour']},
        {rs: RhymeScheme.abaax, pairs:['onethree', 'onefour', 'threefour']},
        {rs: RhymeScheme.aabax, pairs:['onetwo', 'onefour', 'twofour']},
      ];
      let fourthPossibles : RhymeScheme[] = [];

      const allScores: { [key: string]: number } = {
        'onetwo': onetwo,
        'onethree': onethree,
        'onefour': onefour,
        'twothree': twothree,
        'twofour': twofour,
        'threefour': threefour,
      };

      let output = this.winnower(possibles, allScores);
      if (output) bestGuess = output[0];
      if (output && output.length > 1) fourthPossibles = output;
      else if (output && output.length === 1) return output[0];
      else if (allScores.twofour > 0) return RhymeScheme.quatr; // for quatrains that otherwise wouldn't be rhymed

      // Perform a few last checks to correct some of winnower's biases
      const schemes : {[key in RhymeScheme.quatr | RhymeScheme.ababx | RhymeScheme.abbax | RhymeScheme.aabax | RhymeScheme.cpls2 | RhymeScheme.aaaax | RhymeScheme.abaax]: boolean} = {
        [RhymeScheme.quatr]: false,
        [RhymeScheme.ababx]: false,
        [RhymeScheme.abbax]: false,
        [RhymeScheme.cpls2]: false,
        [RhymeScheme.aaaax]: false,
        [RhymeScheme.abaax]: false,
        [RhymeScheme.aabax]: false,
      };

      fourthPossibles.forEach(scheme => {
        if (scheme[0] in schemes) {
          // @ts-ignore
          schemes[scheme[0]] = true;
        }
      });

      if (schemes[RhymeScheme.quatr]) {
        if (schemes[RhymeScheme.ababx] && allScores.onethree > this.THRESHOLD) bestGuess = RhymeScheme.ababx;
        else bestGuess = RhymeScheme.quatr;
        if (schemes[RhymeScheme.aabax] && allScores.onetwo > this.THRESHOLD && allScores.onefour > this.THRESHOLD) bestGuess = RhymeScheme.aabax;
        return bestGuess;
      } else if (schemes[RhymeScheme.cpls2] && schemes[RhymeScheme.aaaax] && allScores.twothree > this.THRESHOLD) return RhymeScheme.aaaax;
      else if (fourthPossibles.length > 0) return fourthPossibles[0];
    }
    else if (lines.length === 5) {
      const onetwo = new Rhyme(lines[0], lines[1]).getScore();
      const onethree = new Rhyme(lines[0], lines[1]).getScore();
      const onefour = new Rhyme(lines[0], lines[3]).getScore();
      const onefive = new Rhyme(lines[0], lines[4]).getScore();
      const twothree = new Rhyme(lines[1], lines[2]).getScore();
      const twofour = new Rhyme(lines[1], lines[3]).getScore();
      const twofive = new Rhyme(lines[1], lines[4]).getScore();
      const threefour = new Rhyme(lines[2], lines[3]).getScore();
      const threefive = new Rhyme(lines[2], lines[4]).getScore();
      const fourfive = new Rhyme(lines[3], lines[4]).getScore();

      const possibles = [
        {rs:RhymeScheme.abccb, pairs:['twofive', 'threefour']},
        {rs:RhymeScheme.aabcb, pairs:['onetwo', 'threefive']},
        {rs:RhymeScheme.splt1, pairs:['threefive']},
        {rs:RhymeScheme.splt3, pairs:['twofive']},
        {rs:RhymeScheme.aabab, pairs:['onetwo', 'onefour', 'twofour', 'threefive']},
        {rs:RhymeScheme.aabbb, pairs:['onetwo', 'threefour', 'threefive', 'fourfive']},
        {rs:RhymeScheme.aabbc, pairs:['onetwo', 'threefour']},
        {rs:RhymeScheme.ababa, pairs:['onethree', 'onefive', 'twofour', 'threefive']},
        {rs:RhymeScheme.abbaa, pairs:['onefour', 'onefive', 'twothree', 'fourfive']},
        {rs:RhymeScheme.ababb, pairs:['onethree', 'twofour', 'twofive', 'fourfive']},
        {rs:RhymeScheme.abbab, pairs:['onefour', 'twothree', 'twofive', 'threefive']},
        {rs:RhymeScheme.abaab, pairs:['onethree', 'onefour', 'twofive', 'threefour']},
        {rs:RhymeScheme.aabba, pairs:['onetwo','onefive','twofive','threefour']},
        {rs:RhymeScheme.aaabb, pairs:['onetwo','onethree','twothree','fourfive']},
      ];
      let fourthPossibles : RhymeScheme[] = [];

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
      if (output && output.length && output[0] != RhymeScheme.irreg) bestGuess = output[0];
      if (output && output.length > 1 && output[0] != RhymeScheme.irreg) {
        fourthPossibles = output;
        bestGuess = output[0]; // I added this to fix a weird bug; it's not in the corresponding part of this method for other stanza-lengths
      } else if (output && output.length === 1) return output[0];

      // Perform a few last checks to correct some of winnower's biases
      const schemes: {[key in RhymeScheme]?: boolean} = {
        [RhymeScheme.splt1]: false,
        [RhymeScheme.aabcb]: false,
        [RhymeScheme.aabbb]: false,
        [RhymeScheme.ababa]: false,
        [RhymeScheme.splt3]: false,
        [RhymeScheme.abccb]: false,
        [RhymeScheme.abaab]: false,
        [RhymeScheme.ababb]: false,
        [RhymeScheme.abbab]: false,
        [RhymeScheme.aabbc]: false,
        [RhymeScheme.aabba]: false,
        [RhymeScheme.aaabb]: false
      };

      fourthPossibles.forEach(scheme => {
        // @ts-ignore
        schemes[scheme[0]] = true;
      });

      if (schemes[RhymeScheme.splt1]) {
        if (schemes[RhymeScheme.aabcb] && allScores.onetwo > this.THRESHOLD) {
          bestGuess = RhymeScheme.aabcb;
          if (schemes[RhymeScheme.aabbb] && allScores.threefour > this.THRESHOLD && allScores.fourfive > this.THRESHOLD) {
            bestGuess = RhymeScheme.aabbb;
          }
        } else if (bestGuess === RhymeScheme.irreg) bestGuess = RhymeScheme.splt1;
        if (schemes[RhymeScheme.ababa] && this.allOver(allScores, ['onethree', 'onefive', 'twofour'])) bestGuess = RhymeScheme.ababa;
      }
      if (schemes[RhymeScheme.splt3]) {
        if (schemes[RhymeScheme.abccb] && allScores.threefour > this.THRESHOLD) {
          bestGuess = RhymeScheme.abccb;
          if (schemes[RhymeScheme.abaab] && this.allOver(allScores, ['onethree', 'onefour'])) bestGuess = RhymeScheme.abaab;
        } else if (bestGuess === RhymeScheme.irreg) bestGuess = RhymeScheme.splt3;
        if (schemes[RhymeScheme.ababb] && this.allOver(allScores, ['onethree', 'twofour', 'fourfive'])) bestGuess = RhymeScheme.ababb;
        if (schemes[RhymeScheme.abbab] && this.allOver(allScores, ['onefour', 'twothree', 'threefive'])) bestGuess = RhymeScheme.abbab;
        if (schemes[RhymeScheme.aabba] && this.allOver(allScores, ['onetwo', 'onefive', 'threefour'])) bestGuess = RhymeScheme.aabba;
      }
      if (schemes[RhymeScheme.aabcb]) {
        if (allScores.threefive > allScores.threefour) {
          if ((bestGuess === RhymeScheme.irreg || bestGuess === RhymeScheme.aabbc) && fourthPossibles[0] === RhymeScheme.aabcb) bestGuess = RhymeScheme.aabcb;
        } else if (allScores.threefive < allScores.threefour) {
          if (bestGuess === RhymeScheme.irreg || bestGuess === RhymeScheme.aabcb) bestGuess = RhymeScheme.aabbc;
        }
      } if (bestGuess === RhymeScheme.irreg && fourthPossibles.length > 0) bestGuess = fourthPossibles[0];
      
      return bestGuess;
    }

    
    return RhymeScheme.quatr;
  }

  /**
   * 
   * @param rhymeSchemes list of possible rhyme scheme objects
   * @param rhymes object of rhyme scores from getRhymeScheme
   * @param recurring flag for calls of winnower made by winnower itself
   * @returns 
   */
  private winnower(rhymeSchemes: RhymeSchemeData[], rhymes: { [key: string]: number }, recurring : boolean = false): RhymeScheme[] {
    let bestGuess = RhymeScheme.irreg;
    // Weed out line pairs that don't rhyme in any discernible way, leaving a list of rhyming pairs where each element is a list [key, rhymes[key]]
    const nonzeroes = Object.entries(rhymes).filter(rhyme => rhyme[1] > 0);
    if (nonzeroes.length === 0) return [bestGuess];
    
    // sort rhyme scores in ascending order
    nonzeroes.sort((a,b) => a[1] - b[1]);

    // a list of all the line pairs with full rhyme
    const ones = nonzeroes.filter(rhyme => rhyme[1] === 1);

    // Check if the fullest rhyme in nonzeroes is also in each rhyme scheme in rhymeSchemes, adding them to a list called secondPossibles
    // The only rhyme schemes that can go on are those that can account for the fullest rhyme(s) in the stanza
    const secondPossibles = rhymeSchemes.filter(scheme => {
      if (ones.length > 0) {
        return ones.every(pair => scheme.pairs.includes(pair[0]));
      } else {
        return scheme.pairs.includes(nonzeroes[nonzeroes.length - 1][0]);
      }
    });

    // If there aren't any stanzas that account for all the full rhymes, reset 1s to 0.9 and try again
    if (!secondPossibles.length) {
      const noOnes = Object.fromEntries(Object.entries(rhymes).map(k => k[1] === 1 ? [k[0], 0.9] : [k[0], k[1]]));
      if (!recurring) return this.winnower(rhymeSchemes, noOnes, true);
    }
    else {
      // Count how many non-rhymes the remaining options would produce
      if (secondPossibles.length === 1) {
        let zeroes = 0;
        secondPossibles[0].pairs.forEach(p => zeroes += rhymes[p] === 0 ? 1 : 0);
        if (zeroes < 2) return [secondPossibles[0].rs];
        return [bestGuess];
      }
      
      // Check if the rhymes in each rhyme scheme in secondPossibles are also in nonzeroes. Only stanzas that don't result in any non-rhymes will be allowed into thirdPossibles
      const thirdPossibles = secondPossibles.filter(scheme => scheme.pairs.every(pair => nonzeroes.map(rs => rs[0]).includes(pair)));

      if (!thirdPossibles.length && !recurring) {
        // Run again with nonzeroes instead of rhymes
        const newScores : { [key: string]: number } = {};
        nonzeroes.forEach(i => newScores[i[0]] = i[1]);
        return this.winnower(rhymeSchemes, newScores, true);
      }

      if (thirdPossibles.length === 1) {
        return [thirdPossibles[0].rs];
      }

      // Average the scores of the rhymes of each remaining rhyme scheme, returning the one with the highest average
      // In other words, only the rhyme scheme that best accounts for the stanza's rhymes will be allowed through
      const fourthPossibles : {rs: RhymeScheme; score: number}[] = thirdPossibles.map(rsData => ({
        rs: rsData.rs,
        score: (rsData.pairs.reduce((a,b) => a + rhymes[b], 0)) / rsData.pairs.length,
      }));

      return fourthPossibles.sort((a,b) => b.score - a.score).map(obj => obj.rs);
    }

    throw Error("Couldn't find a good rhyme scheme for this stanza");
  }

  /**
   * Returns a list of Rhymes in the stanza
   */
  public getRhymes(): Rhyme[] {
    const rhymeScheme = this.getRhymeScheme();
    const lines: Line[] = this.getLines();
    const rhymes : Rhyme[] = [];

    return [];
  }
}

interface RhymeSchemeData {
  rs: RhymeScheme;
  pairs: string[]
}