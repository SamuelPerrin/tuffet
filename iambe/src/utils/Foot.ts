export enum FootType {
  iamb,
  trochee,
  anapest,
  dactyl,
  pyrrhic,
  unstressed,
  stressed,
  unknown
}

export default class Foot {
  // list of relative stresses of the syllables making up this foot
  public stresses: number[] = [];

  // type of this foot (iamb, trochee, etc.)
  public type: FootType = FootType.unknown;

  constructor(stresses: number[], type: FootType) {
    this.stresses = stresses;
    this.type = type;
  }
}