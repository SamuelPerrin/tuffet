import Foot, { FootType } from "./Foot";
import { NameForMeasure } from "./phonstants";

export enum LineRhythmType {
  iambic,
  trochaic,
  anapestic,
  dactylic,
  unknown
}

export default class LineMeter {
  // list of feet in this line's scansion
  public feet: Foot[] = [];

  // type of metrical rhythm in use in this line (iambic, trochaic, etc.)
  private rhythm: LineRhythmType = null!;

  // number of feet in this line (includes catalectic last foot, if relevant)
  private measures: number = null!;

  constructor(feet: Foot[]) {
    this.feet = feet;
  }

  /**
   * Returns the number of measures in the line (e.g., iambic pentameter has five measures)
   */
  public getMeasures(): number {
    if (this.measures != null) return this.measures;

    this.measures = this.feet.length;
    return this.measures;
  }

  /**
   * 
   * @returns The type of metrical rhythm in the line (e.g., iambic or trochaic)
   */
  public getRhythm(): LineRhythmType {
    if (this.rhythm != null) return this.rhythm;

    // Histogram of foot types in this line
    const counts: Record<FootType, number> = {
      [FootType.iamb]: 0,
      [FootType.trochee]: 0,
      [FootType.anapest]: 0,
      [FootType.dactyl]: 0,
      [FootType.pyrrhic]: 0,
      [FootType.unstressed]: 0,
      [FootType.stressed]: 0,
      [FootType.unknown]: 0,
    };

    // Helper method checks if `greatest` is more prevalent in the line than all the FootTypes in `lessers`
    const greaterThan = (greatest: FootType, lessers: FootType[]): boolean => {
      let isGreater = true;
      lessers.forEach(lesser => isGreater &&= counts[greatest] > counts[lesser]);

      return isGreater;
    }

    this.feet.forEach(foot => {
      if (foot.type in counts) {
        counts[foot.type]++;
      }
    });

    let rhythm: LineRhythmType = LineRhythmType.unknown;
    if (greaterThan(FootType.iamb, [FootType.trochee, FootType.anapest, FootType.dactyl])) rhythm = LineRhythmType.iambic;
    else if (greaterThan(FootType.trochee, [FootType.iamb, FootType.anapest, FootType.dactyl])) rhythm = LineRhythmType.trochaic;
    else if (greaterThan(FootType.anapest, [FootType.iamb, FootType.trochee, FootType.dactyl])) rhythm = LineRhythmType.anapestic;
    else if (greaterThan(FootType.dactyl, [FootType.iamb, FootType.trochee, FootType.anapest])) rhythm = LineRhythmType.dactylic;
    else if (counts[FootType.iamb] > counts[FootType.trochee] && counts[FootType.iamb] === counts[FootType.anapest] && counts[FootType.dactyl] === 0) rhythm = LineRhythmType.anapestic;
    else if (counts[FootType.trochee] > counts[FootType.iamb] && counts[FootType.trochee] === counts[FootType.dactyl] && counts[FootType.anapest] === 0) rhythm = LineRhythmType.dactylic;
    else if (counts[FootType.trochee] === counts[FootType.iamb] && this.feet[0].type === FootType.trochee && counts[FootType.unknown] > 0) rhythm = LineRhythmType.iambic;
    else if (counts[FootType.trochee] === counts[FootType.iamb] && counts[FootType.trochee] > 0) { // trochees and iambs
      if (this.feet[0].type === FootType.trochee && this.feet.length === 2) rhythm = LineRhythmType.iambic;
      if (this.feet[0].type === FootType.iamb || this.feet.slice(-1)[0].type === FootType.iamb) rhythm = LineRhythmType.iambic;
      else if (this.feet.slice(-1)[0].type === FootType.trochee || this.feet.slice(-1)[0].type === FootType.stressed) rhythm = LineRhythmType.trochaic;
    } 
    
    return rhythm;
  }

