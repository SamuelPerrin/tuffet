import Poem from "./Poem";


class Anthology {
  // A string representing several poems, with poems divided by \n\n\n\n, stanzas divided by \n\n, and lines divided by \n
  constructor(text) {
    this.text = text;
  }

  getPoems() {
    // returns an array of strings representing the poems in the anthology, with stanzas divided by \n\n and lines divided by \n
    return this.text.split('\n\n\n\n').filter(x => !!x);
  }

  getRhymes() {
    // returns a list of rhyme data from every stanza in every poem in the anthology
     const rhymes = [];
     
     this.getPoems().forEach(poem => rhymes.push(new Poem(poem).getRhymes()));
     
     return rhymes;
  }
}

export default Anthology;