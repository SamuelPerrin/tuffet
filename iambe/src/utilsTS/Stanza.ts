import Line from './Line';
import Rhyme, { RhymeInfo } from './Rhyme';
import { RhymeScheme } from './phonstants';

/**
 * A stanza of verse
 */
export default class Stanza {
  private THRESHOLD: number = 0.3;
  public text: string = "";
  private lines: Line[] = [];
  private rhymes: RhymeInfo[] = [];

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
   * Returns true if the score of each pair in the array is greater than the `THRESHOLD`
   * @param scores Object for determining the fullness of rhyme types
   * @param arr Array of rhyme types in the stanza
   */
  private allOver(scores: { [key: string]: number }, arr: string[]) {
    return arr.every(rhyme => scores[rhyme] > this.THRESHOLD);
  }

  /**
   * Returns a guess about the stanza's rhyme scheme
   */
  public getRhymeScheme(): RhymeScheme {
    let bestGuess: RhymeScheme = RhymeScheme.irreg;
    const lines: string[] = this.getLines().map(l => l.text);

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

      const possibles: RhymeSchemeData[] = [
        { rs: RhymeScheme.quatr, pairs: ['twofour'] },
        { rs: RhymeScheme.ababx, pairs: ['onethree', 'twofour'] },
        { rs: RhymeScheme.abbax, pairs: ['onefour', 'twothree'] },
        { rs: RhymeScheme.aaaax, pairs: ['onetwo', 'onethree', 'onefour', 'twothree', 'twofour', 'threefour'] },
        { rs: RhymeScheme.cpls2, pairs: ['onetwo', 'threefour'] },
        { rs: RhymeScheme.abaax, pairs: ['onethree', 'onefour', 'threefour'] },
        { rs: RhymeScheme.aabax, pairs: ['onetwo', 'onefour', 'twofour'] },
      ];
      let fourthPossibles: RhymeScheme[] = [];

      const allScores: ScoreForLinePair = {
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
      const schemes: { [key in RhymeScheme.quatr | RhymeScheme.ababx | RhymeScheme.abbax | RhymeScheme.aabax | RhymeScheme.cpls2 | RhymeScheme.aaaax | RhymeScheme.abaax]: boolean } = {
        [RhymeScheme.quatr]: false,
        [RhymeScheme.ababx]: false,
        [RhymeScheme.abbax]: false,
        [RhymeScheme.cpls2]: false,
        [RhymeScheme.aaaax]: false,
        [RhymeScheme.abaax]: false,
        [RhymeScheme.aabax]: false,
      };

      fourthPossibles.forEach(scheme => {
        if (scheme in schemes) {
          // @ts-ignore
          schemes[scheme] = true;
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
        { rs: RhymeScheme.abccb, pairs: ['twofive', 'threefour'] },
        { rs: RhymeScheme.aabcb, pairs: ['onetwo', 'threefive'] },
        { rs: RhymeScheme.splt1, pairs: ['threefive'] },
        { rs: RhymeScheme.splt3, pairs: ['twofive'] },
        { rs: RhymeScheme.aabab, pairs: ['onetwo', 'onefour', 'twofour', 'threefive'] },
        { rs: RhymeScheme.aabbb, pairs: ['onetwo', 'threefour', 'threefive', 'fourfive'] },
        { rs: RhymeScheme.aabbc, pairs: ['onetwo', 'threefour'] },
        { rs: RhymeScheme.ababa, pairs: ['onethree', 'onefive', 'twofour', 'threefive'] },
        { rs: RhymeScheme.abbaa, pairs: ['onefour', 'onefive', 'twothree', 'fourfive'] },
        { rs: RhymeScheme.ababb, pairs: ['onethree', 'twofour', 'twofive', 'fourfive'] },
        { rs: RhymeScheme.abbab, pairs: ['onefour', 'twothree', 'twofive', 'threefive'] },
        { rs: RhymeScheme.abaab, pairs: ['onethree', 'onefour', 'twofive', 'threefour'] },
        { rs: RhymeScheme.aabba, pairs: ['onetwo', 'onefive', 'twofive', 'threefour'] },
        { rs: RhymeScheme.aaabb, pairs: ['onetwo', 'onethree', 'twothree', 'fourfive'] },
      ];
      let fourthPossibles: RhymeScheme[] = [];

      const allScores: ScoreForLinePair = {
        'onetwo': onetwo,
        'onethree': onethree,
        'onefour': onefour,
        'onefive': onefive,
        'twothree': twothree,
        'twofour': twofour,
        'twofive': twofive,
        'threefour': threefour,
        'threefive': threefive,
        'fourfive': fourfive,
      };

      let output = this.winnower(possibles, allScores);
      if (output && output.length && output[0] != RhymeScheme.irreg) bestGuess = output[0];
      if (output && output.length > 1 && output[0] != RhymeScheme.irreg) {
        fourthPossibles = output;
        bestGuess = output[0]; // I added this to fix a weird bug; it's not in the corresponding part of this method for other stanza-lengths
      } else if (output && output.length === 1) return output[0];

      // Perform a few last checks to correct some of winnower's biases
      const schemes: { [key in RhymeScheme]?: boolean } = {
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
        schemes[scheme] = true;
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
    else if (lines.length === 6) {
      const onetwo = new Rhyme(lines[0], lines[1]).getScore();
      const onethree = new Rhyme(lines[0], lines[2]).getScore();
      const onefour = new Rhyme(lines[0], lines[3]).getScore();
      const onefive = new Rhyme(lines[0], lines[4]).getScore();
      const onesix = new Rhyme(lines[0], lines[5]).getScore();
      const twothree = new Rhyme(lines[1], lines[2]).getScore();
      const twofour = new Rhyme(lines[1], lines[3]).getScore();
      const twofive = new Rhyme(lines[1], lines[4]).getScore();
      const twosix = new Rhyme(lines[1], lines[5]).getScore();
      const threefour = new Rhyme(lines[2], lines[3]).getScore();
      const threefive = new Rhyme(lines[2], lines[4]).getScore();
      const threesix = new Rhyme(lines[2], lines[5]).getScore();
      const fourfive = new Rhyme(lines[3], lines[4]).getScore();
      const foursix = new Rhyme(lines[3], lines[5]).getScore();
      const fivesix = new Rhyme(lines[4], lines[5]).getScore();

      const possibles = [
        { rs: RhymeScheme.compm, pairs: ['onetwo', 'threesix', 'fourfive'] },
        { rs: RhymeScheme.bcbdb, pairs: ['twofour', 'twosix', 'foursix'] },
        { rs: RhymeScheme.babab, pairs: ['onethree', 'onefive', 'twofour', 'twosix', 'threefive', 'foursix'] },
        { rs: RhymeScheme.spl13, pairs: ['threesix'] },
        { rs: RhymeScheme.spl12, pairs: ['foursix'] },
        { rs: RhymeScheme.cpls3, pairs: ['onetwo', 'threefour', 'fivesix'] },
        { rs: RhymeScheme.babcc, pairs: ['onethree', 'twofour', 'fivesix'] },
        { rs: RhymeScheme.bacbc, pairs: ['onethree', 'twofive', 'foursix'] },
        { rs: RhymeScheme.baccc, pairs: ['onethree', 'fourfive', 'foursix', 'fivesix'] },
        { rs: RhymeScheme.baccb, pairs: ['onethree', 'twosix', 'fourfive'] },
        { rs: RhymeScheme.bcabc, pairs: ['onefour', 'twofive', 'threesix'] },
        { rs: RhymeScheme.bccab, pairs: ['onefive', 'twosix', 'threefour'] },
        { rs: RhymeScheme.a2b3a, pairs: ['onetwo', 'onesix', 'twosix', 'threefour', 'threefive', 'fourfive'] },
        { rs: RhymeScheme.bbaab, pairs: ['onefour', 'onefive', 'twothree', 'twosix', 'threesix', 'fourfive'] },
      ];

      const allScores: ScoreForLinePair = {
        'onetwo': onetwo,
        'onethree': onethree,
        'onefour': onefour,
        'onefive': onefive,
        'onesix': onesix,
        'twothree': twothree,
        'twofour': twofour,
        'twofive': twofive,
        'twosix': twosix,
        'threefour': threefour,
        'threefive': threefive,
        'threesix': threesix,
        'fourfive': fourfive,
        'foursix': foursix,
        'fivesix': fivesix
      };

      let fourthPossibles: RhymeScheme[] = [];
      let output = this.winnower(possibles, allScores);

      if (output) bestGuess = output[0];
      if (output && output.length > 1) {
        fourthPossibles = output;
        bestGuess = output[0]; // it seems like this is necessary (taken from stanza of length 5)
      } else if (!!output && output.length === 1) {
        return output[0];
      }

      // Perform a few last checks to correct some of winnower's biases
      const schemes: { [key in RhymeScheme]?: boolean } = {
        [RhymeScheme.spl13]: false,
        [RhymeScheme.compm]: false,
        [RhymeScheme.bcabc]: false,
        [RhymeScheme.spl12]: false,
        [RhymeScheme.bacbc]: false,
        [RhymeScheme.bcbdb]: false,
        [RhymeScheme.babab]: false,
        [RhymeScheme.baccc]: false,
      };

      fourthPossibles.forEach(scheme => {
        // @ts-ignore
        schemes[scheme] = true;
      });

      if (schemes[RhymeScheme.spl13]) {
        if (schemes[RhymeScheme.compm] && this.allOver(allScores, ['onetwo', 'fourfive'])) bestGuess = RhymeScheme.compm
        else bestGuess = RhymeScheme.spl13;
      }
      if (schemes[RhymeScheme.spl12]) {
        if (schemes[RhymeScheme.bcbdb] && this.allOver(allScores, ['twofour', 'twosix'])) {
          bestGuess = RhymeScheme.bcbdb;
          if (schemes[RhymeScheme.babab] && this.allOver(allScores, ['onethree', 'onefive', 'threefive'])) bestGuess = RhymeScheme.babab;
        } else bestGuess = RhymeScheme.spl12;
        if (schemes[RhymeScheme.bacbc] && this.allOver(allScores, ['onethree', 'twofive'])) bestGuess = RhymeScheme.bacbc;
        if (schemes[RhymeScheme.baccc] && this.allOver(allScores, ['onethree', 'onefive', 'threefive'])) bestGuess = RhymeScheme.baccc;
      }
      if (bestGuess === RhymeScheme.irreg && schemes[RhymeScheme.bcbdb] && schemes[RhymeScheme.babab]) {
        if (this.allOver(allScores, ['onethree', 'onefive', 'threefive'])) bestGuess = RhymeScheme.babab;
        else bestGuess = RhymeScheme.bcbdb;
      }
      if (bestGuess === RhymeScheme.irreg && fourthPossibles.length > 0) bestGuess = fourthPossibles[0];

      return bestGuess;

    }
    else if (lines.length === 7) {
      const onethree = new Rhyme(lines[0], lines[2]).getScore();
      const onefour = new Rhyme(lines[0], lines[3]).getScore();
      const onefive = new Rhyme(lines[0], lines[4]).getScore();
      const twofour = new Rhyme(lines[1], lines[3]).getScore();
      const twofive = new Rhyme(lines[1], lines[4]).getScore();
      const twosix = new Rhyme(lines[1], lines[5]).getScore();
      const twoseven = new Rhyme(lines[1], lines[6]).getScore();
      const threefive = new Rhyme(lines[2], lines[4]).getScore();
      const fourfive = new Rhyme(lines[3], lines[4]).getScore();
      const fivesix = new Rhyme(lines[4], lines[5]).getScore();
      const fiveseven = new Rhyme(lines[4], lines[6]).getScore();
      const sixseven = new Rhyme(lines[5], lines[6]).getScore();

      const possibles = [
        { rs: RhymeScheme.babc3, pairs: ['onethree', 'twofour', 'fivesix', 'fiveseven', 'sixseven'] },
        { rs: RhymeScheme.cacbb, pairs: ['onefour', 'twosix', 'twoseven', 'threefive', 'sixseven'] },
        { rs: RhymeScheme.srima, pairs: ['onethree', 'onefive', 'twofour', 'threefive', 'sixseven'] },
        { rs: RhymeScheme.royal, pairs: ['onethree', 'twofour', 'twofive', 'fourfive', 'sixseven'] },
      ];

      const allScores: ScoreForLinePair = {
        'onethree': onethree,
        'onefour': onefour,
        'onefive': onefive,
        'twofour': twofour,
        'twofive': twofive,
        'twosix': twosix,
        'twoseven': twoseven,
        'threefive': threefive,
        'fourfive': fourfive,
        'fivesix': fivesix,
        'fiveseven': fiveseven,
        'sixseven': sixseven,
      };

      let fourthPossibles: RhymeScheme[] = [];
      let output = this.winnower(possibles, allScores);
      if (output) bestGuess = output[0];
      if (output && output.length > 1) {
        fourthPossibles = output;
        bestGuess = fourthPossibles[0];
      } else if (output && output.length === 1) {
        return output[0];
      }

      return bestGuess;
    }
    else if (lines.length === 8) {
      const onetwo = new Rhyme(lines[0], lines[1]).getScore();
      const onethree = new Rhyme(lines[0], lines[2]).getScore();
      const onefour = new Rhyme(lines[0], lines[3]).getScore();
      const onefive = new Rhyme(lines[0], lines[4]).getScore();
      const oneeight = new Rhyme(lines[0], lines[7]).getScore();
      const twothree = new Rhyme(lines[1], lines[2]).getScore();
      const twofour = new Rhyme(lines[1], lines[3]).getScore();
      const twosix = new Rhyme(lines[1], lines[5]).getScore();
      const twoseven = new Rhyme(lines[1], lines[6]).getScore();
      const threefour = new Rhyme(lines[2], lines[3]).getScore();
      const threefive = new Rhyme(lines[2], lines[4]).getScore();
      const threesix = new Rhyme(lines[2], lines[5]).getScore();
      const threeseven = new Rhyme(lines[2], lines[6]).getScore();
      const fourfive = new Rhyme(lines[3], lines[4]).getScore();
      const foursix = new Rhyme(lines[3], lines[5]).getScore();
      const foureight = new Rhyme(lines[3], lines[7]).getScore();
      const fivesix = new Rhyme(lines[4], lines[5]).getScore();
      const fiveseven = new Rhyme(lines[4], lines[6]).getScore();
      const fiveeight = new Rhyme(lines[4], lines[7]).getScore();
      const sixseven = new Rhyme(lines[5], lines[6]).getScore();
      const sixeight = new Rhyme(lines[5], lines[7]).getScore();
      const seveneight = new Rhyme(lines[6], lines[7]).getScore();

      const possibles = [
        { rs: RhymeScheme.oct24, pairs: ['twosix', 'foureight'] },
        { rs: RhymeScheme.oct48, pairs: ['foureight'] },
        { rs: RhymeScheme.oc458, pairs: ['fourfive', 'foureight', 'fiveeight'] },
        { rs: RhymeScheme.oc148, pairs: ['onetwo', 'foureight', 'fivesix'] },
        { rs: RhymeScheme.ocaaa, pairs: ['onetwo', 'onethree', 'twothree', 'foureight', 'fivesix', 'fiveseven', 'sixseven'] },
        { rs: RhymeScheme.djuan, pairs: ['onethree', 'onefive', 'twofour', 'twosix', 'threefive', 'foursix', 'seveneight'] },
        { rs: RhymeScheme.quat2, pairs: ['twofour', 'sixeight'] },
        { rs: RhymeScheme.cpls4, pairs: ['onetwo', 'threefour', 'fivesix', 'seveneight'] },
        { rs: RhymeScheme.petra, pairs: ['onefour', 'onefive', 'oneeight', 'twothree', 'twosix', 'twoseven', 'threesix', 'threeseven', 'fourfive', 'foureight', 'fiveeight', 'sixseven'] },
        { rs: RhymeScheme.abab2, pairs: ['onethree', 'twofour', 'fiveseven', 'sixeight'] },
      ];

      const allScores: ScoreForLinePair = {
        'onetwo': onetwo,
        'onethree': onethree,
        'onefour': onefour,
        'onefive': onefive,
        'oneeight': oneeight,
        'twothree': twothree,
        'twofour': twofour,
        'twosix': twosix,
        'twoseven': twoseven,
        'threefour': threefour,
        'threefive': threefive,
        'threesix': threesix,
        'threeseven': threeseven,
        'fourfive': fourfive,
        'foursix': foursix,
        'foureight': foureight,
        'fivesix': fivesix,
        'fiveseven': fiveseven,
        'fiveeight': fiveeight,
        'sixseven': sixseven,
        'sixeight': sixeight,
        'seveneight': seveneight,
      };

      let fourthPossibles: RhymeScheme[] = [];
      let output = this.winnower(possibles, allScores);
      if (output) bestGuess = output[0];
      if (output && output.length > 1) fourthPossibles = output;
      else if (output && output.length === 1) {
        return output[0];
      }

      // Perform a few last checks to correct some of winnower's biases
      const schemes: { [key in RhymeScheme]?: boolean } = {
        [RhymeScheme.oct48]: false,
        [RhymeScheme.oct24]: false,
        [RhymeScheme.oc458]: false,
        [RhymeScheme.oc148]: false,
        [RhymeScheme.ocaaa]: false,
        [RhymeScheme.quat2]: false,
        [RhymeScheme.cpls4]: false,
        [RhymeScheme.petra]: false,
        [RhymeScheme.abab2]: false
      };
      fourthPossibles.forEach(scheme => {
        //@ts-ignore
        schemes[scheme] = true
      });

      if (schemes[RhymeScheme.oct48]) {
        if (schemes[RhymeScheme.oc148] && this.allOver(allScores, ['onetwo', 'fivesix'])) {
          bestGuess = RhymeScheme.oc148;
          if (schemes[RhymeScheme.ocaaa] && this.allOver(allScores, ['onethree', 'twothree', 'fiveseven', 'sixseven'])) {
            bestGuess = RhymeScheme.ocaaa;
          }
        }
        else bestGuess = RhymeScheme.oct48;
        if (schemes[RhymeScheme.oct24] && allScores, twosix > this.THRESHOLD) bestGuess = RhymeScheme.oct24;
        if (schemes[RhymeScheme.oc458] && this.allOver(allScores, ['fourfive', 'fiveeight'])) {
          bestGuess = RhymeScheme.oc458;
        }
      }
      if (schemes[RhymeScheme.quat2]) {
        if (schemes[RhymeScheme.abab2] && this.allOver(allScores, ['onethree', 'fiveseven'])) {
          bestGuess = RhymeScheme.abab2;
        }
      }
      if (bestGuess === RhymeScheme.irreg) {
        if (fourthPossibles.length > 0) bestGuess = fourthPossibles[0];
      }

      return bestGuess;
    }
    else if (lines.length === 9) {
      const onetwo = new Rhyme(lines[0], lines[1]).getScore();
      const onethree = new Rhyme(lines[0], lines[2]).getScore();
      const onefour = new Rhyme(lines[0], lines[3]).getScore();
      const twothree = new Rhyme(lines[1], lines[2]).getScore();
      const twofour = new Rhyme(lines[1], lines[3]).getScore();
      const twofive = new Rhyme(lines[1], lines[4]).getScore();
      const twoseven = new Rhyme(lines[1], lines[6]).getScore();
      const threefour = new Rhyme(lines[2], lines[3]).getScore();
      const threesix = new Rhyme(lines[2], lines[5]).getScore();
      const threeseven = new Rhyme(lines[2], lines[6]).getScore();
      const threeeight = new Rhyme(lines[2], lines[7]).getScore();
      const threenine = new Rhyme(lines[2], lines[8]).getScore();
      const fourfive = new Rhyme(lines[3], lines[4]).getScore();
      const foursix = new Rhyme(lines[3], lines[5]).getScore();
      const fourseven = new Rhyme(lines[3], lines[6]).getScore();
      const fivesix = new Rhyme(lines[4], lines[5]).getScore();
      const fiveseven = new Rhyme(lines[4], lines[6]).getScore();
      const fivenine = new Rhyme(lines[4], lines[8]).getScore();
      const sixseven = new Rhyme(lines[5], lines[6]).getScore();
      const sixeight = new Rhyme(lines[5], lines[7]).getScore();
      const sixnine = new Rhyme(lines[5], lines[8]).getScore();
      const seveneight = new Rhyme(lines[6], lines[7]).getScore();
      const sevennine = new Rhyme(lines[6], lines[8]).getScore();
      const eightnine = new Rhyme(lines[7], lines[8]).getScore();

      const possibles = [
        { rs: RhymeScheme.cpmp3, pairs: ['onetwo', 'threesix', 'threenine', 'fourfive', 'sixnine', 'seveneight'] },
        { rs: RhymeScheme.raven, pairs: ['onetwo', 'threeseven', 'threeeight', 'threenine', 'fourfive', 'foursix', 'fivesix', 'seveneight', 'sevennine', 'eightnine'] },
        { rs: RhymeScheme.shalo, pairs: ['onetwo', 'onethree', 'onefour', 'twothree', 'twofour', 'threefour', 'fivenine', 'sixseven', 'sixeight', 'seveneight'] },
        { rs: RhymeScheme.spens, pairs: ['onethree', 'twofour', 'twofive', 'twoseven', 'fourfive', 'fourseven', 'fiveseven', 'sixeight', 'sixnine', 'eightnine'] },
      ];

      const allScores: ScoreForLinePair = {
        'onetwo': onetwo,
        'onethree': onethree,
        'onefour': onefour,
        'twothree': twothree,
        'twofour': twofour,
        'twofive': twofive,
        'twoseven': twoseven,
        'threefour': threefour,
        'threesix': threesix,
        'threeseven': threeseven,
        'threeeight': threeeight,
        'threenine': threenine,
        'fourfive': fourfive,
        'foursix': foursix,
        'fourseven': fourseven,
        'fivesix': fivesix,
        'fiveseven': fiveseven,
        'fivenine': fivenine,
        'sixseven': sixseven,
        'sixeight': sixeight,
        'sixnine': sixnine,
        'seveneight': seveneight,
        'sevennine': sevennine,
        'eightnine': eightnine,
      };

      let fourthPossibles: RhymeScheme[] = [];
      let output = this.winnower(possibles, allScores);
      if (output) bestGuess = output[0];
      if (output && output.length > 1) {
        fourthPossibles = output;
        bestGuess = fourthPossibles[0];
      } else if (output && output.length === 1) {
        return output[0];
      }

      return bestGuess;
    }
    else if (lines.length === 10) {
      const onetwo = new Rhyme(lines[0], lines[1]).getScore();
      const onethree = new Rhyme(lines[0], lines[2]).getScore();
      const onesix = new Rhyme(lines[0], lines[5]).getScore();
      const twofour = new Rhyme(lines[1], lines[3]).getScore();
      const threefour = new Rhyme(lines[2], lines[3]).getScore();
      const threefive = new Rhyme(lines[2], lines[4]).getScore();
      const fivesix = new Rhyme(lines[4], lines[5]).getScore();
      const fiveeight = new Rhyme(lines[4], lines[7]).getScore();
      const fivenine = new Rhyme(lines[4], lines[8]).getScore();
      const sixeight = new Rhyme(lines[5], lines[7]).getScore();
      const sixnine = new Rhyme(lines[5], lines[8]).getScore();
      const sixten = new Rhyme(lines[5], lines[9]).getScore();
      const seveneight = new Rhyme(lines[6], lines[7]).getScore();
      const sevennine = new Rhyme(lines[6], lines[8]).getScore();
      const seventen = new Rhyme(lines[6], lines[9]).getScore();
      const eightnine = new Rhyme(lines[7], lines[8]).getScore();
      const nineten = new Rhyme(lines[8], lines[9]).getScore();

      const possibles = [
        { rs: RhymeScheme.odeke, pairs: ['onethree', 'twofour', 'fivenine', 'sixeight', 'seventen'] },
        { rs: RhymeScheme.odeng, pairs: ['onethree', 'twofour', 'fiveeight', 'sixnine', 'seventen'] },
        { rs: RhymeScheme.odek2, pairs: ['onethree', 'twofour', 'fiveeight', 'sixten', 'sevennine'] },
        { rs: RhymeScheme.odema, pairs: ['onesix', 'twofour', 'threefive', 'seventen', 'eightnine'] },
        { rs: RhymeScheme.cpls5, pairs: ['onetwo', 'threefour', 'fivesix', 'seveneight', 'nineten'] },
      ];

      const allScores: ScoreForLinePair = {
        'onetwo': onetwo,
        'onethree': onethree,
        'onesix': onesix,
        'twofour': twofour,
        'threefour': threefour,
        'threefive': threefive,
        'fivesix': fivesix,
        'fiveeight': fiveeight,
        'fivenine': fivenine,
        'sixeight': sixeight,
        'sixnine': sixnine,
        'sixten': sixten,
        'seveneight': seveneight,
        'sevennine': sevennine,
        'seventen': seventen,
        'eightnine': eightnine,
        'nineten': nineten,
      };

      let fourthPossibles: RhymeScheme[] = [];
      let output = this.winnower(possibles, allScores);
      if (output) bestGuess = output[0];
      if (output && output.length > 1) {
        fourthPossibles = output;
        bestGuess = fourthPossibles[0];
      } else if (!!output && output.length === 1) {
        return output[0];
      }

      return bestGuess;
    }
    else if (lines.length === 14) {
      const onethree = new Rhyme(lines[0], lines[2]).getScore();
      const onefour = new Rhyme(lines[0], lines[3]).getScore();
      const onefive = new Rhyme(lines[0], lines[4]).getScore();
      const oneeight = new Rhyme(lines[0], lines[7]).getScore();
      const twothree = new Rhyme(lines[1], lines[2]).getScore();
      const twofour = new Rhyme(lines[1], lines[3]).getScore();
      const twofive = new Rhyme(lines[1], lines[4]).getScore();
      const twosix = new Rhyme(lines[1], lines[5]).getScore();
      const twoseven = new Rhyme(lines[1], lines[6]).getScore();
      const twonine = new Rhyme(lines[1], lines[8]).getScore();
      const threefive = new Rhyme(lines[2], lines[4]).getScore();
      const threesix = new Rhyme(lines[2], lines[5]).getScore();
      const threeseven = new Rhyme(lines[2], lines[6]).getScore();
      const threeten = new Rhyme(lines[2], lines[9]).getScore();
      const fourfive = new Rhyme(lines[3], lines[4]).getScore();
      const foureight = new Rhyme(lines[3], lines[7]).getScore();
      const fournine = new Rhyme(lines[3], lines[8]).getScore();
      const fiveseven = new Rhyme(lines[4], lines[6]).getScore();
      const fiveeight = new Rhyme(lines[4], lines[7]).getScore();
      const fivenine = new Rhyme(lines[4], lines[8]).getScore();
      const fiveten = new Rhyme(lines[4], lines[9]).getScore();
      const sixseven = new Rhyme(lines[5], lines[6]).getScore();
      const sixeight = new Rhyme(lines[5], lines[7]).getScore();
      const sixeleven = new Rhyme(lines[5], lines[10]).getScore();
      const seventen = new Rhyme(lines[6], lines[9]).getScore();
      const nineten = new Rhyme(lines[8], lines[9]).getScore();
      const nineeleven = new Rhyme(lines[8], lines[10]).getScore();
      const ninetwelve = new Rhyme(lines[8], lines[11]).getScore();
      const ninethirteen = new Rhyme(lines[8], lines[12]).getScore();
      const ninefourteen = new Rhyme(lines[8], lines[13]).getScore();
      const teneleven = new Rhyme(lines[9], lines[10]).getScore();
      const tentwelve = new Rhyme(lines[9], lines[11]).getScore();
      const tenthirteen = new Rhyme(lines[9], lines[12]).getScore();
      const tenfourteen = new Rhyme(lines[9], lines[13]).getScore();
      const eleventhirteen = new Rhyme(lines[10], lines[12]).getScore();
      const elevenfourteen = new Rhyme(lines[10], lines[13]).getScore();
      const twelvethirteen = new Rhyme(lines[11], lines[12]).getScore();
      const twelvefourteen = new Rhyme(lines[11], lines[13]).getScore();
      const thirteenfourteen = new Rhyme(lines[12], lines[13]).getScore();

      const possibles = [
        { rs: RhymeScheme.sonit, pairs: ['onefour', 'onefive', 'oneeight', 'twothree', 'twosix', 'twoseven', 'threesix', 'threeseven', 'fourfive', 'foureight', 'fiveeight', 'sixseven', 'nineeleven', 'ninethirteen', 'tentwelve', 'tenfourteen', 'eleventhirteen', 'twelvefourteen'] },
        { rs: RhymeScheme.sonsh, pairs: ['onethree', 'twofour', 'fiveseven', 'sixeight', 'nineeleven', 'tentwelve', 'thirteenfourteen'] },
        { rs: RhymeScheme.sonpe, pairs: ['onefour', 'onefive', 'oneeight', 'twothree', 'twosix', 'threefourtwoseven', 'threesix', 'threeseven', 'fourfive', 'foureight', 'fiveeight', 'sixseven', 'ninetwelve', 'tenthirteen', 'elevenfourteen'] },
        { rs: RhymeScheme.stozy, pairs: ['onethree', 'onefive', 'twofour', 'sixeight', 'seventen', 'nineeleven', 'ninethirteen', 'eleventhirteen', 'twelvefourteen'] },
        { rs: RhymeScheme.stoz2, pairs: ['onefour', 'twothree', 'twofive', 'twoseven', 'threefive', 'threeseven', 'fiveseven', 'sixeight', 'nineten', 'ninetwelve', 'tentwelve', 'eleventhirteen', 'elevenfourteen', 'thirteenfourteen'] },
        { rs: RhymeScheme.sonfr, pairs: ['onefour', 'oneeight', 'twofive', 'twonine', 'threeseven', 'threeten', 'foureight', 'fivenine', 'sixeleven', 'seventen', 'eleventhirteen', 'twelvefourteen'] },
        { rs: RhymeScheme.sone1, pairs: ['onethree', 'twofour', 'fiveseven', 'sixeight', 'nineten', 'ninetwelve', 'tentwelve', 'eleventhirteen', 'elevenfourteen', 'thirteenfourteen'] },
        { rs: RhymeScheme.sone2, pairs: ['onethree', 'twofour', 'twonine', 'fournine', 'fiveseven', 'fiveten', 'seventen', 'sixeight', 'eleventhirteen', 'twelvefourteen'] },
        { rs: RhymeScheme.sone3, pairs: ['onethree', 'twofour', 'fiveseven', 'sixeight', 'nineeleven', 'tenfourteen', 'twelvethirteen'] },
        { rs: RhymeScheme.soni1, pairs: ['onefour', 'onefive', 'oneeight', 'twothree', 'twosix', 'twoseven', 'threesix', 'threeseven', 'fourfive', 'foureight', 'fiveeight', 'sixseven', 'ninetwelve', 'ninefourteen', 'teneleven', 'tenthirteen', 'eleventhirteen', 'twelvefourteen'] },
        { rs: RhymeScheme.soni2, pairs: ['onefour', 'onefive', 'oneeight', 'twothree', 'twosix', 'twoseven', 'threesix', 'threeseven', 'fourfive', 'foureight', 'fiveeight', 'sixseven', 'nineeleven', 'ninefourteen', 'tentwelve', 'tenthirteen', 'elevenfourteen', 'twelvethirteen'] },
        { rs: RhymeScheme.soni3, pairs: ['onefour', 'onefive', 'oneeight', 'twothree', 'twosix', 'twoseven', 'threesix', 'threeseven', 'fourfive', 'foureight', 'fiveeight', 'sixseven', 'ninethirteen', 'tentwelve', 'elevenfourteen'] },
        { rs: RhymeScheme.soni4, pairs: ['onefour', 'onefive', 'oneeight', 'twothree', 'twosix', 'twoseven', 'threesix', 'threeseven', 'fourfive', 'foureight', 'fiveeight', 'sixseven', 'nineeleven', 'tenthirteen', 'twelvefourteen'] },
        { rs: RhymeScheme.soni5, pairs: ['onefour', 'onefive', 'oneeight', 'twothree', 'twosix', 'twoseven', 'threesix', 'threeseven', 'fourfive', 'foureight', 'fiveeight', 'sixseven', 'ninefourteen', 'tentwelve', 'eleventhirteen'] },
        { rs: RhymeScheme.soni6, pairs: ['onefour', 'onefive', 'oneeight', 'twothree', 'twosix', 'twoseven', 'threesix', 'threeseven', 'fourfive', 'foureight', 'fiveeight', 'sixseven', 'nineeleven', 'tentwelve', 'thirteenfourteen'] },
      ];

      const allScores: ScoreForLinePair = {
        'onethree': onethree,
        'onefour': onefour,
        'onefive': onefive,
        'oneeight': oneeight,
        'twothree': twothree,
        'twofour': twofour,
        'twofive': twofive,
        'twosix': twosix,
        'twoseven': twoseven,
        'twonine': twonine,
        'threefive': threefive,
        'threesix': threesix,
        'threeseven': threeseven,
        'threeten': threeten,
        'fourfive': fourfive,
        'foureight': foureight,
        'fournine': fournine,
        'fiveseven': fiveseven,
        'fiveeight': fiveeight,
        'fivenine': fivenine,
        'fiveten': fiveten,
        'sixseven': sixseven,
        'sixeight': sixeight,
        'sixeleven': sixeleven,
        'seventen': seventen,
        'nineten': nineten,
        'nineeleven': nineeleven,
        'ninetwelve': ninetwelve,
        'ninethirteen': ninethirteen,
        'ninefourteen': ninefourteen,
        'teneleven': teneleven,
        'tentwelve': tentwelve,
        'tenthirteen': tenthirteen,
        'tenfourteen': tenfourteen,
        'eleventhirteen': eleventhirteen,
        'elevenfourteen': elevenfourteen,
        'twelvethirteen': twelvethirteen,
        'twelvefourteen': twelvefourteen,
        'thirteenfourteen': thirteenfourteen
      };

      let output = this.winnower(possibles, allScores);
      if (output) bestGuess = output[0];
      if (output && output.length > 1) {
        return output[0];
      } else if (output && output.length === 1) {
        return output[0];
      }

      return bestGuess;
    }
    else if (lines.length === 16) {
      const onetwo = new Rhyme(lines[0], lines[1]).getScore();
      const threefour = new Rhyme(lines[2], lines[3]).getScore();
      const fivesix = new Rhyme(lines[4], lines[5]).getScore();
      const seveneight = new Rhyme(lines[6], lines[7]).getScore();
      const nineten = new Rhyme(lines[8], lines[9]).getScore();
      const eleventwelve = new Rhyme(lines[10], lines[11]).getScore();
      const thirteenfourteen = new Rhyme(lines[12], lines[13]).getScore();
      const fifteensixteen = new Rhyme(lines[14], lines[15]).getScore();

      const scores = [onetwo, threefour, fivesix, seveneight, nineten, eleventwelve, thirteenfourteen, fifteensixteen];
      const allIn = scores.filter(score => score > this.THRESHOLD);
      if (allIn.length >= 5) bestGuess = RhymeScheme.cpls8;
    }

    return bestGuess;
  }

  /**
   * 
   * @param rhymeSchemes list of possible rhyme scheme objects
   * @param rhymes object of rhyme scores for each relevant pair of lines in the stanza from `getRhymeScheme`
   * @param recurring flag for calls of `winnower` made by `winnower` itself
   * @returns 
   */
  public winnower(rhymeSchemes: RhymeSchemeData[], rhymes: ScoreForLinePair, recurring: boolean = false): RhymeScheme[] {
    let bestGuess = RhymeScheme.irreg;
    // Weed out line pairs that don't rhyme in any discernible way, leaving a list of rhyming pairs where each element is a list [key, rhymes[key]]
    const nonzeroes = Object.entries(rhymes).filter(rhyme => rhyme[1] > 0);
    if (nonzeroes.length === 0) return [bestGuess];

    // sort rhyme scores in ascending order
    nonzeroes.sort((a, b) => a[1] - b[1]);

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
        const newScores: { [key: string]: number } = {};
        nonzeroes.forEach(i => newScores[i[0]] = i[1]);
        return this.winnower(rhymeSchemes, newScores, true);
      }

      if (thirdPossibles.length === 1) {
        return [thirdPossibles[0].rs];
      }

      // The final ordering of remaining possible rhyme schemes involves two ideas: number of rhymes and average rhyme fullness.
      // First, we sort the rhyme schemes to favor those with the greatest rhyme density (this will act as a tie-breaker)
      // Then, we sort the rhyme schemes to favor those with the highest average fullness of all rhymes.
      // This way, we favor those rhyme schemes that best account for the stanza's rhymes, while rewarding those with more rhymes.
      const fourthPossibles: { rs: RhymeScheme; score: number }[] = thirdPossibles.map(rsData => ({
        rs: rsData.rs,
        score: (rsData.pairs.reduce((a, b) => a + rhymes[b], 0)) / rsData.pairs.length,
      }));

      // Sort the possible rhyme schemes by the number of rhymes in the stanza
      // This is the ordering that will serve as a tie-breaker in the final sorting
      const rhymeSchemesByPairLength = rhymeSchemes.sort((a,b) => b.pairs.length - a.pairs.length).map(rs => rs.rs);

      return fourthPossibles
        .sort((a,b) => rhymeSchemesByPairLength.indexOf(a.rs) - rhymeSchemesByPairLength.indexOf(b.rs))
        .sort((a, b) => b.score - a.score)
        .map(obj => obj.rs);
    }

    throw Error("Couldn't find a good rhyme scheme for this stanza");
  }

  /**
   * 
   * @param firstLineIndex the index of the line in the stanza to use as line 1
   * @param secondLineIndex the index of the line in the stanza to use as line 2
   * @returns rhyme data about the rhyme between these two lines
   */
  private makeRhymes(firstLineIndex: number, secondLineIndex: number): RhymeInfo {
    const lines: Line[] = this.getLines();
    const rhymes = new Rhyme(lines[firstLineIndex], lines[secondLineIndex]).getRhymeInfo();
    return rhymes;
  }

  /**
   * Returns a list of Rhymes in the stanza
   */
  public getRhymes(): RhymeInfo[] {
    if (this.rhymes && this.rhymes.length) return this.rhymes;

    const rhymeScheme = this.getRhymeScheme();
    const lines: Line[] = this.getLines();

    this.rhymes = this.getLineNumbersForRhymeScheme(rhymeScheme)
      .map(lineNumbers => this.makeRhymes(lineNumbers[0], lineNumbers[1]));

    return this.rhymes;
  }

  private getLineNumbersForRhymeScheme(rs: RhymeScheme): number[][] {
    switch (rs) {
      case RhymeScheme.cplt1: // AA
        return [[0, 1]];
      case RhymeScheme.aaaxx:
        return [[0, 1], [1, 2]];
      case RhymeScheme.aabxx:
        return [[0, 1]];
      case RhymeScheme.abaxx:
        return [[0, 2]];
      case RhymeScheme.abbxx:
        return [[1, 2]];
      case RhymeScheme.quatr: // ABCB
        return [[1, 3]];
      case RhymeScheme.ababx:
        return [[0, 2], [1, 3]];
      case RhymeScheme.abbax:
        return [[0, 3], [1, 2]];
      case RhymeScheme.aaaax:
        return [[0, 1], [1, 2], [2, 3]];
      case RhymeScheme.cpls2: // AABB
        return [[0, 1], [2, 3]];
      case RhymeScheme.abaax:
        return [[0, 2], [2, 3]];
      case RhymeScheme.aabax:
        return [[0, 1], [1, 3]];
      case RhymeScheme.abccb:
        return [[1, 4], [2, 3]];
      case RhymeScheme.aabcb:
        return [[0, 1], [2, 4]];
      case RhymeScheme.splt1: // ABCDC
        return [[2, 4]];
      case RhymeScheme.splt3: // ABCDB
        return [[1, 4]];
      case RhymeScheme.aabab:
        return [[0, 1], [1, 3], [2, 4]];
      case RhymeScheme.aabbb:
        return [[0, 1], [2, 3], [3, 4]];
      case RhymeScheme.aabbc:
        return [[0, 1], [2, 3]];
      case RhymeScheme.ababa:
        return [[0, 2], [1, 3], [2, 4]];
      case RhymeScheme.abbaa:
        return [[0, 3], [1, 2], [3, 4]];
      case RhymeScheme.ababb:
        return [[0, 2], [1, 3], [3, 4]];
      case RhymeScheme.abbab:
        return [[0, 3], [1, 2], [2, 4]];
      case RhymeScheme.abaab:
        return [[0, 2], [1, 4], [2, 3]];
      case RhymeScheme.aabba:
        return [[0, 1], [1, 4], [2, 3]];
      case RhymeScheme.aaabb:
        return [[0, 1], [1, 2], [3, 4]];
      case RhymeScheme.compm: // AABCCB
        return [[0, 1], [2, 5], [3, 4]];
      case RhymeScheme.bcbdb: // ABCBDB
        return [[1, 3], [3, 5]];
      case RhymeScheme.babab: // ABABAB
        return [[0, 2], [1, 3], [2, 4], [3, 5]];
      case RhymeScheme.spl13: // ABCDEC
        return [[2, 5]];
      case RhymeScheme.spl12: // ABCDED
        return [[3, 5]];
      case RhymeScheme.cpls3: // AABBCC
        return [[0, 1], [2, 3], [4, 5]];
      case RhymeScheme.babcc: // ABABCC
        return [[0, 2], [1, 3], [4, 5]];
      case RhymeScheme.bacbc: // ABACBC
        return [[0, 2], [1, 4], [3, 5]];
      case RhymeScheme.baccc: // ABACCC
        return [[0, 2], [3, 4], [4, 5]];
      case RhymeScheme.baccb: // ABACCB
        return [[0, 2], [1, 5], [3, 4]];
      case RhymeScheme.bcabc: // ABCABC
        return [[0, 3], [1, 4], [2, 5]];
      case RhymeScheme.bccab: // ABCCAB
        return [[0, 4], [1, 5], [2, 3]];
      case RhymeScheme.a2b3a: // AABBBA
        return [[0, 1], [1, 5], [2, 3], [3, 4]];
      case RhymeScheme.bbaab: // ABBAAB
        return [[0, 3], [1, 2], [2, 5], [3, 4]];
      case RhymeScheme.babc3: // ABABCCC
        return [[0, 2], [1, 3], [4, 5], [5, 6]];
      case RhymeScheme.cacbb: // ABCACBB
        return [[0, 3], [1, 5], [2, 4], [5, 6]];
      case RhymeScheme.srima: // ABABACC
        return [[0, 2], [1, 3], [2, 4], [5, 6]];
      case RhymeScheme.royal: // ABABBCC
        return [[0, 2], [1, 3], [3, 4], [5, 6]];
      case RhymeScheme.oct24: // ABCDEBFD
        return [[1, 5], [3, 7]];
      case RhymeScheme.oct48: // ABCDEFGD
        return [[3, 7]];
      case RhymeScheme.oc458: // ABCDDEFD
        return [[3, 4], [4, 7]];
      case RhymeScheme.oc148: // AABCDDEC
        return [[0, 1], [3, 7], [4, 5]];
      case RhymeScheme.ocaaa: // AAABCCCB
        return [[0, 1], [1, 2], [3, 7], [4, 5], [5, 6]];
      case RhymeScheme.djuan: // ABABABCC
        return [[0, 2], [1, 3], [2, 4], [3, 5], [6, 7]];
      case RhymeScheme.quat2: // ABCBDEFE
        return [[1, 3], [5, 7]];
      case RhymeScheme.cpls4: // AABBCCDD
        return [[0, 1], [2, 3], [4, 5], [6, 7]];
      case RhymeScheme.petra: // ABBAABBA
        return [[0, 3], [1, 2], [2, 5], [3, 4], [4, 7], [5, 6]];
      case RhymeScheme.abab2: // ABABCDCD
        return [[0, 2], [1, 3], [4, 6], [5, 7]];
      case RhymeScheme.cpmp3: // AABCCBDDB
        return [[0, 1], [2, 5], [3, 4], [5, 8], [6, 7]];
      case RhymeScheme.raven: // AABCCCBBB
        return [[0, 1], [2, 6], [3, 4], [4, 5], [6, 7], [7, 8]];
      case RhymeScheme.shalo: // AAAABCCCB
        return [[0, 1], [1, 2], [2, 3], [4, 8], [5, 6], [6, 7]];
      case RhymeScheme.spens: // ABABBCBCC
        return [[0, 2], [1, 3], [3, 4], [4, 6], [5, 7], [7, 8]];
      case RhymeScheme.odeke: // ABABCDEDCE
        return [[0, 2], [1, 3], [4, 8], [5, 7], [6, 9]];
      case RhymeScheme.odeng: // ABABCDECDE
        return [[0, 2], [1, 3], [4, 7], [5, 8], [6, 9]];
      case RhymeScheme.cpls5: // AABBCCDDEE
        return [[0, 1], [2, 3], [4, 5], [6, 7], [8, 9]];
      case RhymeScheme.odek2: // ABABCDECED
        return [[0, 2], [1, 3], [4, 7], [5, 9], [6, 8]];
      case RhymeScheme.odema: // ABCBCADEED
        return [[0, 5], [1, 3], [2, 4], [6, 9], [7, 8]];
      case RhymeScheme.sonit: // ABBAABBACDCDCD
        return [[0, 3], [1, 2], [2, 5], [3, 4], [4, 7], [5, 6], [8, 10], [9, 11], [10, 12], [11, 13]];
      case RhymeScheme.sonsh: // ABABCDCDEFEFGG
        return [[0, 2], [1, 3], [4, 6], [5, 7], [8, 10], [9, 11], [12, 13]];
      case RhymeScheme.sonpe: // ABBAABBACDECDE
        return [[0, 3], [1, 2], [2, 5], [3, 4], [4, 7], [5, 6], [8, 11], [9, 12], [10, 13]];
      case RhymeScheme.stozy: // ABABACDCEDEFEF
        return [[0, 2], [1, 3], [2, 4], [5, 7], [6, 9], [8, 10], [10, 12], [11, 13]];
      case RhymeScheme.stoz2: // ABBABCBCDDEDEE
        return [[0, 3], [1, 2], [2, 4], [4, 6], [5, 7], [8, 9], [9, 11], [10, 12], [12, 13]];
      case RhymeScheme.sonfr: // ABCABDCABCDEDE
        return [[0, 3], [1, 4], [2, 6], [3, 7], [4, 8], [5, 10], [6, 9], [10, 12], [11, 13]];
      case RhymeScheme.sone1: // ABABCDCDEEFEFF
        return [[0, 2], [1, 3], [4, 6], [5, 7], [8, 9], [9, 11], [10, 12], [12, 13]];
      case RhymeScheme.sone2: // ABABCDCDBCEFEF
        return [[0, 2], [1, 3], [3, 8], [4, 6], [5, 7], [6, 9], [10, 12], [11, 13]];
      case RhymeScheme.sone3: // ABABCDCDEFEGGF
        return [[0, 2], [1, 3], [4, 6], [5, 7], [8, 10], [9, 13], [11, 12]];
      case RhymeScheme.soni1: // ABBAABBACDDCDC
        return [[0, 3], [1, 2], [2, 5], [3, 4], [4, 7], [5, 6], [8, 11], [9, 10], [10, 12], [11, 13]];
      case RhymeScheme.soni2: // ABBAABBACDCDDC
        return [[0, 3], [1, 2], [2, 5], [3, 4], [4, 7], [5, 6], [8, 10], [9, 11], [10, 13], [11, 12]];
      case RhymeScheme.soni3: // ABBAABBACDEDCE
        return [[0, 3], [1, 2], [2, 5], [3, 4], [4, 7], [5, 6], [8, 12], [9, 11], [10, 13]];
      case RhymeScheme.soni4: // ABBAABBACDCEDE
        return [[0, 3], [1, 2], [2, 5], [3, 4], [4, 7], [5, 6], [8, 10], [9, 12], [11, 13]];
      case RhymeScheme.soni5: // ABBAABBACDEDEC
        return [[0, 3], [1, 2], [2, 5], [3, 4], [4, 7], [5, 6], [8, 13], [9, 11], [10, 12]];
      case RhymeScheme.soni6: // ABBAABBACDCDEE
        return [[0, 3], [1, 2], [2, 5], [3, 4], [4, 7], [5, 6], [8, 10], [9, 11], [12, 13]];
      case RhymeScheme.cpls8: // AABBCCDDEEFFGGHH
        return [[0, 1], [2, 3], [4, 5], [6, 7], [8, 9], [10, 11], [12, 13], [14, 15]];
      case RhymeScheme.irreg: // irregular rhyme scheme
        return [[]];
      default:
        throw new Error(`getLineNumbersForRhymeScheme doesn't recognize the rhyme type ${rs}`);
    }
  }
}

interface RhymeSchemeData {
  rs: RhymeScheme;
  pairs: string[]
}

type ScoreForLinePair = {[key: string]: number};