  /**
   * 
   * @returns Flag representing whether the line features catalexis (missing last syllable)
   */
  public isCatalectic(): boolean {
    switch (this.getRhythm()) {
      case LineRhythmType.iambic:
        return this.feet.slice(-1)[0].type === FootType.unstressed;
      case LineRhythmType.trochaic:
        return this.feet.slice(-1)[0].type === FootType.stressed;
      case LineRhythmType.anapestic:
        return this.feet.slice(-1)[0].type === FootType.pyrrhic;
      case LineRhythmType.dactylic:
        return this.feet.slice(-1)[0].type === FootType.trochee;
      case LineRhythmType.unknown:
        return false;
    }
  };

  /**
   * 
   * @returns a string labeling the type of meter in the line (e.g., iambic pentameter acatalectic)
   */
  public getSummary(): LineMeterSummary {
    const rhythm: string = LineRhythmType[this.getRhythm()];
    const measure: number = this.getMeasures();
    let measureString: string;
    if (measure in NameForMeasure) {
      measureString = NameForMeasure[measure];
    } else {
      throw new Error(`Couldn't find name for line with ${measure} ${measure === 1 ? "foot" : "feet"}`);
    }
    
    let output = `${rhythm} ${measureString}`;
    if (this.isCatalectic()) {
      output += " catalectic";
    }
    return output as LineMeterSummary;
  }
}

export enum LineMeterSummary {
  iambicDimeter = 'iambic dimeter',
  iambicDimeterCatalectic = 'iambic dimeter catalectic',
  iambicTrimeter = 'iambic trimeter',
  iambicTrimeterCatalectic = 'iambic trimeter catalectic',
  iambicTetrameter = 'iambic tetrameter',
  iambicTetrameterCatalectic = 'iambic tetrameter catalectic',
  iambicPentameter = 'iambic pentameter',
  iambicPentameterCatalectic = 'iambic pentameter catalectic',
  iambicHexameter = 'iambic hexameter',
  iambicHexameterCatalectic = 'iambic hexameter catalectic',
  iambicHeptameter = 'iambic heptameter',
  iambicHeptameterCatalectic = 'iambic heptameter catalectic',
  iambicOctameter = 'iambic octameter',
  unknownDimeter = 'unknown dimeter',
  unknownDimeterCatalectic = 'unknown dimeter catalectic',
  unknownTrimeter = 'unknown trimeter',
  unknownTrimeterCatalectic = 'unknown trimeter catalectic',
  unknownTetrameter = 'unknown tetrameter',
  unknownTetrameterCatalectic = 'unknown tetrameter catalectic',
  unknownPentameter = 'unknown pentameter',
  unknownPentameterCatalectic = 'unknown pentameter catalectic',
  trochaicDimeter = 'trochaic dimeter',
  trochaicDimeterCatalectic = 'trochaic dimeter catalectic',
  trochaicTrimeter = 'trochaic trimeter',
  trochaicTrimeterCatalectic = 'trochaic trimeter catalectic',
  trochaicTetrameter = 'trochaic tetrameter',
  trochaicTetrameterCatalectic = 'trochaic tetrameter catalectic',
  trochaicPentameter = 'trochaic pentameter',
  trochaicPentameterCatalectic = 'trochaic pentameter catalectic',
  trochaicHexameter = 'trochaic hexameter',
  trochaicHexameterCatalectic = 'trochaic hexameter catalectic',
  trochaicHeptameter = 'trochaic heptameter',
  trochaicHeptameterCatalectic = 'trochaic heptameter catalectic',
  trochaicOctameter = 'trochaic octameter',
  trochaicOctameterCatalectic = 'trochaic octameter catalectic',
  anapesticDimeter = 'anapestic dimeter',
  anapesticDimeterCatalectic = 'anapestic dimeter catalectic',
  anapesticTrimeter = 'anapestic trimeter',
  anapesticTrimeterCatalectic = 'anapestic trimeter catalectic',
  anapesticTetrameter = 'anapestic tetrameter',
  anapesticTetrameterCatalectic = 'anapestic tetrameter catalectic',
}