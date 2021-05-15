

class Poem {
  // a string that represents a poem, with stanzas divided by \n\n and lines divided by \n
  constructor(text) {
    this.text = text;
  }

  getStanzas() {
    // returning an array of lines representing the stanzas of the poem, splitting this.text on \n
    return this.text.split('\n\n').filter(x => !!x);
  }
}

export default Poem;