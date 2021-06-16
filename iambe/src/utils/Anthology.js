import Line from "./Line";
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
    // returns an array of rhyme data from every stanza in every poem in the anthology
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
      'diphthong rhyme':0,
      // 'diph-diph rhyme':0,
      // 'diph-vow rhyme':0,
      // 'vow-diph rhyme':0,
      'promotion diphthong rhyme':0,
      // 'diph-vow promotion rhyme':0,
      // 'vow-diph promotion rhyme':0,
      // 'diph-diph promotion rhyme':0,
      'mosaic slant rhyme':0,
      'sibilant assonance':0,
      'nasal assonance':0,
      'assonance':0,
      'full consonance':0,
      'promotion consonance':0,
      'diphthong assonance':0,
      // 'diph-vow assonance':0,
      // 'vow-diph assonance':0,
      // 'diph-diph assonance':0,
      'partial consonance':0,
      'unstressed rhyme':0,
      'promotion diphthong assonance':0,
      // 'diph-vow promotion assonance':0,
      // 'vow-diph promotion assonance':0,
      // 'diph-diph promotion assonance':0,
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
      'aabcb':0,
      'abccb':0,
      'splt1':0,
      'splt3':0,
      'aabab':0,
      'aabbb':0,
      'aabbc':0,
      'ababa':0,
      'abbaa':0,
      'ababb':0,
      'abbab':0,
      'abaab':0,
      'aabba':0,
      'compm':0,
      'bcbdb':0,
      'babab':0,
      'spl13':0,
      'spl12':0,
      'cpls3':0,
      'babcc':0,
      'bacbc':0,
      'baccc':0,
      'baccb':0,
      'bcabc':0,
      'bccab':0,
      'a2b3a':0,
      'babc3':0,
      'cacbb':0,
      'srima':0,
      'royal':0,
      'oct24':0,
      'oct48':0,
      'oc458':0,
      'oc148':0,
      'ocaaa':0,
      'djuan':0,
      'quat2':0,
      'cpmp3':0,
      'raven':0,
      'shalo':0,
      'spens':0,
      'sonit':0,
      'sonsh':0,
      'sonpe':0,
      'irreg':0,
      'N/A':0,
    };
    
    poems.forEach(poem => new Poem(poem).getStanzas().forEach(stanza => counts[new Stanza(stanza).getRhymeScheme()]++));

    return counts;
  }

  getLineMeters() {
    /**
     * Returns an array of arrays of arrays of objects representing the meter of each line from each stanza in each poem
     */

    const meters = [];
    const poems = this.getPoems();

    poems.forEach(poem => {
      // const stanzas = new Poem(poem).getStanzas();
      // const lines = stanzas.map(stanza => new Stanza(stanza).getLines());
      // console.log("in getLineMeters, lines is",lines);
      // const meter = lines.map(line => new Line(line).getMeter());
      // meters.push(meter);
      const poemMeters = [];
      new Poem(poem).getStanzas().forEach(stanza => {
        const stanzaMeters = [];
        new Stanza(stanza).getLines().forEach(line => {
          stanzaMeters.push(new Line(line).getMeter());
        })
        poemMeters.push(stanzaMeters);
      });
      meters.push(poemMeters);
    });

    return meters;
  }

  getStanzaMeters() {
    /**
     * Returns an array of arrays of strings representing the metrical form of each stanza
     */

    return this.getPoems().map(poem => new Poem(poem).getStanzas().map(stanza => new Stanza(stanza).getMeter()));
  }

  getMeterStatsByStanza() {
    /**
     * Returns an object with the number of occurrences of each stanzaic meter.
     */
    
    const stanzaMeters = this.getPoems().map(poem => new Poem(poem).getStanzas().map(stanza => new Stanza(stanza).getMeter())).flat();
    const counts =  {
      'iambic pentameter':0,
      'alexandrines':0,
      'fourteeners':0,
      'common hymn':0,
      'long hymn':0,
      'short hymn':0,
      '8s&5s':0,
      '8s&7s':0,
      '6s&5s':0,
      'ballad':0,
      'common hymn, split':0,
      'short hymn, split':0,
      'limerick':0,
      'common particular':0,
      'common hymn, doubled':0,
      'raven':0,
      'Lady of Shalott':0,
      'N/A':0
      };

      stanzaMeters.forEach(meter => counts[meter] = meter in counts ? counts[meter] + 1 : 1);
      return counts;
  } 
}

export default Anthology;