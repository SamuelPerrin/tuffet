import Line from "./Line";
import Poem from "./Poem";
import Stanza from "./Stanza";
import { RhymeInfo } from "./Rhyme";
import { RhymeType, RhymeScheme } from "./phonstants";

/**
 * A group of poems, with poems divided by \n\n\n\n, stanzas divided by \n\n, and lines divided by \n
 */
class Anthology {
  // text of this anthology
  public text: string = "";

  // list of poems in this collection
  private poems: Poem[] = [];

  // list of rhymes for each of the stanzas in each of the poems in the anthology
  private rhymes: RhymeInfo[][][] = [];

  // data about the number of rhymes of various kinds present in the anthology
  private rhymeTypeCounts: RhymeTypeCounts | null = null;

  // data about the number of rhyme schemes present in the anthology
  private rhymeSchemeCounts: RhymeSchemeCounts | null = null;

  constructor(text: string) {
    this.text = text;
  }

  /**
   * Getter for `poems` member
   * @returns list of poems
   */
  public getPoems(): Poem[] {
    if (this.poems && this.poems.length) return this.poems;
    if (this.text.length === 0) throw new Error("Poems cannot be empty!");

    this.poems = this.text.split('\n\n\n\n').filter(p => !!p).map(p => new Poem(p));
    return this.poems;
  }

  /**
   * Get nested array of rhyme info from every stanza in every poem in the anthology
   */
  private getRhymes(): RhymeInfo[][][] {
    if (this.rhymes && this.rhymes.length) return this.rhymes;

    if (!this.text.includes("\n")) throw new Error("Tuffet cannot find rhymes in one line!");

    const rhymes = this.getPoems().map(p => p.getRhymes());
    this.rhymes = rhymes;

    return this.rhymes;
  }

  /**
   * Get data about the most common rhyme types in the sample
   * @returns object with counts for the rhyme types in the sample
   */
  public getRhymeTypeCounts(): RhymeTypeCounts {
    if (this.rhymeTypeCounts != null) return this.rhymeTypeCounts;

    const counts: RhymeTypeCounts = {
      [RhymeType.fullRhyme]: 0,
      [RhymeType.homophoneRhyme]: 0,
      [RhymeType.identicalRhyme]: 0,
      [RhymeType.promotionRhyme]: 0,
      [RhymeType.diphthongRhyme]: 0,
      [RhymeType.promotionDiphthongRhyme]: 0,
      [RhymeType.sibilantAssonance]: 0,
      [RhymeType.nasalAssonance]: 0,
      [RhymeType.assonance]:0,
      [RhymeType.fullConsonance]: 0,
      [RhymeType.promotionConsonance]: 0,
      [RhymeType.diphthongAssonance]: 0,
      [RhymeType.partialConsonance]: 0,
      [RhymeType.unstressedRhyme]: 0,
      [RhymeType.promotionDiphthongAssonance]: 0,
      [RhymeType.anisobaricRhyme]: 0,
      [RhymeType.zeroConsonance]: 0,
      [RhymeType.sibilantConsonance]: 0,
      [RhymeType.nasalConsonance]: 0,
      [RhymeType.none]: 0,
    };

    const rhymes: RhymeInfo[][][] = this.getRhymes();
    this.rhymes = rhymes;
    rhymes.forEach(poem => poem.forEach(stanza => stanza.forEach(rhyme => counts[rhyme.rhymeType]++)));
    
    this.rhymeTypeCounts = counts;

    return this.rhymeTypeCounts;
  }

