import * as phonstants from './phonstants';
import { SyllablesPerFootType } from './phonstants';
import Word from './Word';
import Foot, { FootType } from './Foot';
import LineMeter, { LineRhythmType } from './LineMeter';

/**
 * A line of verse
 */
export default class Line {
  // the text of the line of verse
  text: string = "";

  constructor(text: string) {
    this.text = text.trim();
  }

  /**
   * Returns an order-preserving list of strings representing the words in the line, with punctuation removed
   */
  public getTokens(): string[] {
    let line = this.text;

    // remove some punctuation marks, and replace others with a space
    phonstants.PUNCTS_TO_DELETE.forEach(p => line = line.replace(new RegExp('\\' + p, 'g'), ''));
    phonstants.PUNCTS_TO_SPACE.forEach(p => {
      line = line.replace(new RegExp('\\' + p, 'g'), ' ');
    });

    return line.split(' ').filter(token => token.length > 0);
  }

  /**
   * Returns a list in reverse order of the last n words in the line, where n is 1 by default
   * @param wordsToReturn the number of words to return
   */
  public getTerm(wordsToReturn = 1): string[] {
    const tokens = this.getTokens();
    let terms = [];

    if (tokens.length >= wordsToReturn) {
      for (let i = 0; i < wordsToReturn; i++) {
        terms.push(tokens.slice(-1 - i)[0]);
      }
    } else {
      for (let i = 0; i < tokens.length; i++) {
        terms.push(tokens.slice(-1 - i)[0]);
      }
    }

    return terms;
  }

  // Helper function checking for equivalence between two arrays
  private equiv(arr1: number[], arr2: number[]): boolean {
    return arr1.length === arr2.length && arr1.every((v,i) => v === arr2[i]);
  }

