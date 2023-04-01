import Foot, { FootType } from "./Foot";

export enum LineRhythmType {
  iambic,
  trochaic,
  anapestic,
  dactylic,
  unknown
}

export default class LineMeter {
  public feet: Foot[] = [];
  private rhythm: LineRhythmType = null!;
  private measures: number = null!;

  constructor(feet: Foot[]) {
    this.feet = feet;
  }

  /**
   * Returns the number of measures in the line (e.g., iambic pentameter has five measures)
   */
  public getMeasures(): number {
    if (this.measures != null) return this.measures;
    return 0;
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
      lessers.forEach(lesser => isGreater &&= greatest > lesser);

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
    return false;
  };

  /**
   * 
   * @returns a string labeling the type of meter in the line (e.g., iambic pentameter acatalectic)
   */
  public getLabel(): string {
    return "";
  }
}