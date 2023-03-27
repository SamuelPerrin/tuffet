import Stanza from "./Stanza";
import Rhyme, { RhymeInfo } from "./Rhyme";

/**
 * A poem with stanzas divided by \n\n and lines divided by \n
 */
export default class Poem {
  text: string = "";
  private stanzas: Stanza[] = [];
  private rhymes: RhymeInfo[][] = [];

  constructor(text: string) {
    this.text = text;
  }

  /**
   * Returns an array of Stanzas
   */
  public getStanzas(): Stanza[] {
    if (this.stanzas && this.stanzas.length) return this.stanzas;


    this.stanzas = this.text.split('\n\n').filter(s => !!s).map(s => new Stanza(s));
    return this.stanzas;
  }

  public getRhymes(): RhymeInfo[][] {
    if (this.rhymes && this.rhymes.length) return this.rhymes;

    const rhymes: RhymeInfo[][] = this.getStanzas().map(s => s.getRhymes());
    this.rhymes = rhymes;
    return rhymes;
  }
}