  /**
   * Makes corrections to improbable metric patterns, returning a corrected list of feet
   * @param footTypes list of FootTypes for feet in the line
   * @param feet list of 
   */
  private correctWeirdFeet(footTypes: FootType[], feet: number[][]): Foot[] {
    // Helper function to change feet from unlikely patterns to more likely ones
    function changeFeet(from: FootType[], to: FootType[]): void {
      // update footTypes
      const hold = footTypes.slice(0, -from.length);
      to.forEach(f => hold.push(f));
      footTypes = hold;

      // update feet
      const newFeet = feet.slice(0, -from.length);

      let targetLength = to.length;
      const flatFeet = feet.slice(-from.length).flat();
      while (targetLength > 0) {
        let thisLength = targetLength === 1 ? SyllablesPerFootType[to.slice(-1)[0]] : SyllablesPerFootType[to.slice(-targetLength, 1 - targetLength)[0]];
        let nextFoot: number[] = [];
        let secondLength = 0;
        while (secondLength < thisLength) {
          if (thisLength > 1) {
            nextFoot.push(flatFeet.shift() as number);
          } else {
            nextFoot = [flatFeet.shift() as number];
          }
          secondLength++;
        }
        newFeet.push(nextFoot);
        nextFoot = [];
        targetLength--;
      }
      feet = newFeet;
    }

    const I = FootType.iamb;
    const T = FootType.trochee;
    const A = FootType.anapest;
    const D = FootType.dactyl;
    const S = FootType.stressed;
    const Uns = FootType.unstressed;
    const Unk = FootType.unknown;

    // Helper function to convert DTTS to TIII, etc.
    const iambicize = () => {
      if (this.equiv(footTypes.slice(-4), [D, T, T, S])) changeFeet([D, T, T, S], [T, I, I, I]);
      else if (this.equiv(footTypes.slice(-5), [D, T, T, T, S])) changeFeet([D, T, T, T, S], [T, I, I, I, I]);
      else if (this.equiv(footTypes.slice(-6), [D, T, T, T, T, S])) changeFeet([D, T, T, T, T, S], [T, I, I, I, I, I]);
      else if (this.equiv(footTypes.slice(-4), [A, T, T, S])) changeFeet([A, T, T, S], [Unk, I, I, I]);
      else if (this.equiv(footTypes.slice(-6), [A, T, T, T, T, S])) changeFeet([A, T, T, T, T, S], new Array(6).fill(I));
      else if (this.equiv(footTypes.slice(-5), [D, Unk, T , T, S])) changeFeet([D, Unk, T, T, S], [T, I, I, I, I]);
    }

    if (footTypes.slice(-1)[0] === I) { // fix weird lines ending in iamb
      if (this.equiv(footTypes.slice(-2), [A, I]) && feet.slice(-2, -1)[0][0] < feet.slice(-2,-1)[0][1]) { // change [[2,3,1], [4, 1]] to [[2,3],[1,4],[1]]
        changeFeet([A, I], [T, T, S]);
        iambicize();
      } else if (this.equiv(footTypes.slice(-4), [I, A, D, I]) && feet.slice(-3,-2)[0][0] > feet.slice(-3,-2)[0][1] && feet.slice(-3,-2)[0][2] > feet.slice(-2,-1)[0][0]) changeFeet([I, A, D, I], [I, I, I, T, I]); // change [[4,1], [4,3,2], [1,3,4], [4,1]] to [[4,1],[4,3],[2,1],[3,4],[4,1]]
      else if (this.equiv(footTypes.slice(-2), [D, I]) && feet.slice(-2, -1)[0][2] <= feet.slice(-2, -1)[0][1]) {
        changeFeet([D, I], [T, T, S]);
        iambicize();
      } else if (this.equiv(footTypes.slice(-3), [D, I, I])) {
        changeFeet([D, I, I], [T, T, T, S]);
        iambicize();
      } else if (this.equiv(footTypes.slice(-4), [D, D, Unk, I])) changeFeet([D, D, Unk, I], [T, I, I, Unk, I]);
      else if (this.equiv(footTypes.slice(-4), [D, T, I, I])) changeFeet([D, T, I, I], [T, I, A, I]);
      else if (this.equiv(footTypes.slice(-4), [D, A, I, I])) changeFeet([D, A, I, I], [T, I, I, I, I]);
      else if (this.equiv(footTypes.slice(-4), [D, T, D, I])) changeFeet([D, T, D, I], [T, I, I, T, I]);
      else if (this.equiv(footTypes.slice(-4), [T, A, A, I])) changeFeet([T, A, A, I], [T, I, T, I, I]);
    } else if (footTypes.slice(-1)[0] === T) { // fix weird lines ending in trochee
      if (this.equiv(footTypes.slice(-5), [D, T, T, T, T])) changeFeet([D, T, T, T, T], [T, I, I, I, I, Uns]);
      else if (this.equiv(footTypes.slice(-3), [D, T, T])) changeFeet([D, T, T], [T, I, I, Uns]);
      else if (this.equiv(footTypes.slice(-3), [I, D, T])) changeFeet([I, D, T], [I, T, I, Uns]); // this might be wrong
    } else if (footTypes.slice(-1)[0] === Uns) { // fix weird lines ending in Uns
      if (this.equiv(footTypes.slice(-3), [T, A, Uns])) changeFeet([T, A, Uns], [T, Unk, T]);
      else if (this.equiv(footTypes.slice(-3), [A, I, Uns])) changeFeet([A, I, Uns], [T, T, T]);
      else if (this.equiv(footTypes.slice(-4), [T, D, I, Uns])) changeFeet([T, D, I, Uns], [T, T, T, T]);
      else if (this.equiv(footTypes.slice(-4), [A, I, I, Uns])) changeFeet([A, I, I, Uns], [T, T, T, T]);
      else if (this.equiv(footTypes.slice(-4), [D, I, I, Uns])) changeFeet([D, I, I, Uns], [T, T, T, T]);
      else if (this.equiv(footTypes.slice(-4), [D, D, I, Uns])) changeFeet([D, D, I, Uns], [T, I, T, I, Uns]);
      else if (this.equiv(footTypes.slice(-4), [A, Unk, I, Uns])) changeFeet([A, Unk, I, Uns], [T, T, T, T]);
      else if (this.equiv(footTypes.slice(-2), [T, Uns])) changeFeet([T, Uns], [D]);
    } else if (footTypes.slice(-1)[0] === S) { // fix weird lines ending in S
      if (this.equiv(footTypes.slice(-3), [I, A, S])) changeFeet([I, A, S], [I, I, I]);
      else if (this.equiv(footTypes.slice(-5), [I, A, I, Unk, S])) changeFeet([I, A, I, Unk, S], [I, I, T, Unk, Unk]);
      else if (this.equiv(footTypes.slice(-3), [Unk, A, S])) changeFeet([Unk, A, S], [Unk, I, I]);
      else if (this.equiv(footTypes.slice(-3), [D, I, S]) && feet.slice(-3,-2)[0][2] < feet.slice(-2,-1)[0][0] && feet.slice(-2,-1)[0][1] < feet.slice(-1)[0][0]) changeFeet([D, I, S], [T, T, T]);
      else if (this.equiv(footTypes.slice(-4), [T, D, I, S])) changeFeet([T, D, I, S], [T, T, T, T]);
      else if (this.equiv(footTypes.slice(-4), [T, D, D, S])) changeFeet([T, D, D, S], [A, A, A]);
      else if (this.equiv(footTypes.slice(-3), [I, D, S])) changeFeet([I, D, S], [I, T, I]);
      else if (this.equiv(footTypes.slice(-3), [T, D, S])) {
        if (feet.slice(-3, -2)[0][0] > feet.slice(-2, -1)[0][0]) changeFeet([T, D, S], [A, A]);
        else changeFeet([T, D, S], [T, I, I]);
      } else if (this.equiv(footTypes.slice(-3), [Unk, D, S])) changeFeet([Unk, D, S], [I, T, I]);
      else if (this.equiv(footTypes.slice(-2), [D, S])) changeFeet([D, S], [T, I]);
      else if (this.equiv(footTypes.slice(-4), [I, A, T, S])) changeFeet([I, A, T, S], [I, I, I, I]);
      else if (this.equiv(footTypes.slice(-3), [D, T, S])) {
        changeFeet([D, T, S], [T, I, I]);
        if (this.equiv(footTypes.slice(-4), [D, T, I, I])) changeFeet([D, T, I, I], [T, I, A, I]);
      } else if (this.equiv(footTypes.slice(-4), [A, T, T, S])) changeFeet([A, T, T, S], [I, I, I, I]);
      else if (this.equiv(footTypes.slice(-5), [T, Unk, A, T, S])) changeFeet([T,Unk, A, T, S], [T, Unk, Unk, Unk, I]);
      else if (this.equiv(footTypes.slice(-4), [D, T, T, S])) changeFeet([D, T, T, S], [T, I, I, I]);
      else if (this.equiv(footTypes.slice(-5), [D, Unk, T , T, S])) changeFeet([D, Unk, T, T, S], [T, I, I, I, I]);
      else if (this.equiv(footTypes.slice(-5), [A, T, T, T, S])) changeFeet([A, T, T, S], [I, I, I, I, I]);
      else if (this.equiv(footTypes.slice(-6), [A, T, T, T, T, S])) changeFeet([A, T, T, T, T, S], new Array(6).fill(I));
      else if (this.equiv(footTypes.slice(-5), [D, T, T, T, S])) changeFeet([D, T, T, T, S], [T, I, I, I, I]);
      else if (this.equiv(footTypes.slice(-6), [D, T, T, T, T, S])) changeFeet([D, T, T, T, T, S], [T, I, I, I, I, I]);
      else if (this.equiv(footTypes.slice(-4), [D, Unk, T, S])) changeFeet([D, Unk, T, S], [T, I, I, I]);
      else if (this.equiv(footTypes.slice(-5), [D, T, Unk, T, S])) changeFeet([D, T, Unk, T, S], [T, I, I, I, I]);
      else if (this.equiv(footTypes.slice(-5), [D, Unk, T, T, S])) changeFeet([D, Unk, T, T, S], [T, I, I, I, I]);
      else if (this.equiv(footTypes.slice(-5), [D, I, T, T, S])) changeFeet([D, I, T, T, S], [T, Unk, Unk, I, I]);
      else if (this.equiv(footTypes.slice(-5), [D, Unk, Unk, T, S])) changeFeet([D, Unk, Unk, T, S], [T, I, I, I, I]);
      else if (this.equiv(footTypes.slice(-4), [I, A, Unk, S])) changeFeet([I, A, Unk, S], [I, I, T, I]);
      else if (this.equiv(footTypes.slice(-5), [I, A, Unk, Unk, S])) changeFeet([I, A, Unk, Unk, S], [I, I, Unk, Unk, I]);
      else if (this.equiv(footTypes.slice(-4), [D, T, Unk, S])) changeFeet([D, T, Unk, S], [T, I, I, I]);
      else if (this.equiv(footTypes.slice(-5), [D, T, T, Unk, S])) changeFeet([D, T, T, Unk, S], [T, I, I, I, I]);
      else if (this.equiv(footTypes.slice(-5), [D, Unk, T, Unk, S])) changeFeet([D, Unk, T, Unk, S], [T, I, I, I, I]);
      else if (this.equiv(footTypes.slice(-5), [D, T, Unk, Unk, S])) changeFeet([D, T, Unk, Unk, S], [T, I, I, I, I]);
      else if (this.equiv(footTypes.slice(-5), [D, Unk, Unk, Unk, S])) changeFeet([D, Unk, Unk, Unk, S], [T, Unk, Unk, Unk, I]);
      else if (this.equiv(footTypes.slice(-4), [D, A, A, S])) changeFeet([D, A, A, S], [T, I, I, I, I]);
    } else { // fix weird lines ending in A, D, Unk
      if (this.equiv(footTypes.slice(-4), [I, I, A, A])) changeFeet([I, I, A, A], [I, I, I, T, I]);
      else if (this.equiv(footTypes.slice(-4), [D, T, Unk, A])) changeFeet([D, T, Unk, A], [T, I, I, Unk, I]);
      else if (this.equiv(footTypes.slice(-2), [T, D]) && feet.slice(-1)[0][2] < feet.slice(-1)[0][1]) {
        changeFeet([T, D], [T, T, S]);
        iambicize();
      } else if (this.equiv(footTypes.slice(-3), [I, D, D])) changeFeet([I, D, D], [I, T, I, Unk]);
      else if (this.equiv(footTypes.slice(-4), [T, Unk, D, D])) changeFeet([T, Unk, D, D], [T, Unk, T, I, I]);
      else if (this.equiv(footTypes.slice(-4), [Unk, D, T, Unk])) changeFeet([Unk, D, T, Unk], [A, A, A]);
      else if (this.equiv(footTypes.slice(-4), [Unk, D, D, Unk])) changeFeet([Unk, D, D, Unk], [Unk, T, I, I, Unk]);
      else if (this.equiv(footTypes.slice(-4), [I, A, D, Unk])) changeFeet([I, A, D, Unk], [I, I, I, I, Unk]);
      else if (this.equiv(footTypes.slice(-4), [D, T, A, Unk])) changeFeet([D, T, A, Unk], [T, I, I, I, Unk]);
    }

    let output: Foot[] = [];
    const flatFeet = feet.flat();
    for (let i=0, j=0; i < footTypes.length, j < flatFeet.length; i++) {
      let stressList = flatFeet.slice(j, j + footTypeToSyllables(footTypes[i]));
      output.push(new Foot(stressList, footTypes[i]));
      j += footTypeToSyllables(footTypes[i]);
    }

    return output;
  }