  /**
   * Get data about the most common rhyme schemes in the sample
   */
  public getRhymeSchemeCounts(): RhymeSchemeCounts {
    if (this.rhymeSchemeCounts != null) return this.rhymeSchemeCounts;

    const poems: Poem[] = this.getPoems();
    const counts: RhymeSchemeCounts = {
      [RhymeScheme.cplt1]: 0,
      [RhymeScheme.aaaxx]: 0,
      [RhymeScheme.aabxx]: 0,
      [RhymeScheme.abaxx]: 0,
      [RhymeScheme.abbxx]: 0,
      [RhymeScheme.quatr]: 0,
      [RhymeScheme.ababx]: 0,
      [RhymeScheme.abbax]: 0,
      [RhymeScheme.aaaax]: 0,
      [RhymeScheme.cpls2]: 0,
      [RhymeScheme.abaax]: 0,
      [RhymeScheme.aabax]: 0,
      [RhymeScheme.abccb]: 0,
      [RhymeScheme.aabcb]: 0,
      [RhymeScheme.splt1]: 0,
      [RhymeScheme.splt3]: 0,
      [RhymeScheme.aabab]: 0,
      [RhymeScheme.aabbb]: 0,
      [RhymeScheme.aabbc]: 0,
      [RhymeScheme.ababa]: 0,
      [RhymeScheme.abbaa]: 0,
      [RhymeScheme.ababb]: 0,
      [RhymeScheme.abbab]: 0,
      [RhymeScheme.abaab]: 0,
      [RhymeScheme.aabba]: 0,
      [RhymeScheme.aaabb]: 0,
      [RhymeScheme.compm]: 0,
      [RhymeScheme.bcbdb]: 0,
      [RhymeScheme.babab]: 0,
      [RhymeScheme.spl13]: 0,
      [RhymeScheme.spl12]: 0,
      [RhymeScheme.cpls3]: 0,
      [RhymeScheme.babcc]: 0,
      [RhymeScheme.bacbc]: 0,
      [RhymeScheme.baccc]: 0,
      [RhymeScheme.baccb]: 0,
      [RhymeScheme.bcabc]: 0,
      [RhymeScheme.bccab]: 0,
      [RhymeScheme.a2b3a]: 0,
      [RhymeScheme.bbaab]: 0,
      [RhymeScheme.babc3]: 0,
      [RhymeScheme.cacbb]: 0,
      [RhymeScheme.srima]: 0,
      [RhymeScheme.royal]: 0,
      [RhymeScheme.oct24]: 0,
      [RhymeScheme.oct48]: 0,
      [RhymeScheme.oc458]: 0,
      [RhymeScheme.oc148]: 0,
      [RhymeScheme.ocaaa]: 0,
      [RhymeScheme.djuan]: 0,
      [RhymeScheme.quat2]: 0,
      [RhymeScheme.cpls4]: 0,
      [RhymeScheme.petra]: 0,
      [RhymeScheme.abab2]: 0,
      [RhymeScheme.cpmp3]: 0,
      [RhymeScheme.raven]: 0,
      [RhymeScheme.shalo]: 0,
      [RhymeScheme.spens]: 0,
      [RhymeScheme.odeke]: 0,
      [RhymeScheme.odeng]: 0,
      [RhymeScheme.cpls5]: 0,
      [RhymeScheme.odek2]: 0,
      [RhymeScheme.odema]: 0,
      [RhymeScheme.sonit]: 0,
      [RhymeScheme.sonsh]: 0,
      [RhymeScheme.sonpe]: 0,
      [RhymeScheme.stozy]: 0,
      [RhymeScheme.stoz2]: 0,
      [RhymeScheme.sonfr]: 0,
      [RhymeScheme.sone1]: 0,
      [RhymeScheme.sone2]: 0,
      [RhymeScheme.sone3]: 0,
      [RhymeScheme.soni1]: 0,
      [RhymeScheme.soni2]: 0,
      [RhymeScheme.soni3]: 0,
      [RhymeScheme.soni4]: 0,
      [RhymeScheme.soni5]: 0,
      [RhymeScheme.soni6]: 0,
      [RhymeScheme.cpls8]: 0,
      [RhymeScheme.irreg]: 0,
    };

    poems.forEach(poem => poem.getStanzas().forEach(stanza => counts[stanza.getRhymeScheme()]++));

    this.rhymeSchemeCounts = counts;

    return this.rhymeSchemeCounts;
  }
}

type RhymeTypeCounts = {[key in RhymeType]: number};
type RhymeSchemeCounts = {[key in RhymeScheme]: number};