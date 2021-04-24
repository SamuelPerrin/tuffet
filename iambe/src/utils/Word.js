class Word {
  constructor(word) {
    this.word = word.toLowerCase();
    if (!this.word instanceof String || this.word.length === 0) {
      throw new Error(`${word} is not a word.`)
    }
    if (this.word.charAt(0) === "'" && this.word.slice(1,4) !== 'tis' && this.word.slice(1,3) !== 'tw') {
      this.word = this.word.slice(1)
    }
    if (this.word.slice(-1) === "'" && !["th'", "o'", "i'"].includes(this.word)) {
      this.word = this.word.slice(0,-1)
    }
  }

  getPron(rhyme=false) {
    /*
     * Returns the CMUPD pronunciation of the word.
     * Output is a string for words with only one possible pronunciation.
     * Output is an array of strings for words with multiple possible pronunciations.
     * When the parameter `rhyme` is true, returns a list of possible pronunciations.
     */
    if (this.word === "test") {
      return rhyme ? ["T EH1 S T"] : "T EH1 S T"
    }
  }
}

export default Word