  /**
   * Finds the most regular pronunciation of the line with multiple possible pronunciations
   * @param meters List of LineMeters for all possible pronunciations of the line
   * @returns The meter of the most regular pronunciation of the line
   */
  private howRegular(meters: LineMeter[]): LineMeter {

    // assign each possible pronunciation demerits for metrical irregulatrities, returning any possibility without any demerits
    const demeritList: {meter: LineMeter, demerits: number}[] = [];

    for (let meter of meters) {
      let demerits: number = 0;
      const footTypes: FootType[] = meter.feet.map(foot => foot.type);
      const feet: number[][] = meter.feet.map(foot => foot.stresses);
      feet.forEach((foot, idx) => {
        if (footTypes[idx] === FootType.iamb) {
          if (foot[0] <= foot[1]) demerits++; // trochee?
          if (foot[1] === 4) demerits++; // unstressed second syllable
          if (foot[0] === 1) demerits++; // stressed first syllable
          if (footTypes.length > idx && footTypes[idx + 1] === FootType.trochee) demerits++; // next foot is a trochee
        } else if (footTypes[idx] === FootType.trochee) {
          if (foot[0] >= foot[1]) demerits++; // iamb?
          if (foot[0] === 4) demerits++; // unstressed first syllable
          if (foot[1] === 1) demerits++; // stressed second syllable
        } else if (footTypes[idx] === FootType.unknown) {
          if (foot[0] === 1 && foot[1] === 1) demerits += 2; // stress clash
        }
      });

      if (meter.getRhythm() === LineRhythmType.iambic) {
        if (footTypes.includes(FootType.anapest)) demerits += 2;
        if (footTypes.includes(FootType.dactyl)) demerits += 3;
        if (footTypes.includes(FootType.unstressed)) demerits += 1;
        if (footTypes.includes(FootType.stressed)) demerits += 2;
        if (footTypes.length > 1 && footTypes[1] === FootType.trochee) demerits++; // second-foot trochee
        if (footTypes.slice(-1)[0] === FootType.trochee) demerits++; // last foot trochee
        if (meter.getMeasures() === 6) demerits++; // long line
        if (meter.getMeasures() === 5 && footTypes[4] === FootType.trochee) demerits += 2; // fifth foot trochee in pentameter
      } else if (meter.getRhythm() === LineRhythmType.trochaic) {
        if (footTypes.includes(FootType.dactyl)) demerits++;
        if (footTypes.includes(FootType.anapest)) demerits += 2;
        if (footTypes.includes(FootType.iamb)) demerits += 2;
        if (footTypes.includes(FootType.stressed)) demerits++;
        if (footTypes.includes(FootType.unstressed)) demerits += 2;
        if (footTypes.filter(foot => foot === FootType.trochee).length === footTypes.length) demerits -= 1; // every foot is a trochee
      } else if (meter.getRhythm() === LineRhythmType.anapestic) {
        if (footTypes.includes(FootType.dactyl)) demerits++;
        if (footTypes.includes(FootType.trochee)) demerits++;
        if (footTypes.includes(FootType.dactyl) && footTypes.includes(FootType.trochee)) demerits++;
        if (footTypes.slice(-1)[0] === FootType.unstressed) demerits++; // last foot unstressed
      } else if (meter.getRhythm() === LineRhythmType.dactylic) {
        demerits++; // dactylic verse is uncommon and we should be biased against it
        if (footTypes.includes(FootType.anapest)) demerits++;
        if (footTypes.includes(FootType.iamb)) demerits++;
        if (footTypes.includes(FootType.anapest) && footTypes.includes(FootType.iamb)) demerits++;
      } else if (meter.getRhythm() === LineRhythmType.unknown) demerits += 2;

      if (demerits === 0) return meter;
      demeritList.push({meter, demerits});
    };

    // sort meters by demerits, ascending
    demeritList.sort((a, b) => a.demerits - b.demerits);

    if (!demeritList.length) throw(new Error("IndexException: no demerits"));

    // return the pronunciation with the fewest demerits
    return demeritList[0].meter;
  }

