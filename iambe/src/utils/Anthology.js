import Poem from "./Poem";
import Stanza from "./Stanza";


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

  getRhymeStats() {
    // returns an object with the number of occurrences of each rhymetype present in the anthology
    const rhymes = this.getRhymes();
    const counts = {
      'full rhyme':0,
      'homophone rhyme':0,
      'identical rhyme':0,
      'promotion rhyme':0,
      'mosaic full':0,
      'diph-diph rhyme':0,
      'diph-vow rhyme':0,
      'vow-diph rhyme':0,
      'diph-vow promotion rhyme':0,
      'vow-diph promotion rhyme':0,
      'diph-diph promotion rhyme':0,
      'mosaic slant rhyme':0,
      'sibilant assonance':0,
      'nasal assonance':0,
      'assonance':0,
      'full consonance':0,
      'promotion consonance':0,
      'diph-vow assonance':0,
      'vow-diph assonance':0,
      'diph-diph assonance':0,
      'partial consonance':0,
      'unstressed rhyme':0,
      'diph-vow promotion assonance':0,
      'vow-diph promotion assonance':0,
      'diph-diph promotion assonance':0,
      'anisobaric rhyme':0,
      'zero consonance':0,
      'sibilant consonance':0,
      'nasal consonance':0,
      'N/A':0
    };
      
      rhymes.forEach(poem => {
        poem.forEach(stanza => {
          stanza.forEach(rhyme => {
            counts[rhyme.rt]++;
          })
        })
      })

      return counts;
  }

  getRhymeSchemeStats() {
    // returns an object with the number of occurrences of each rhyme scheme in the anthology
    const poems = this.getPoems();
    const counts = {
      'cplt1':0,
      'aaaxx':0,
      'aabxx':0,
      'abaxx':0,
      'abbxx':0,
      'quatr':0,
      'ababx':0,
      'abbax':0,
      'aaaax':0,
      'cpls2':0,
      'abaax':0,
      'aabax':0,
      'irreg':0,
      'N/A':0,
    };
    
    poems.forEach(poem => new Poem(poem).getStanzas().forEach(stanza => counts[new Stanza(stanza).getRhymeScheme()]++));

    return counts;
  }
}

export default Anthology;