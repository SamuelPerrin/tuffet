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

  getPoemMeter() {
    /**
     * returns a string labelling the meter of the poem if the poem consists of only one kind of stanza, else 'N/A'
     */
    const meters = this.getMeters();

    return meters.every(meter => meter === meters[0]) ? meters[0] : 'N/A';
  }

  getMeters() {
    /**
     * Returns an array of strings, with each string representing the meter of a stanza in the poem
     */

     const stanzas = this.getStanzas();

     return stanzas.map(stanza => new Stanza(stanza).getMeter());
  }
}

export default Poem;