  /**
   * Resolve the meter of a line with multiple possible pronunciations
   * @returns the best meter for the line
   */
  private resolveCrux(): LineMeter {
    const words = this.getTokens();
    const stresses: (number | number[])[][] = words.map(word => {
      let wordStressList = new Word(word).getStressList();
      if (wordStressList === 'crux') {
        return new Word(word).getCruxStressList();
      } return wordStressList as number[];
    });

    // Get an array of all possible stressLists for the line, where each stressList is an array of one possible pronunciation of the line

    // To start, get an array of the lengths of all the cruxes in the line
    const cruxLengths: number[] = [];
    let cruxType: string = '';
    stresses.filter(word => Array.isArray(word[0]))
            .forEach(word => {
              cruxLengths.push(word.length);
              cruxType += word.length.toString();
            });
    
    // Lookup table to turn cruxLengths into stressLists
    const CRUXES: {[key: string]: number[][]} = {
      '2':[[0],[1]],
      '22':[[0,0],[0,1],[1,0],[1,1]],
      '222':[[0,0,0],[0,0,1],[0,1,0],[0,1,1],[1,0,0],[1,0,1],[1,1,0],[1,1,1]],
      '2222':[[0,0,0,0],[0,0,0,1],[0,0,1,0],[0,0,1,1],[0,1,0,0],[0,1,0,1],[0,1,1,0],[0,1,1,1],[1,0,0,0],[1,0,0,1],[1,0,1,0],[1,0,1,1],[1,1,0,0],[1,1,0,1],[1,1,1,0],[1,1,1,1]],
      '22222':[[0,0,0,0,0], [0,0,0,0,1], [0,0,0,1,0], [0,0,0,1,1], [0,0,1,0,0], [0,0,1,0,1], [0,0,1,1,0], [0,0,1,1,1], [0,1,0,0,0], [0,1,0,0,1], [0,1,0,1,0], [0,1,0,1,1], [0,1,1,0,0], [0,1,1,0,1], [0,1,1,1,0], [0,1,1,1,1], [1,0,0,0,0], [1,0,0,0,1], [1,0,0,1,0], [1,0,0,1,1], [1,0,1,0,0], [1,0,1,0,1], [1,0,1,1,0], [1,0,1,1,1], [1,1,0,0,0], [1,1,0,0,1], [1,1,0,1,1], [1,1,1,0,0], [1,1,1,0,1], [1,1,1,1,0], [1,1,1,1,0], [1,1,1,1,1]],
      '3':[[0],[1],[2]],
      '23':[[0,0],[0,1],[0,2],[1,0],[1,1],[1,2]],
      '32':[[0,0],[0,1],[1,0],[1,1],[2,0],[2,1]],
      '223':[[0,0,0],[0,0,1],[0,0,2],[0,1,0],[0,1,1],[0,1,2],[1,0,0],[1,0,1],[1,0,2],[1,1,0],[1,1,1],[1,1,2]],
      '232':[[0,0,0],[0,0,1],[0,1,0],[0,1,1],[0,2,0],[0,2,1],[1,0,0],[1,0,1],[1,1,0],[1,1,1],[1,2,0],[1,2,1]],
      '322':[[0,0,0],[0,0,1],[0,1,0],[0,1,1],[1,0,0],[1,0,1],[1,1,0],[1,1,1],[2,0,0],[2,0,1],[2,1,0],[2,1,1]],
      '4':[[0],[1],[2],[3]],
      '24':[[0,0],[0,1],[0,2],[0,3],[1,0],[1,1],[1,2],[1,3]],
      '42':[[0,0],[0,1],[1,0],[1,1],[2,0],[2,1],[3,0],[3,1]]
    };

    let j: number = 0;
    const stressList: (number | number[])[][] = [];
    let hold: (number | number[])[] = [];
    while (stressList.length < CRUXES[cruxType].length) {
      stresses.forEach((word) => {
        if (Number.isInteger(word[0])) hold.push(word as number[]);
        else if (Array.isArray(word[0])) {
          hold.push(word[CRUXES[cruxType][Math.floor(j/cruxLengths.length)][j % cruxLengths.length]]);
          j++;
        }
      });

      stressList.push(hold);
      hold = [];
    }

    // Get the meter of each array in stressList
    const lines: number[][] = [];
    if (Number.isInteger(stressList[0][0])) throw new Error("Not what I was expecting.");

    (stressList as number[][][]).forEach(pronunciation => {
      const line: number[] = [];
      pronunciation.forEach(word => {
        word.forEach(syllable => {
          line.push(syllable);
        });
      });
      lines.push(line);
    });

    const meters = lines.map(line => this.getMeter(line));

    const best = this.howRegular(meters);

    return best;
  }
  
