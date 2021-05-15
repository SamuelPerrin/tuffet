import Stanza from "./Stanza";


class Poem {
  // a string that represents a poem, with stanzas divided by \n\n and lines divided by \n
  constructor(text) {
    this.text = text;
  }

  getStanzas() {
    // returns an array of strings representing the stanzas of the poem, splitting this.text on \n
    return this.text.split('\n\n').filter(x => !!x);
  }

  getRhymes() {
    // returns an array of objects with rhyme data from every stanza in the poem

    const rhymes = [];

    this.getStanzas().forEach(stanza => rhymes.push(new Stanza(stanza).getRhymes()));

    return rhymes;
  }
}

export default Poem;