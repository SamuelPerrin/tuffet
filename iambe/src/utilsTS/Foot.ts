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
  public stresses: number[] = [];
  public type: FootType = FootType.unknown;

  constructor(stresses: number[], type: FootType) {
    this.stresses = stresses;
    this.type = type;
  }
}

export interface IFoot {
  stresses: number[],
  type: FootType,
}