  /**
   * Get the line's meter
   * @param crux a flag identifying a crux or a stressList from getStresses
   * @returns a LineMeter
   */
  public getMeter(crux: boolean | number[] = false): LineMeter {
    // Helper function for adding a foot (used only in this method)
    const addFoot = (type: FootType) => {
      switch(type) {
        case FootType.anapest:
          let anapest = new Foot(raw.slice(0, 3), FootType.anapest);
          feet.push(anapest);
          raw = raw.slice(3);
          break;
        case FootType.dactyl:
          let dactyl = new Foot(raw.slice(0, 3), FootType.dactyl);
          feet.push(dactyl);
          raw = raw.slice(3);
          break;
        case FootType.iamb:
          let iamb = new Foot(raw.slice(0, 2), FootType.iamb);
          feet.push(iamb);
          raw = raw.slice(2);
          break;
        case FootType.trochee:
          let trochee = new Foot(raw.slice(0, 2), FootType.trochee);
          feet.push(trochee);
          raw = raw.slice(2);
          break;
        case FootType.unknown:
          let unknownFoot = new Foot(raw.slice(0, 2), FootType.unknown);
          feet.push(unknownFoot);
          raw = raw.slice(2);
          break;
        case FootType.unstressed:
          if (raw.length > 1) {
            throw new Error("Tried adding unstressed foot with multiple syllables remaining");
          }
          let unstressedSyl = new Foot(raw, FootType.unstressed);
          feet.push(unstressedSyl);
          raw = [];
          break;
        case FootType.stressed:
          if (raw.length > 1) {
            throw new Error("Tried adding stressed foot with multiple syllables remaining");
          }
          let stressedSyl = new Foot(raw, FootType.stressed);
          feet.push(stressedSyl);
          raw = [];
          break;
        default:
          throw new Error("addFoot doesn't recognize this foot type: " + type);
      }
    }

    let raw: number[] = [];
    if (!crux) {
      raw = this.getStresses();
    } else if (Array.isArray(crux)) {
      raw = crux;
    }
    
    // Divide the line into metrical feet based on syllables' relative stress and position
    let feet: Foot[] = [];
    while (raw.length > 2) {
      if (raw[0] > raw[1]) { // rising (iamb or anapest)
        if (raw[1] > raw[2]) { // anapest
          addFoot(FootType.anapest);
        } else { // raw[1] <= raw[2] (iamb)
          addFoot(FootType.iamb);
        }
      } else if (raw[0] < raw[1]) { // falling (trochee or dactyl)
        if (raw[1] < raw[2]) { // dactyl
          addFoot(FootType.dactyl);
        } else if (raw[1] > raw[2]) {
          if (raw[2] < 3) { // trochee
            addFoot(FootType.trochee);
          } else {
            addFoot(FootType.dactyl);
          }
        } else { // raw[1] === raw[2] (dactyl)
          addFoot(FootType.dactyl);
        }
      } else { // raw[0] === raw[1] (anapest or unknown)
        if (raw[1] <= raw[2]) { // unknown
          addFoot(FootType.unknown);
        } else { // raw[1] > raw[2] (anapest)
          addFoot(FootType.anapest);
        }
      }
    }

    // Handle the last foot/syllable
    if (raw.length > 1) {
      if (raw[0] > raw[1]) { // final iamb
        addFoot(FootType.iamb);
      } else if (raw[0] < raw[1]) { // final trochee
        addFoot(FootType.trochee);
      } else { // raw[0] === raw[1] (unknown)
        addFoot(FootType.unknown);
      }
    } else if (raw.length === 1) {
      addFoot(raw[0] < 3 ? FootType.stressed : FootType.unstressed);
    }

    // Make some corrections
    const corrected = this.correctWeirdFeet(feet.map(foot => foot.type), feet.map(foot => foot.stresses));

    // Correct for pyrrhic substitution
    const finalFeet = corrected.map(foot => {
      if (this.equiv(foot.stresses, [3,3]) && [FootType.unknown, FootType.iamb].includes(foot.type)) {
        foot.type = FootType.pyrrhic;
      }
      return foot;
    });

    return new LineMeter(finalFeet);
  }

  /**
   * Get an array representing the relative stress of each syllable in the line,
   * where each syllable is represented by a string numeral between 1 and 4.
   */
  public getStresses(): number[] {
    const words = this.getTokens();
    let stresses: number[] = [];
    for (let word of words) {
      const stress = new Word(word).getStressList();
      if (stress === 'crux') return this.resolveCrux().feet.map(foot => foot.stresses).flat();
      stresses = stresses.concat(stress);
    }

    Word.last.push('newline');

    return stresses;
  }

