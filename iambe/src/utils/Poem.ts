import Stanza, { VerseForm } from "./Stanza";
import { RhymeInfo } from "./Rhyme";

/**
 * A poem with stanzas divided by \n\n and lines divided by \n
 */
export default class Poem {
  text: string = "";
  private stanzas: Stanza[] = null!;
  private rhymes: RhymeInfo[][] = null!;
  private poemMeter: VerseForm = null!;
  private meters: VerseForm[] = null!;

  constructor(text: string) {
    this.text = text;
  }

  /**
   * Returns an array of Stanzas
   */
  public getStanzas(): Stanza[] {
    if (this.stanzas) {
      return this.stanzas;
    }


    this.stanzas = this.text.split('\n\n').filter(s => !!s).map(s => new Stanza(s));
    return this.stanzas;
  }

  /**
   * Get data about the rhymes present in the stanza
   * @returns array of RhymeInfo from every stanza in the poem
   */
  public getRhymes(): RhymeInfo[][] {
    if (this.rhymes) {
      return this.rhymes;
    }

    const rhymes: RhymeInfo[][] = this.getStanzas().map(s => s.getRhymes());
    this.rhymes = rhymes;
    return rhymes;
  }

  /**
   * @returns the verse form of each of the poem's stanzas, if they're all the same, else unknown
   */
  public getPoemMeter(): VerseForm {
    if (this.poemMeter) {
      return this.poemMeter;
    }

    const meters = this.getMeters();

    this.poemMeter = meters.every(meter => meter === meters[0]) ? meters[0] : VerseForm.unknown;

    return this.poemMeter;
  }

  /**
   * @returns verse forms for each of the poem's stanzas
   */
  private getMeters(): VerseForm[] {
    if (this.meters) {
      return this.meters;
    }
    const stanzas = this.getStanzas();
    
    this.meters = stanzas.map(stanza => stanza.getMeter());

    return this.meters;
  }
}