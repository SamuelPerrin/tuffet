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
        {rs:'quatr', pairs:['twofour']},
        {rs:'ababx', pairs:['onethree', 'twofour']},
        {rs:'abbax', pairs:['onefour', 'twothree']},
        {rs:'aaaax', pairs:['onetwo', 'onethree', 'onefour', 'twothree', 'twofour', 'threefour']},
        {rs:'cpls2', pairs:['onetwo', 'threefour']},
        {rs:'abaax', pairs:['onethree', 'onefour', 'threefour']},
        {rs:'aabax', pairs:['onetwo', 'onefour', 'twofour']},
      ];
      let fourthPossibles : RhymeSchemeData[] = [];

      const allScores: { [key: string]: number } = {
        'onetwo': onetwo,
        'onethree': onethree,
        'onefour': onefour,
        'twothree': twothree,
        'twofour': twofour,
        'threefour': threefour,
      };

      let output = this.winnower(possibles, allScores);
    }
    
    return RhymeScheme.quatr;
  }

  private winnower(rhymeSchemes: RhymeSchemeData[], rhymes: { [key: string]: number }, recurring : boolean = false): RhymeScheme[] {
    return [];
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
  rs: string;
  pairs: string[]
}