  /**
   * Identify which vowels in a word's spelling are being pronounced, especially for words with a different number of vowels in the spelling and the pronunciation
   * @param originalWord The word in question
   * @param syllableCount The number of syllables in the word's pronunciation in this line
   * @param vowelCount The number of vowels in the word's spelling
   * @param stressList List of relative stress of syllables in the word's pronunciation
   * @returns Data to help identify which vowels in the word's spelling are being pronounced
   */
  public equalizeVowels(originalWord: string, syllableCount: number, vowelCount: number, stressList: number[]): IWordVowelData {
    const TRIPHS = ['eau', 'owe', 'iew'];
    let word = originalWord.replace("'", "").toLowerCase();
    word = word.replace("’", "");
    let diphthongCount = 0;
    let silentEs = 0;
    let toRemove = [];

    // Check for a few problematic words with hard-coded solutions
    if (word === 'bounteous' && stressList.length === 2) {
        return {
        syllableCount: 2,
        vowelCount: 2,
        diphthongCount: 0,
        toRemove: [2, 5, 7],
        text: originalWord,
        stressList,
        silentEs
      };
    } else if (word === 'beauteous' && stressList.length === 2) {
      return {
        syllableCount: 2,
        vowelCount: 2,
        diphthongCount: 0,
        toRemove: [2, 3, 5, 7],
        text: originalWord,
        stressList,
        silentEs
      };
    } else if (word === 'aisle' && stressList.length === 1) {
      return {
        syllableCount: 1,
        vowelCount: 1,
        diphthongCount: 0,
        toRemove: [1, 4],
        text: originalWord,
        stressList,
        silentEs
      };
    } else if (word === 'difference' && stressList.length === 2) {
      return {
        syllableCount: 2,
        vowelCount: 2,
        diphthongCount: 0,
        toRemove: [4, 9],
        text: originalWord,
        stressList,
        silentEs
      };
    } else if (word === 'antique') {
      return {
        syllableCount: 2,
        vowelCount: 2,
        diphthongCount: 0,
        toRemove: [5, 6],
        text: originalWord,
        stressList,
        silentEs
      };
    } else if (word === 'away') {
      return {
        syllableCount: 2,
        vowelCount: 2,
        diphthongCount: 1,
        toRemove: [],
        text: originalWord,
        stressList,
        silentEs
      };
    } else if (word === 'tongue') {
      return {
        syllableCount: 1,
        vowelCount: 1,
        diphthongCount: 0,
        toRemove: [4, 5],
        text: originalWord,
        stressList,
        silentEs
      };
    } else if (word.slice(0,3) === 'eye') {
      return {
        syllableCount: 1,
        vowelCount: 1,
        diphthongCount: 0,
        toRemove: [1, 2],
        text: originalWord,
        stressList,
        silentEs
      };
    } else if (word.includes('prayer') && stressList.length === 1) {
      return {
        syllableCount: 1,
        vowelCount: 1,
        diphthongCount: 0,
        toRemove: [3, 4],
        text: originalWord,
        stressList,
        silentEs
      };
    } else if (originalWord.includes('ower') && stressList.length === 1) {
      return {
        syllableCount: 1,
        vowelCount: 1,
        diphthongCount: 0,
        toRemove: [originalWord.indexOf('er')],
        text: originalWord,
        stressList,
        silentEs
      };
    } else if (originalWord.includes("e'e")) {
      return {
        syllableCount: stressList.length,
        vowelCount: stressList.length,
        diphthongCount: 0,
        toRemove: [originalWord.indexOf("e'e") + 2],
        text: originalWord,
        stressList,
        silentEs
      };
    } else if (originalWord.includes("o'e")) {
      return {
        syllableCount: stressList.length,
        vowelCount: stressList.length,
        diphthongCount: 0,
        toRemove: [originalWord.indexOf("o'e") + 2],
        text: originalWord,
        stressList,
        silentEs
      };
    } else if (word.includes("itious")) {
      return {
        syllableCount: stressList.length,
        vowelCount: stressList.length,
        diphthongCount: 0,
        toRemove: [originalWord.indexOf("itious") + 2, originalWord.indexOf("itious") + 4],
        text: originalWord,
        stressList,
        silentEs
      };
    } else if (word.slice(0, 6) === 'toward' && stressList.length === 1) {
      return {
        syllableCount: 1,
        vowelCount: 1,
        diphthongCount: 0,
        toRemove: [3],
        text: originalWord,
        stressList,
        silentEs
      };
    } else if (word.slice(0, 6) === 'heaven' && stressList.length === 1) {
      return {
        syllableCount: 1,
        vowelCount: 1,
        diphthongCount: 0,
        toRemove: [2, 4],
        text: originalWord,
        stressList,
        silentEs
      };
    } else if (word.slice(-5) === 'esque') {
      return {
        syllableCount: stressList.length,
        vowelCount: stressList.length,
        diphthongCount: 0,
        toRemove: [originalWord.indexOf("esque") + 3, originalWord.indexOf("esque") + 4],
        text: originalWord,
        stressList,
        silentEs
      };
    } else if (originalWord.slice(-3) === "'re") {
      return {
        syllableCount: stressList.length,
        vowelCount: stressList.length,
        diphthongCount: 1,
        toRemove: [originalWord.length - 1],
        text: originalWord,
        stressList,
        silentEs
      };
    }

    // Initial Y is not a syllabic vowel
    if (word[0] === 'y' && !['yves', 'ypres'].includes(word)) toRemove.push(0);

    // Handle QU
    if (word.includes('qu')) {
      diphthongCount++;
      vowelCount--;
      word = word.slice(0, word.indexOf('qu') + 1) + word.slice(word.indexOf('qu') + 2);
    }

    
    if (syllableCount != vowelCount) {

      // Look for silent Es
      if (word.slice(-1) === 'e') { // word ends with E
        if (word.slice(-2,-1) !== 'r' && word.slice(-2, -1) !== 'l') {
          // word ends with E but not RE or LE
          silentEs++; vowelCount--;
          word = word.slice(0, -1);
          const eq = this.equalizeVowels(word, syllableCount, vowelCount, stressList);
          syllableCount = eq.syllableCount;
          vowelCount = eq.vowelCount;
          diphthongCount += eq.diphthongCount;
          silentEs += eq.silentEs;
          toRemove = eq.toRemove;
        } else { // word ends in RE or LE
          if (!(word.slice(-3, -2) in phonstants.SHORT_VOWELS)) {
            // exception for TROUBLE, MEAGRE, and the like
            Object.keys(phonstants.DIGRAPHS).forEach(digraph => {
              if (word.includes(digraph)) {
                diphthongCount++; vowelCount--;
                word = word.slice(0, word.indexOf(digraph) + 1) + word.slice(word.indexOf(digraph) + 2);
                const eq = this.equalizeVowels(word, syllableCount, vowelCount, stressList);
                syllableCount = eq.syllableCount;
                vowelCount = eq.vowelCount;
                diphthongCount += eq.diphthongCount;
                silentEs += eq.silentEs;
                toRemove = eq.toRemove;
              }
            })
          } else { // vRE (terminal E is silent)
            silentEs++; vowelCount--;
            word = word.slice(0, -1);
            const eq = this.equalizeVowels(word, syllableCount, vowelCount, stressList);
            syllableCount = eq.syllableCount;
            vowelCount = eq.vowelCount;
            diphthongCount += eq.diphthongCount;
            silentEs += eq.silentEs;
            toRemove = eq.toRemove;
          }
        }
        if (word.slice(-3) === 'yre') {
          silentEs++; vowelCount--;
        }
      } else if (word.slice(-3) === 'ies' || word.slice(-3) === 'ied') {
        silentEs++; vowelCount--;
        word = word.slice(0, -2) + word.slice(-1);
        const eq = this.equalizeVowels(word, syllableCount, vowelCount, stressList);
        syllableCount = eq.syllableCount;
        vowelCount = eq.vowelCount;
        diphthongCount += eq.diphthongCount;
        silentEs += eq.silentEs;
        toRemove = eq.toRemove;
      } else if (syllableCount != vowelCount) {
        // check for trigraphs and digraphs
        TRIPHS.forEach(triph => {
          if (word.includes(triph)) {
            vowelCount -= 2;
            const triphStarts = word.indexOf(triph);
            word = word.slice(0, triphStarts + 1) + word.slice(triphStarts + 3);
            const eq = this.equalizeVowels(word, syllableCount, vowelCount, stressList);
            syllableCount = eq.syllableCount;
            vowelCount = eq.vowelCount;
            diphthongCount += eq.diphthongCount;
            silentEs += eq.silentEs;
            toRemove = eq.toRemove;
            toRemove.push(triphStarts + 1);
            toRemove.push(triphStarts + 2);
          }
        });
        Object.keys(phonstants.DIGRAPHS).forEach(digraph => {
          if (word.includes(digraph) && digraph[1] != 'w') {
            // don't count AW or EW as diphthongs for this purpose
            diphthongCount++; vowelCount--;
            word = word.slice(0, word.indexOf(digraph) + 1) + word.slice(word.indexOf(digraph) + 2);
            const eq = this.equalizeVowels(word, syllableCount, vowelCount, stressList);
            syllableCount = eq.syllableCount;
            vowelCount = eq.vowelCount;
            diphthongCount += eq.diphthongCount;
            silentEs += eq.silentEs;
            toRemove = eq.toRemove;
            
            // It was overcounting diphthongs in MOUNTAINS
            if (diphthongCount === 3) diphthongCount = 2;
          }
        });
      }
      if (syllableCount != vowelCount && word.slice(-2) === 'ed') {
        if (!(word.slice(-3, -2) in phonstants.SHORT_VOWELS)) {
          silentEs++; vowelCount--;
          word = word.slice(0, -2) + word.slice(-1);
          const eq = this.equalizeVowels(word, syllableCount, vowelCount, stressList);
          syllableCount = eq.syllableCount;
          vowelCount = eq.vowelCount;
          diphthongCount += eq.diphthongCount;
          silentEs += eq.silentEs;
          toRemove = eq.toRemove;
        } else if (word.slice(-3, -2) === 'i') {
          silentEs++; vowelCount--;
          word = word.slice(0, -3) + word.slice(-2);
          const eq = this.equalizeVowels(word, syllableCount, vowelCount, stressList);
          syllableCount = eq.syllableCount;
          vowelCount = eq.vowelCount;
          diphthongCount += eq.diphthongCount;
          silentEs += eq.silentEs;
          toRemove = eq.toRemove;
        }
      } else if (syllableCount != vowelCount && word.slice(-2) == 'es') {
        if (!(word.slice(-3, -2) in phonstants.SHORT_VOWELS)) {
          silentEs++; vowelCount--;
          word = word.slice(0, -2) + word.slice(-1);
          const eq = this.equalizeVowels(word, syllableCount, vowelCount, stressList);
          syllableCount = eq.syllableCount;
          vowelCount = eq.vowelCount;
          diphthongCount += eq.diphthongCount;
          silentEs += eq.silentEs;
          toRemove = eq.toRemove;
        } else if (word.slice(-3, -2) === 'i') {
          silentEs++; vowelCount--;
          word = word.slice(0, -3) + word.slice(-2);
          const eq = this.equalizeVowels(word, syllableCount, vowelCount, stressList);
          syllableCount = eq.syllableCount;
          vowelCount = eq.vowelCount;
          diphthongCount += eq.diphthongCount;
          silentEs += eq.silentEs;
          toRemove = eq.toRemove;
        }
      }
    }

    // Check for vowels that might be elided
    if (stressList && vowelCount > syllableCount) {
      let elided = 0;
      if (this.equiv(stressList, [1,4])) {
        // stressList is [1,4] like POWER => POW'R, so elide the second vowel
        elided = 2;
      } else if (this.equiv(stressList, [4,1,4])) {
        // like EMPOWER => EMPOW'R, so elide the third vowel
        elided = 3;
      } else if (this.equiv(stressList, [2,1,4])) elided = 3; 
      else if (this.equiv(stressList, [1,4,2])) elided = 2; // POWERFUL
      else if (this.equiv(stressList, [2]) && word.slice(-1)[0] === 'y') { // for monosyllabic MANY (in the phrase MANY A)
        toRemove.push(word.length - 1);
        word = word.slice(0, 1);
        vowelCount--;
      } else if (this.equiv(stressList, [2]) && word.slice(-2, -1)[0] === 'e') {
        // antepenultimate E
        console.log("I'm doing something risky and cutting an E out of", word);
        toRemove.push(word.length - 2);
        word = word.slice(0, -2) + word.slice(-1);
        vowelCount--;
      } else if (this.equiv(stressList, [2]) && word.slice(-2, -1)[0] in phonstants.SHORT_VOWELS) {
        console.log("I'm doing something risky and cutting a", word.slice(-2,-1)[0], "out of", word);
        toRemove.push(word.length - 2);
        word = word.slice(0, -2) + word.slice(-1);
        vowelCount--;
      }

      if (elided) {
        // remove the nth vowel, which we think is elided
        let vowels = 0;
        let position = 0;
        while (vowels < elided && position < word.length) {
          if (word[position] in phonstants.SHORT_VOWELS) {
            vowels++;
          }
          position++;
        }

        toRemove.push(position - 1);
        vowelCount--;
      }
    }

    // Check for interior silent E
    if (vowelCount > syllableCount) {
      const vcE = /[aeiou][bcdfghjklmnprstvwxyz]e/;
      const spot = originalWord.search(vcE);

      const eToRemove = spot + 2;
      if (spot > -1 && !(toRemove.includes(eToRemove))) {
        vowelCount--;
        toRemove.push(eToRemove);
      }
    }

    return {
      syllableCount,
      vowelCount,
      diphthongCount,
      toRemove,
      text: originalWord,
      stressList,
      silentEs
    };
  }

