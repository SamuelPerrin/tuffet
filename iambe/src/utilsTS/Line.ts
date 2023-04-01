import * as phonstants from './phonstants';
import Word from './Word';
import Foot, { IFoot, FootType } from './Foot';
import LineMeter, { LineRhythmType } from './LineMeter';

/**
 * A line of verse
 */
export default class Line {
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
  private correctWeirdFeet(footTypes: FootType[], feet: number[][]): IFoot[] {
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
      // FINISH TRANSLATING THIS HELPER METHOD
    }

    let output: IFoot[] = [];
    const flatFeet = feet.flat();
    for (let i=0, j=0; i < footTypes.length, j < flatFeet.length; i++) {
      output.push({
        stresses: flatFeet.slice(j, j + footTypeToSyllables(footTypes[i])),
        type: footTypes[i]
      });
      j += footTypeToSyllables(footTypes[i]);
    }

    return output;
  }

  /**
   * Finds the most regular pronunciation of the line with multiple possible pronunciations
   * @param meters List of LineMeters for all possible pronunciations of the line
   * @returns The meter of the most regular pronunciation of the line
   */
  howRegular(meters: ILineMeter[]): ILineMeter {

    // assign each possible pronunciation demerits for metrical irregulatrities, returning any possibility without any demerits
    const demeritList: {meter: ILineMeter, demerits: number}[] = [];

    meters.forEach(meter => {
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

      if (meter.rhythm === LineRhythmType.iambic) {
        if (footTypes.includes(FootType.anapest)) demerits += 2;
        if (footTypes.includes(FootType.dactyl)) demerits += 3;
        if (footTypes.includes(FootType.unstressed)) demerits += 1;
        if (footTypes.includes(FootType.stressed)) demerits += 2;
        if (footTypes.length > 1 && footTypes[1] === FootType.trochee) demerits++; // second-foot trochee
        if (footTypes.slice(-1)[0] === FootType.trochee) demerits++; // last foot trochee
        if (meter.measures === 6) demerits++; // long line
        if (meter.measures === 5 && footTypes[4] === FootType.trochee) demerits += 2; // fifth foot trochee in pentameter
      } else if (meter.rhythm === LineRhythmType.trochaic) {
        if (footTypes.includes(FootType.dactyl)) demerits++;
        if (footTypes.includes(FootType.anapest)) demerits += 2;
        if (footTypes.includes(FootType.iamb)) demerits += 2;
        if (footTypes.includes(FootType.stressed)) demerits++;
        if (footTypes.includes(FootType.unstressed)) demerits += 2;
        if (footTypes.filter(foot => foot === FootType.trochee).length === footTypes.length) demerits -= 1; // every foot is a trochee
      } else if (meter.rhythm === LineRhythmType.anapestic) {
        if (footTypes.includes(FootType.dactyl)) demerits++;
        if (footTypes.includes(FootType.trochee)) demerits++;
        if (footTypes.includes(FootType.dactyl) && footTypes.includes(FootType.trochee)) demerits++;
        if (footTypes.slice(-1)[0] === FootType.unstressed) demerits++; // last foot unstressed
      } else if (meter.rhythm === LineRhythmType.dactylic) {
        demerits++; // dactylic verse is uncommon and we should be biased against it
        if (footTypes.includes(FootType.anapest)) demerits++;
        if (footTypes.includes(FootType.iamb)) demerits++;
        if (footTypes.includes(FootType.anapest) && footTypes.includes(FootType.iamb)) demerits++;
      } else if (meter.rhythm === LineRhythmType.unknown) demerits += 2;

      if (demerits === 0) return meter;
      demeritList.push({meter, demerits});
    });

    // sort meters by demerits, ascending
    demeritList.sort((a, b) => a.demerits - b.demerits);

    // return the pronunciation with the fewest demerits
    return demeritList[0].meter;
  }

  /**
   * Resolve the meter of a line with multiple possible pronunciations
   * @returns the best meter for the line
   */
  private resolveCrux(): ILineMeter {
    const words = this.getTokens();
    const stresses: (number[][])[] = words.map(word => new Word(word).getCruxStressList());

    // Get an array of all possible stressLists for the line, where each stressList is an array of one possible pronunciation of the line

    // To start, get an array of the lenghts of all the cruxes in the line
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
      stresses.forEach(word => {
        const iteration = CRUXES[cruxType][Math.floor(j/cruxLengths.length)][j % cruxLengths.length];
        hold.push(word[iteration]);
        j++;
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
  public getMeter(crux: boolean | number[] = false): ILineMeter {
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
    

    // From the last version; still needed?
    // if ('label' in raw && 'foots' in raw && 'feet' in raw && typeof raw.label.catalexis === 'boolean') return raw;

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
    const output = corrected.map(foot => {
      if (this.equiv(foot.stresses, [3,3]) && [FootType.unknown, FootType.iamb].includes(foot.type)) {
        foot.type = FootType.pyrrhic;
      }
      return foot;
    })
    
    return {
      feet: output,
      rhythm: LineRhythmType.unknown,
      isCatalectic: false,
      measures: 5,
    }
  }

  /**
   * Get an array representing the relative stress of each syllable in the line,
   * where each syllable is represented by a string numeral between 1 and 4.
   */
  public getStresses(): number[] {
    const words = this.getTokens();
    let stresses: number[] = [];
    words.forEach(word => {
      const stress = new Word(word).getStressList();
      if (stress === 'crux') return this.resolveCrux().feet.flat();
      stresses = stresses.concat(stress);
    });

    Word.last.push('newline');

    return stresses;
  }
}

interface ILineMeter {
  feet: IFoot[],
  rhythm: LineRhythmType,
  isCatalectic: boolean,
  measures: number
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