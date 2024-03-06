import Stanza, { VerseForm } from "./Stanza";
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

  /**
   * Get data about the rhymes present in the stanza
   * @returns array of RhymeInfo from every stanza in the poem
   */
  public getRhymes(): RhymeInfo[][] {
    if (this.rhymes && this.rhymes.length) return this.rhymes;

    const rhymes: RhymeInfo[][] = this.getStanzas().map(s => s.getRhymes());
    this.rhymes = rhymes;
    return rhymes;
  }

  /**
   * @returns the verse form of each of the poem's stanzas, if they're all the same, else unknown
   */
  public getPoemMeter(): VerseForm {
    const meters = this.getMeters();

    return meters.every(meter => meter === meters[0]) ? meters[0] : VerseForm.unknown;
  }

  /**
   * @returns verse forms for each of the poem's stanzas
   */
  private getMeters(): VerseForm[] {
    const stanzas = this.getStanzas();
    
    return stanzas.map(stanza => stanza.getMeter());
  }
}