  /**
   * Get data about where the pronounced vowels in the line are
   * @returns a list of objects with data about the position in each word of pronounced vowels
   */
  public getVowelPositions(): IVowelPositions[] {
    // Helper function used only in this method
    const getVowelCount = (word: string): number => {
      let count = word.toLowerCase()[0] === 'y' ? -1 : 0;

      word.toLowerCase().split('').forEach(char => {
        if (char in phonstants.LONG_VOWELS || char === 'è') count++;
      })

      return count;
    }

    const words: string[] = this.getTokens();
    let flatFeet: number[] = this.getMeter().feet.map(foot => foot.stresses).flat();

    const lineList: IWordVowelData[] = words.map(word => {
      const stressList: number[][] = new Word(word).getCruxStressList();
      let syllableCount: number = 0;
      let bestPronunciation: number[] = [];

      // get syllableCount by checking which pronunciation of the word is being used in this line
      if (stressList.length > 1) { // word has multiple possible pronunciations (a "crux")
        stressList.forEach(pronunciation => {
          if (flatFeet.slice(0, pronunciation.length).every((v,i) => v === pronunciation[i])) {
            // only overwrite if this pronunciation has more syllables than the one already found
            // this is necessary for a case like "traveller" [1,4,3] vs. trav'ler [1,4], where [1,4] was overwriting b/c it also matches
            if (!bestPronunciation.length || pronunciation.length >= bestPronunciation.length) {
              syllableCount = pronunciation.length;
              bestPronunciation = pronunciation;
            }
          }
        });
      } else { // word has one pronunciation; use it
        syllableCount = stressList[0].length;
        bestPronunciation = stressList[0];
      }
      flatFeet = flatFeet.slice(bestPronunciation.length);
      const vowelCount = getVowelCount(word);
      const match = this.equalizeVowels(word, syllableCount, vowelCount, bestPronunciation);
      return match;
    });

    const output: IVowelPositions[] = lineList.map(word => {
      // make vowelPositions, an array of the position of every vowel in the word except those in toRemove
      let vowelPositions: number[] = word.text.split('').map((char, idx) => {
        if (char.toLowerCase() in phonstants.LONG_VOWELS && !(word.toRemove.includes(idx))) {
          if (!(idx === 0 && char.toLowerCase() === 'y')) { // XOR
            return idx;
          }
        }
      }).filter(word => word !== undefined) as number[];

      // remove silent Es from vowelPositions
      if (word.silentEs > 0 && word.text[vowelPositions.slice(-1)[0]] === 'e') {
        // if the word has an E as its last vowel, remove it from vowelPositions
        vowelPositions = vowelPositions.slice(0, -1);
        word.silentEs--;
      }

      // remove the second vowel of co-syllabic digraphs from vowelPositions
      let safetyCount = 0;
      while (word.diphthongCount > 0 && safetyCount < 12) {
        let i = 0;
        while (i + 1 < vowelPositions.length) {
          if (vowelPositions[i] + 1 === vowelPositions[i+1]) { // adjacent vowels
            // shift which vowel gets marked if diphthong follows a Q
            if (word.text[vowelPositions[i]] === 'u' && word.text[vowelPositions[i] - 1].toLowerCase() === 'q') {
              vowelPositions.splice(i, 1);
              word.diphthongCount--;
            } else {
              vowelPositions.splice(i + 1, 1);
              word.diphthongCount--;
            }
          }
          i++;
        }
        safetyCount++;
      }

      return {word: word.text, vowelPositions: vowelPositions};
    })

    return output;
  }

  /**
   * Get a string with symbols representing the stress of each syllable in the line
   */
  public getMarkString() {
    const meter: LineMeter = this.getMeter();
    const footTypes: FootType[] = meter.feet.map(foot => foot.type);
    const wordList: IVowelPositions[] = this.getVowelPositions();
    const markList: string[] = [];
    const nbsp = ' ';

    // An array of the position of each punctuation mark in the line
    const punctPositions: number[] = this.text.split('').map((v,i) => phonstants.ALPHAPLUS.includes(v.toLowerCase()) ? null : i).filter(x => x !== null) as number[];
    let syllable = 0;
    let foot = 0;
    wordList.forEach(word => {
      let lastPosition = 0;
      word.vowelPositions.forEach(position => {
        let pos1 = position - lastPosition;
        markList.push(nbsp.repeat(pos1));

        switch(footTypes[foot]) {
          case FootType.iamb:
            if (syllable === 0) {
              markList.push(phonstants.NONICTUS);
              syllable++;
            } else if (syllable === 1) {
              markList.push(phonstants.ICTUS);
              syllable = 0; foot++;
            }
            break;
          case FootType.trochee:
            if (syllable === 0) {
              markList.push(phonstants.ICTUS);
              syllable++;
            } else if (syllable === 1) {
              markList.push(phonstants.NONICTUS);
              syllable = 0; foot++;
            }
            break;
          case FootType.anapest:
            if (syllable === 0 || syllable === 1) {
              markList.push(phonstants.NONICTUS);
              syllable++;
            } else if (syllable === 2) {
              markList.push(phonstants.ICTUS);
              syllable = 0; foot++;
            }
            break;
          case FootType.dactyl:
            if (syllable === 0) {
              markList.push(phonstants.ICTUS);
              syllable++;
            } else if (syllable === 1) {
              markList.push(phonstants.NONICTUS);
              syllable++;
            } else if (syllable === 2) {
              markList.push(phonstants.NONICTUS);
              syllable = 0; foot++;
            }
            break;
          case FootType.pyrrhic:
            if (syllable === 0) {
              markList.push(phonstants.NONICTUS);
              syllable++;
            } else if (syllable === 1) {
              markList.push(phonstants.NONICTUS);
              syllable = 0; foot++;
            }
            break;
          case FootType.unstressed:
            markList.push(phonstants.NONICTUS);
            break;
          case FootType.stressed:
            markList.push(phonstants.ICTUS);
            break;
          case FootType.unknown:
            if (syllable === 0) {
              markList.push(phonstants.UNCERTAIN_ICTUS);
              syllable++;
            } else if (syllable === 1) {
              if (meter.getRhythm() === LineRhythmType.iambic) {
                // show unknown feet as iambs in an iambic line
                markList.push(phonstants.ICTUS);
              } else markList.push(phonstants.UNCERTAIN_ICTUS);
              syllable = 0;
              foot++;
            }
            break;
          default:
            break;
        }
        lastPosition = position + 1;
      });
      if (word.vowelPositions.length === 0) markList.push(nbsp.repeat(word.word.length + 1));
      else markList.push(nbsp.repeat(word.word.length - word.vowelPositions.slice(-1)[0]));
    });

    // Not sure what this does (carried over from previous version)
    let finalMarkList = markList.join('').split('');

    punctPositions.forEach(punct => finalMarkList.splice(punct, 0, nbsp));

    const marks = finalMarkList.join('');

    return marks;
  }

  /**
   * Get a list of metrical variations present in the line (if any)
   */
  public getVariations(): IVariation[] {
    const variations: IVariation[] = [];
    const meter = this.getMeter();

    if (meter.getRhythm() === LineRhythmType.iambic) {
      // Check for variations in an iambic line
      meter.feet.map(foot => foot.type).forEach((foot, idx) => {
        if (foot === FootType.trochee) {
          variations.push({
            type: MetricalVariationType.trochaicInversion,
            footNumber: idx + 1
          });
        } else if (foot === FootType.pyrrhic) {
          variations.push({
            type: MetricalVariationType.pyrrhicSubstitution,
            footNumber: idx + 1
          });
        } else if (foot === FootType.unstressed) {
          if (new Word(this.getTokens().slice(-1)[0]).getStressList().slice(-1)[0] === 4) {
            // the line's last syllable has no stress at all: feminine ending
            variations.push({
              type: MetricalVariationType.feminineEnding,
              footNumber: idx + 1
            });
          } else variations.push({
            type: MetricalVariationType.catalexis,
            footNumber: idx + 1
          });
        } else if (foot === FootType.anapest) {
          variations.push({
            type: MetricalVariationType.anapesticSubstitution,
            footNumber: idx + 1
          });
        }
      });
    }

    return variations;
  }
}

function footTypeToSyllables(type: FootType): number {
  switch(type) {
    case FootType.iamb: // wS
    case FootType.trochee: // Sw
    case FootType.pyrrhic: // ww
    case FootType.unknown: // SS
      return 2;
    case FootType.anapest: // wwS
    case FootType.dactyl: // Sww
      return 3;
    case FootType.unstressed: // w
    case FootType.stressed: // S
      return 1;
  }
}

export interface IVowelPositions {
  // the word in question
  word: string,

  // list of positions in the word's spelling that are pronounced vowels
  vowelPositions: number[]
}

export interface IWordVowelData {
  // number of syllables in the word's pronunciation
  syllableCount: number,

  // number of pronounced vowels in the word's spelling (should equal syllableCount)
  vowelCount: number,

  // number of digrams in the word's spelling that are pronounced as a single vowel
  diphthongCount: number,

  // list of positions in the word's spelling that have vowels that seem like they're elided
  toRemove: number[],

  // text of the word this data is for
  text: string,

  // stress list of the word's pronunciation in this line
  stressList: number[],

  // number of silent Es in the word
  silentEs: number,
}

export interface IVariation {
  // Type of the current variation (trochaic inversion, etc.)
  type: MetricalVariationType,

  // Index of the foot in the line containing this variation
  footNumber: number,
}

export enum MetricalVariationType {
  trochaicInversion = "trochaic inversion",
  pyrrhicSubstitution = "pyrrhic substitution",
  feminineEnding = "feminine ending",
  catalexis = "catalexis",
  anapesticSubstitution = "anapestic substitution"
}