import * as phonstants from './phonstants';
import Word from './Word';

class Line {
  // a string that represents a line of verse
  constructor(text) {
    this.text = text.trim();
  }

  getTokens() {
    /*
     * Returns an order-preserving list of strings representing the words in the line, with punctuation removed.
     */
    let line = this.text;
    for (let i in phonstants.PUNCTS_TO_DELETE) {
      line = line.replace(new RegExp('\\' + phonstants.PUNCTS_TO_DELETE[i],'g'),'');
    }
    for (let i in phonstants.PUNCTS_TO_SPACE) {
      line = line.replace(new RegExp('\\' + phonstants.PUNCTS_TO_SPACE[i], 'g'),' ');
    }

    return line.split(' ').filter(x => x.length > 0);
  }

  getTerm(n=1) {
    /*
     * Returns a list in reverse order of the last n words in the line, where n is 1 by default.
     */
    const tokens = this.getTokens();
    let term = [];
    if (tokens.length >= n) {
      for (let i=0; i < n; i++) {
        term.push(tokens.slice(-1-i)[0]);
      }
    } else {
      for (let i=0; i<tokens.length; i++) {
        term.push(tokens.slice(-1-i)[0]);
      }
    }

    return term;
  }

  howRegular(meters) {
    /**
     * Given an array of objects like the output of Line.getMeter (foots,feet,label) for all possible pronunciations of a line with a crux,
     * returns the most likely pronunciation of the line.
     * 
     * Called by: Line.resolveCrux
     */

    // assign each possibility demerits for metrical irregularities, returning any possibility without any demerits
    const demerits = [];
    for (let meter of meters) {
      const feet = meter.feet;
      const foots = meter.foots;
      const label = meter.label;
      let demerit = 0;
      for (let f in feet) {
        if (foots[f] === 'I') {
          if (feet[f][0] <= feet[f][1]) demerit++;
          if (feet[f][1] === 4) demerit++;
          if (feet[f][0] === 1) demerit++;
          if (foots.length > f + 1 && foots[f+1] === 'T') demerit++;
        } else if (foots[f] === 'T') {
          if (feet[f][0] >= feet[f][1]) demerit++;
          if (feet[f][0] === 4) demerit++;
          if (feet[f][1] === 1) demerit++;
        } else if (foots[f] === 'U') {
          if (feet[f][0] === 1 && feet[f][1] === 1) demerit += 2;
        }
      }

      if (label.rhythm === 'iambic') {
        if (foots.includes('A')) demerit += 2;
        if (foots.includes('D')) demerit += 3;
        if (foots.includes('unstr')) demerit += 1;
        if (foots.includes('str')) demerit += 2;
        if (foots.length > 1 && foots[1] === 'T')  demerit++;
        if (foots.slice(-1)[0] === 'T')  demerit++;
        if (label.meter === 6) demerit++;
      } else if (label.rhythm === 'trochaic') {
        demerit++;
        if (foots.includes('D')) demerit++;
        if (foots.includes('A')) demerit += 2;
        if (foots.includes('I')) demerit++;
        if (foots.includes('str')) demerit++;
        if (foots.includes('unstr')) demerit += 2;
        if (foots.filter(x => x === 'T').length === foots.length) demerit -= 1; // every foot is 'T'
      } else if (label.rhythm === 'anapestic') {
        demerit++;
        if (foots.includes('D')) demerit++;
        if (foots.includes('T')) demerit++;
        if (foots.includes('D') && foots.includes('T')) demerit++;
      } else if (label.rhythm === 'dactylic') {
        demerit++;
        if (foots.includes('A')) demerit++;
        if (foots.includes('I')) demerit++;
        if (foots.includes('A') && foots.includes('I')) demerit++;
      } else if (label.rhythm === 'N/A') demerit += 2;

      if (demerit === 0) return meter;
      else {
        demerits.push([meter,demerit]);
      }
    }

    // Return the possibility with the fewest demerits
    demerits.sort((a, b) => a[1] - b[1])
    
    return demerits[0][0];
  }

  correctWeirdFeet(foots,feet) {
    /**
     * Given foots (an array of the feet in the line ['A' for anapest]) and feet (an array of ints), makes corrections to unlikely patterns, and
     * returns an array containing the corrected foots and feet (in that order)
     * 
     * Called by: Line.getMeter
     */

    // Helper function to determine equivalence between two arrays
    const equiv = (arr1, arr2) => {
      return arr1.length === arr2.length && arr1.every((v,i) => v === arr2[i])
    }
    
    // Helper function used only in this method to change feet from unlikely patterns to more likely ones
    // Given two arrays of strings: 1) for bad pattern, 2) for desired pattern
    const changeFeet = (from, to) => {
      // update foots
      const hold = foots.slice(0,-from.length);
      to.forEach(x => hold.push(x));
      foots = hold;
    
      // update feet
      const newFeet = feet.slice(0,-from.length);
      // console.log('newFeet', newFeet, '\n')
      
      let i = to.length;
      const flatFeet = feet.slice(-from.length).flat();
      const footLength = {A: 3, D: 3, I: 2, str: 1, T: 2, U: 2, unstr: 1}
      while (i > 0) {
        let thisLength = i === 1 ? footLength[to.slice(-1)] : footLength[to.slice(-i, 1 - i)[0]];
        let nextFoot = [];
        let j = 0;
        while (j < thisLength) {
          if (thisLength > 1) {
            nextFoot.push(flatFeet.shift());
          } else {
            nextFoot = flatFeet.shift();
          }
          j++;
        }
        // console.log('nextFoot', nextFoot);
        newFeet.push(nextFoot);
        // console.log('newFeet', newFeet, '\n');
        nextFoot = [];
        i--;
      }
      feet = newFeet;
    }

    // Helper function changing DTTTstr to TIIII, DTTstr to TIII, etc.
    const dumpsters = () => {
      if (equiv(foots.slice(-4), ['D','T','T','str'])) changeFeet(['D','T','T','str'], ['T','I','I','I']);
      else if (equiv(foots.slice(-5), ['D','T','T','T','str'])) changeFeet(['D','T','T','T','str'], ['T','I','I','I','I']);
      else if (equiv(foots.slice(-6), ['D','T','T','T','T','str'])) changeFeet(['D','T','T','T','T','str'], ['T','I','I','I','I','I']);
      else if (equiv(foots.slice(-4), ['A','T','T','str'])) changeFeet(['A','T','T','str'], ['U','I','I','I']);
      else if (equiv(foots.slice(-6), ['A','T','T','T','T','str'])) changeFeet(['A','T','T','T','T','str'], ['I','I','I','I','I','I']);
      else if (equiv(foots.slice(-5), ['D','U','T','T','str'])) changeFeet(['D','U','T','T','str'], ['T','I','I','I','I']);
    }
    
    if (foots.slice(-1)[0] === 'I') { // weird lines ending in 'I'
      if (equiv(foots.slice(-2), ['A','I']) && feet.slice(-2,-1)[0][0] <= feet.slice(-2,-1)[0][1]) {
        changeFeet(['A','I'],['T','T','str']);
        dumpsters();
      } else if (equiv(foots.slice(-4), ['I','A','D','I']) && feet.slice(-3,-2)[0][0] > feet.slice(-3,-2)[0][1]) {
        if (feet.slice(-3,-2)[0][2] > feet.slice(-2,-1)[0][0]) changeFeet(['I','A','D','I'], ['I','I','I','T','I']);
      } else if (equiv(foots.slice(-2), ['D','I']) && feet.slice(-2,-1)[0][2] <= feet.slice(-2,-1)[0][1]) {
        changeFeet(['D','I'], ['T','T','str']);
        dumpsters();
      } else if (equiv(foots.slice(-3), ['D','I','I'])) {
        changeFeet(['D','I','I'], ['T','T','T','str']);
        dumpsters();
      } else if (equiv(foots.slice(-4), ['D','D','U','I'])) changeFeet(['D','D','U','I'], ['T','I','I','U','I']);
      else if (equiv(foots.slice(-4), ['D','T','I','I'])) changeFeet(['D','T','I','I'], ['T','I','A','I']);
      else if (equiv(foots.slice(-4), ['D','A','I','I'])) changeFeet(['D','A','I','I'], ['T','I','I','I','I']);
    } else if (foots.slice(-1)[0] === 'T') { // weird lines ending in 'T'
      if (equiv(foots.slice(-5), ['D','T','T','T','T'])) changeFeet(['D','T','T','T','T'], ['T','I','I','I','I','unstr']);
      else if (equiv(foots.slice(-3), ['D','T','T'])) changeFeet(['D','T','T'], ['T','I','I','unstr']);
      else if (equiv(foots.slice(-3), ['I','D','T'])) changeFeet(['I','D','T'], ['I','T','I','unstr']); // may be wrong
    } else if (foots.slice(-1)[0] === 'unstr') { // weird lines ending in 'unstr'
      if (equiv(foots.slice(-3), ['T','A','unstr'])) changeFeet(['T','A','unstr'], ['T','U','T']);
      else if (equiv(foots.slice(-3), ['A','I','unstr'])) changeFeet(['A','I','unstr'], ['T','T','T']);
      else if (equiv(foots.slice(-4), ['T','D','I','unstr'])) changeFeet(['T','D','I','unstr'], ['T','T','T','T']);
      else if (equiv(foots.slice(-4), ['A','I','I','unstr'])) changeFeet(['A','I','I','unstr'], ['T','T','T','T']);
      else if (equiv(foots.slice(-4), ['D','I','I','unstr'])) changeFeet(['D','I','I','unstr'], ['T','T','T','T']);
      else if (equiv(foots.slice(-4), ['A','U','I','unstr'])) changeFeet(['A','U','I','unstr'], ['T','T','T','T']);
      else if (equiv(foots.slice(-2), ['T','unstr'])) changeFeet(['T','unstr'], ['D']);
    } else if (foots.slice(-1)[0] === 'str') { // weird lines ending in 'str'
      if (equiv(foots.slice(-3), ['I','A','str'])) changeFeet(['I','A','str'], ['I','I','I']);
      else if (equiv(foots.slice(-3), ['D','I','str']) && feet.slice(-3,-2)[0][2] < feet.slice(-2,-1)[0][0] && feet.slice(-2,-1)[0][1] < feet.slice(-1)[0]) {
        changeFeet(['D','I','str'], ['T','T','T']); 
      }
      else if (equiv(foots.slice(-4), ['T','D','I','str'])) changeFeet(['T','D','I','str'], ['T','T','T','T']);
      else if (equiv(foots.slice(-4), ['T','D','D','str'])) changeFeet(['T','D','D','str'], ['A','A','A']);
      else if (equiv(foots.slice(-3), ['I','D','str'])) changeFeet(['I','D','str'], ['I','T','I']);
      else if (equiv(foots.slice(-3), ['T','D','str'])) {
        if (feet.slice(-3,-2)[0][0] > feet.slice(-2,-1)[0][0]) changeFeet(['T','D','str'], ['A','A']);
        else changeFeet(['T','D','str'], ['T','I','I']);
      }
      else if (equiv(foots.slice(-3), ['U','D','str'])) changeFeet(['U','D','str'], ['I','T','I']);
      else if (equiv(foots.slice(-2), ['D','str'])) changeFeet(['D','str'], ['T','I']);
      else if (equiv(foots.slice(-4), ['I','A','T','str'])) changeFeet(['I','A','T','str'], ['I','I','I','I']);
      else if (equiv(foots.slice(-3), ['D','T','str'])) {
        changeFeet(['D','T','str'], ['T','I','I']);
        if (equiv(foots.slice(-4), ['D','T','I','I'])) changeFeet(['D','T','I','I'], ['T','I','A','I']);
      }
      else if (equiv(foots.slice(-4), ['A','T','T','str'])) changeFeet(['A','T','T','str'], ['I','I','I','I']);
      else if (equiv(foots.slice(-4), ['D','T','T','str'])) changeFeet(['D','T','T','str'], ['T','I','I','I']);
      else if (equiv(foots.slice(-4), ['D','U','T','T','str'])) changeFeet(['D','U','T','T','str'], ['T','I','I','I','I']);
      else if (equiv(foots.slice(-5), ['A','T','T','T','str'])) changeFeet(['A','T','T','T','str'], ['I','I','I','I','I']);
      else if (equiv(foots.slice(-6), ['A','T','T','T','T','str'])) changeFeet(['A','T','T','T','T','str'], ['I','I','I','I','I','I']);
      else if (equiv(foots.slice(-5), ['D','T','T','T','str'])) changeFeet(['D','T','T','T','str'], ['T','I','I','I','I']);
      else if (equiv(foots.slice(-6), ['D','T','T','T','T','str'])) changeFeet(['D','T','T','T','T','str'], ['T','I','I','I','I','I']);
      else if (equiv(foots.slice(-4), ['D','U','T','str'])) changeFeet(['D','U','T','str'], ['T','I','I','I']);
      else if (equiv(foots.slice(-5), ['D','T','U','T','str'])) changeFeet(['D','T','U','T','str'], ['T','I','I','I','I']);
      else if (equiv(foots.slice(-5), ['D','U','T','T','str'])) changeFeet(['D','U','T','T','str'], ['T','I','I','I','I']);
      else if (equiv(foots.slice(-5), ['D','U','U','T','str'])) changeFeet(['D','U','U','T','str'], ['T','I','I','I','I']);
      else if (equiv(foots.slice(-4), ['I','A','U','str'])) changeFeet(['I','A','U','str'], ['I','I','T','I']);
      else if (equiv(foots.slice(-5), ['I','A','U','U','str'])) changeFeet(['I','A','U','U','str'], ['I','I','U','U','I'])
      else if (equiv(foots.slice(-4), ['D','T','U','str'])) changeFeet(['D','T','U','str'], ['T','I','I','I']);
      else if (equiv(foots.slice(-5), ['D','T','T','U','str'])) changeFeet(['D','T','T','U','str'], ['T','I','I','I','I']);
      else if (equiv(foots.slice(-5), ['D','U','T','U','str'])) changeFeet(['D','U','T','U','str'], ['T','I','I','I','I']);
      else if (equiv(foots.slice(-5), ['D','T','U','U','str'])) changeFeet(['D','T','U','U','str'], ['T','I','I','I','I']);
      else if (equiv(foots.slice(-5), ['D','U','U','U','str'])) changeFeet(['D','U','U','U','str'], ['T','U','U','U','I']);
      else if (equiv(foots.slice(-4), ['D','A','A','str'])) changeFeet(['D','A','A','str'], ['T','I','I','I','I']);
    }
      // weird lines ending in A, D, U
      else if (equiv(foots.slice(-4), ['I','I','A','A'])) changeFeet(['I','I','A','A'], ['I','I','I','T','I']);
      else if (equiv(foots.slice(-2), ['T','D']) && feet.slice(-1)[0][2] < feet.slice(-1)[0][1]) {
        changeFeet(['T','D'], ['T','T','str']);
        dumpsters()
      }
      else if (equiv(foots.slice(-4), ['U','D','T','U'])) changeFeet(['U','D','T','U'], ['A','A','A']);
      else if (equiv(foots.slice(-4), ['U','D','D','U'])) changeFeet(['U','D','D','U'], ['U','T','I','I','U']);
      else if (equiv(foots.slice(-4), ['I','A','D','U'])) changeFeet(['I','A','D','U'], ['I','I','I','I','U']);

    return [foots, feet];
  }

  resolveCrux() {
    /**
     * Returns an array representing the relative stress of each syllable in the most likely pronunciation
     * of a line that has multiple possible pronunciations.
     * 
     * Calls: Word.getStressList, Line.getTokens, Line.getMeter, Line.howRegular
     * Called by: Line.getStress
     */
    
    // Get an array of arrays of ints representing the relative stress of syllables in each word in the line,
    // where multiple possible pronunciations of a word are arrays of arrays of ints, not arrays of ints
    const words = this.getTokens();
    const stresses = [];
    for (let word of words) {
      const stress = new Word(word).getStressList(true);
      stresses.push(stress);
    }

    // Get an array of all possible stressLists for the line, where each stressList is an array of one possible pron of the line

    // To start, get an array of the lengths of all the cruces in the line
    const cruxLengths = [];
    let cruxType = '';
    for (let word of stresses) {
      if (Array.isArray(word[0])) {
        cruxLengths.push(word.length);
        cruxType += word.length.toString();
      }
    }

    // A lookup table to help turn cruxLengths into stressLists
    const CRUCES = {'2':[[0],[1]], '22':[[0,0],[0,1],[1,0],[1,1]], '222':[[0,0,0],[0,0,1],[0,1,0],[0,1,1],[1,0,0],[1,0,1],[1,1,0],[1,1,1]], '2222':[[0,0,0,0],[0,0,0,1],[0,0,1,0],[0,0,1,1],[0,1,0,0],[0,1,0,1],[0,1,1,0],[0,1,1,1],[1,0,0,0],[1,0,0,1],[1,0,1,0],[1,0,1,1],[1,1,0,0],[1,1,0,1],[1,1,1,0],[1,1,1,1]], '3':[[0],[1],[2]], '23':[[0,0],[0,1],[0,2],[1,0],[1,1],[1,2]], '32':[[0,0],[0,1],[1,0],[1,1],[2,0],[2,1]], '223':[[0,0,0],[0,0,1],[0,0,2],[0,1,0],[0,1,1],[0,1,2],[1,0,0],[1,0,1],[1,0,2],[1,1,0],[1,1,1],[1,1,2]], '232':[[0,0,0],[0,0,1],[0,1,0],[0,1,1],[0,2,0],[0,2,1],[1,0,0],[1,0,1],[1,1,0],[1,1,1],[1,2,0],[1,2,1]], '322':[[0,0,0],[0,0,1],[0,1,0],[0,1,1],[1,0,0],[1,0,1],[1,1,0],[1,1,1],[2,0,0],[2,0,1],[2,1,0],[2,1,1]], '4':[[0],[1],[2],[3]], '24':[[0,0],[0,1],[0,2],[0,3],[1,0],[1,1],[1,2],[1,3]], '42':[[0,0],[0,1],[1,0],[1,1],[2,0],[2,1],[3,0],[3,1]]}

    let j = 0;
    const stressList = [];
    let hold = [];
    while (stressList.length < CRUCES[cruxType].length) {
      for (let word of stresses) {
        if (Number.isInteger(word[0])) hold.push(word);
        else if (Array.isArray(word[0])) {
          hold.push(word[CRUCES[cruxType][Math.floor(j/cruxLengths.length)][j % cruxLengths.length]]);
          j++
        }
      }

      stressList.push(hold);
      hold = [];
    }

    // Get the meter of each array in stressList
    const lines = []
    for (let arr of stressList) {
      const line = [];
      for (let word of arr) {
        for (let syll of word) {
          line.push(syll);
        }
      }
      lines.push(line);
    }

    const meters = [];
    for (let line of lines) {
      const meter = this.getMeter(line);
      meters.push(meter);
    }

    // Decide which pronunciation is most likely
    const best = this.howRegular(meters);

    return best;
  }

  getStress() {
    /**
     * Returns an array representing the relative stress of each syllable in the line,
     * where each syllable is represented by a string number between 1 and 4.
     * 
     * Calls: Word.getStressList, Line.resolveCrux, Line.getTokens
     * Called by: Line.getMeter
     */
    const words = this.getTokens();
    let stresses = [];
    for (let word of words) {
      const stress = new Word(word).getStressList();
      if (stress === 'crux') return this.resolveCrux();
      stresses = stresses.concat(stress);
    }

    Word.last.push('newline');

    return stresses;
  }

  getLabel(foots,feet) {
    /**
     * Given foots (an array of the feet in the line ['A' for anapest]) and feet (an array of arrays of ints), returns
     * an object representing the best guess about how the meter in the line should be named
     * 
     * The returned object has three fields:
     * rhythm: a string like 'iambic'
     * meter: an int like 5
     * catalexis: a boolean
     * 
     * Called by: Line.getMeter
     */

    // Initialize beginning values
    let rhythm = 'N/A';
    let meter = 0;
    let catalexis = false;

    // count how many of which foots are present
    const ftCts = {I: 0, T: 0, A: 0, D: 0, U: 0, str: 0, unstr: 0}
    for (let ped of foots) {
      if (ped in ftCts) {
        ftCts[ped]++;
      }
    }
    const totalFeet = ftCts['I'] + ftCts['T'] + ftCts['A'] + ftCts['D'] + ftCts['U'] + ftCts['str'] + ftCts['unstr'];

    if (ftCts['I'] > ftCts['T'] && ftCts['I'] > ftCts['A'] && ftCts['I'] > ftCts['D']) { // iambic 
      rhythm = 'iambic';
      meter = totalFeet;
      if (ftCts['unstr'] === 1) {
        catalexis = true;
      } else if (ftCts['str'] === 1) catalexis = true;
    } else if (ftCts['T'] > ftCts['I'] && ftCts['T'] > ftCts['A'] && ftCts['T'] > ftCts['D']) { // trochaic
      rhythm = 'trochaic';
      meter = totalFeet;
      if (ftCts['str'] === 1) catalexis = true;
    } else if (ftCts['A'] > ftCts['I'] && ftCts['A'] > ftCts['T'] && ftCts['A'] > ftCts['D']) { // anapestic 
      rhythm = 'anapestic';
      meter = totalFeet;
    } else if (ftCts['D'] > ftCts['I'] && ftCts['D'] > ftCts['T'] && ftCts['D'] > ftCts['A']) { // dactylic
      rhythm = 'dactylic';
      meter = totalFeet;
    } else if (ftCts['I'] > ftCts['T'] && ftCts['I'] === ftCts['A'] && ftCts['D'] === 0) { // iambs and anapests
      rhythm = 'anapestic';
      meter = totalFeet;
    } else if (ftCts['T'] > ftCts['I'] && ftCts['T'] === ftCts['D'] && ftCts['A'] === 0) { // trochees and dactyls
      rhythm = 'dactylic';
      meter = totalFeet;
      if (ftCts['str'] === 1) catalexis = true;
    } else if (ftCts['T'] === ftCts['I'] && foots[0] === 'T' && ftCts['U'] > 0) { // trochaic inversion with unknowns
      rhythm = 'iambic';
      meter = totalFeet;
      if (ftCts['unstr'] === 1) {
        catalexis = true;
      } else if (ftCts['str'] === 1) catalexis = true;
    } else if (ftCts['T'] === ftCts['I'] && ftCts['T'] > 0) { // trochees and iambs
      if (foots[0] === 'T' && foots.length === 2) {
        rhythm = 'iambic';
        meter = 2;
      }
      if (foots[0] === 'I' || foots.slice(-1)[0] === 'I') {
        rhythm = 'iambic';
        meter = foots.length;
      } else if (foots.slice(-1)[0] === 'T' || foots.slice(-1)[0] === 'str') {
        rhythm = 'trochaic';
        meter = foots.length;
        catalexis = foots.slice(-1)[0] === 'str';
      }
    } else {
      meter = totalFeet;
      if (foots.slice(-1)[0] === 'unstr') meter++;
    }

    return {rhythm, meter, catalexis};
  }

  getMeterLabelPhrase() {
    /**
     * Returns a human-readable string that labels a line's meter (e.g., "iambic tetrameter catalectic")
     */
    const meter = this.getMeter().label;
    return meter.rhythm + " " + phonstants.METER_NAMES[meter.meter] + (meter.catalexis ? " catalectic" : "");
  }

  getMeter(crux=false) {
    /**
     * Returns an object with three descriptions of the line's meter:
     * label: an object representing a label for the line's meter (e.g., {rhythm: "iambic", meter:5, catalexis:false})
     * foots: an array of one-letter strings representing each foot in the line (e.g., ['U','I','I'])
     * feet: an array of arrays of integers representing the relative stress of each syllable in each foot in the line (e.g., [[2, 2], [1, 4], [3,2]])
     * 
     * If crux is not false, it is a stressList from resolveCrux.
     * 
     * Calls: Line.getStress, Line.correctWeirdFeet, Line.getLabel
     * Called by: Line.getMarkString
     */

    // Helper function for adding a foot, used only in this method
    const addFoot = type => {
      switch(type) {
        case 'A':
          feet.push([raw[0], raw[1], raw[2]]);
          foots.push('A');
          raw = raw.slice(3);
          break;
        case 'D':
          feet.push([raw[0], raw[1], raw[2]]);
          foots.push('D');
          raw = raw.slice(3);
          break;
        case 'I':
          feet.push([raw[0], raw[1]]);
          foots.push('I');
          raw = raw.slice(2);
          break;
        case 'T':
          feet.push([raw[0], raw[1]]);
          foots.push('T');
          raw = raw.slice(2);
          break;
        case 'U':
          feet.push([raw[0], raw[1]]);
          foots.push('U');
          raw = raw.slice(2);
          break;
        default:
          break;
      }
    }

    // Handle special cases
    let raw;
    if (!crux) {
      raw = this.getStress();
    }
    else {
      if (Number.isInteger(crux[0])) {
        raw = crux;
      } else if (Array.isArray(crux[0])) return crux;
    }

    // I think this is used when Line.resolveCrux calls this method, but I'm not sure (adapted from last version)
    if ('label' in raw && 'foots' in raw && 'feet' in raw && typeof raw.label.catalexis === 'boolean') return raw;

    // console.log("raw:", raw);

    // Divide the line into metrical feet based on syllables' relative stress and position
    let feet = [];
    let foots = [];
    // const syl = 0;
    while (2 < raw.length) {
      if (raw[0] > raw[1]) { // rising (I or A)
        if (raw[1] > raw[2]) { // anapest
          addFoot('A');
        } else if (raw[1] < raw[2] || raw[1] === raw[2]) { // iamb
          addFoot('I');
        }
      } else if (raw[0] < raw[1]) { // falling (T or D)
        if (raw[1] < raw[2]) { // dactyl
          addFoot('D');
        } else if (raw[1] > raw[2]) {
          if (raw[2] < 3) { // trochee
            addFoot('T');
          } else { // dactyl
            addFoot('D');
          }
        } else if (raw[1] === raw[2]) { // dactyl
          addFoot('D');
        }
      } else if (raw[0] === raw[1]) { // anapest or unknown
        if (raw[1] <= raw[2]) { // unknown
          addFoot('U');
        } else if (raw[1] > raw[2]) { // anapest 
          addFoot('A');
        }
      }
    }

    // Handle the last foot/syllable
    if (raw.length > 1) {
      feet.push([raw[0], raw[1]]);
      if (raw[0] > raw[1]) { // final iamb
        foots.push('I');
      } else if (raw[0] < raw[1]) { // final trochee
        foots.push('T');
      } else if (raw[0] === raw[1]) { // final unknown foot
        foots.push('U');
      }
    } else if (raw.length === 1) {
      feet.push(raw[0]);
      foots.push(raw[0] < 3 ? 'str' : 'unstr');
    }

    // Make some corrections
    // console.log("going to correctWeirdFeet with foots:",foots);
    const corrected = this.correctWeirdFeet(foots, feet);
    foots = corrected[0];
    feet = corrected[1];
    // console.log("back from correctWeirdFeet with foots:", foots);

    // Get a label for this line's meter
    const label = this.getLabel(foots, feet);

    // Correct for pyrrhic substitution
    for (let f in foots) {
      if (feet[f] === [3,3] && (foots[f] === 'U' || foots[f] === 'I')) {
        foots[f] = 'P';
      }
    }

    if (this.text.includes("spirit")) console.log(foots,feet);

    return {feet, foots, label};
  }

  equalizeVowels(wrd, sylCount, vowCount, stressList) {
    /**
     * Given a string representing a word from a line, an int representing the number of syllables in the word,
     * an int representing the number of vowels in the line, and an array of ints representing the relative stress of each syl,
     * Returns an object with data about the word's vowels:
     * sylCount: the number of syllables in the word's pronunciation
     * vowCount: the number of pronounced vowels in the word's spelling // should equal sylCount
     * diphCount: the number of digrams pronounced as a single vowel
     * toRemove: an array of the positions in the word's spelling that have vowels that seem like they're elided
     * 
     * Called by: Line.getLinesVowels()
     */
    
    // console.log("in equalizeVowels with wrd",wrd,"sylCount",sylCount,"vowCount",vowCount,"stressList",stressList)
    const triphs = ['eye', 'eau', 'owe'];
    let word = wrd.replace("'","").toLowerCase();
    word = wrd.replace("’","");
    let diphCount = 0;
    let silentEs = 0;
    let toRemove = [];

    // check for a few problematic words with hard-coded solutions
    if (word === 'bounteous' && stressList.length === 2) return {sylCount:2, vowCount:2, diphCount:0, toRemove:[2,5,7]};
    else if (word === 'beauteous' && stressList.length === 2) return {sylCount:2, vowCount:2, diphCount:0, toRemove:[2,3,5,7]};
    else if (word === 'antique') return {sylCount:2, vowCount:2, diphCount:0, toRemove:[5,6]};
    else if (word === 'away') return {sylCount:2, vowCount:2, diphCount:1, toRemove:[]};

    if (word.includes('qu')) {
      diphCount++;
      vowCount--;
      word = word.slice(0,word.indexOf('qu') + 1) + word.slice(word.indexOf('qu') + 2)
    }

    if (sylCount !== vowCount) { // try to find out which vowels aren't being pronounced as a syllable
      if (word.slice(-1) === 'e') {
        if (word.slice(-2,-1) !== 'r' && word.slice(-2,-1) !== 'l') { // found a silent 'e'
          silentEs++;
          vowCount--;
          word = word.slice(0,-1);
          const eq = this.equalizeVowels(word, sylCount, vowCount, stressList);
          sylCount = eq.sylCount;
          vowCount = eq.vowCount;
          diphCount += eq.diphCount;
          silentEs += eq.silentEs;
          toRemove = eq.toRemove;
        } else { // word ends in 're' or 'le'
          if (!(word.slice(-3,-2) in phonstants.SHORT_VOWELS)) { // exception for 'trouble,' 'meagre,' and the like
            Object.keys(phonstants.DIGRAPHS).forEach(digraph => {
              if (word.includes(digraph)) {
                diphCount++;
                vowCount--;
                word = word.slice(0, word.indexOf(digraph) + 1) + word.slice(word.indexOf(digraph) + 2);
                const eq = this.equalizeVowels(word, sylCount, vowCount, stressList);
                sylCount = eq.sylCount;
                vowCount = eq.vowCount;
                diphCount += eq.diphCount;
                silentEs += eq.silentEs;
                toRemove = eq.toRemove;
              }
            })
          } else { // found a silent 'e'
            silentEs++;
            vowCount--;
            word = word.slice(0,-1);
            const eq = this.equalizeVowels(word, sylCount, vowCount, stressList);
            sylCount = eq.sylCount;
            vowCount = eq.vowCount;
            diphCount += eq.diphCount;
            silentEs += eq.silentEs;
            toRemove = eq.toRemove;
          }
        }
      } else if (word.slice(-3) === 'ies' || word.slice(-3) === 'ied') {
        silentEs++;
        vowCount--;
        word = word.slice(0,-2) + word.slice(-1);
        const eq = this.equalizeVowels(word, sylCount, vowCount, stressList);
        sylCount = eq.sylCount;
        vowCount = eq.vowCount;
        diphCount += eq.diphCount;
        silentEs += eq.silentEs;
        toRemove = eq.toRemove;
      } else if (sylCount !== vowCount) { // check for trigraphs and digraphs
        triphs.forEach(triph => {
          if (word.includes(triph)) {
            vowCount -= 2;
            word = word.slice(0,word.indexOf(triph) + 1) + word.slice(word.indexOf(triph) + 3);
            const equalized = this.equalizeVowels(word, sylCount, vowCount, stressList);
            sylCount = equalized.sylCount;
            vowCount = equalized.vowCount;
            diphCount += equalized.diphCount;
            silentEs += equalized.silentEs;
            toRemove = equalized.toRemove;
            toRemove.push(word.indexOf(triph) + 3);
            toRemove.push(word.indexOf(triph) + 4);
          }
        })
        Object.keys(phonstants.DIGRAPHS).forEach(digraph => {
          if (word.includes(digraph)) {
            diphCount++;
            vowCount--;
            word = word.slice(0, word.indexOf(digraph) + 1) + word.slice(word.indexOf(digraph) + 2);
            const eq = this.equalizeVowels(word, sylCount, vowCount, stressList);
            sylCount = eq.sylCount;
            vowCount = eq.vowCount;
            diphCount += eq.diphCount;
            silentEs += eq.silentEs;
            toRemove = eq.toRemove;
          }
        })
      }
      if (sylCount !== vowCount && word.slice(-2) === 'ed') {
        if (!(word.slice(-3, -2) in phonstants.SHORT_VOWELS)) {
          silentEs++;
          vowCount--;
          word = word.slice(0,-2) + word.slice(-1);
          const eq = this.equalizeVowels(word, sylCount, vowCount, stressList);
          sylCount = eq.sylCount;
          vowCount = eq.vowCount;
          diphCount += eq.diphCount;
          silentEs += eq.silentEs;
          toRemove = eq.toRemove;
        } else if (word.slice(-3, -2) === 'i') {
          silentEs++;
          vowCount--;
          word = word.slice(0,-3) + word.slice(-2);
          const eq = this.equalizeVowels(word, sylCount, vowCount, stressList);
          sylCount = eq.sylCount;
          vowCount = eq.vowCount;
          diphCount += eq.diphCount;
          silentEs += eq.silentEs;
          toRemove = eq.toRemove;
        }
      } else if (sylCount !== vowCount && word.slice(-2) === 'es') {
        if (!(word.slice(-3,-2) in phonstants.SHORT_VOWELS)) {
          silentEs++;
          vowCount--;
          word = word.slice(0,-2) + word.slice(-1);
          const eq = this.equalizeVowels(word, sylCount, vowCount, stressList);
          sylCount = eq.sylCount;
          vowCount = eq.vowCount;
          diphCount += eq.diphCount;
          silentEs += eq.silentEs;
          toRemove = eq.toRemove;
        } else if (word.slice(-3,-2) === 'i') {
          silentEs++;
          vowCount--;
          word = word.slice(0,-3) + word.slice(-2);
          const eq = this.equalizeVowels(word, sylCount, vowCount, stressList);
          sylCount = eq.sylCount;
          vowCount = eq.vowCount;
          diphCount += eq.diphCount;
          silentEs += eq.silentEs;
          toRemove = eq.toRemove;
        }
      }
    }

    // check for vowels that might be elided
    if (stressList && vowCount > sylCount) {
      let elided = false;
      if (stressList.every((v,i) => v === [1,4][i])) { // stressList is [1,4] like power => pow'r, so elide the second vowel
        elided = 2;
      } else if (stressList.every((v,i) => v === [4,1,4][i]) && stressList.length === 3) { // stressList is [4,1,4]
        elided = 3;
      } else if (stressList.every((v,i) => v === [2,1,4][i]) && stressList.length === 3) elided = 3;
        else if (stressList.every((v,i) => v === [1,4,2][i]) && stressList.length === 3) elided = 2;
        else if (stressList.length === 1 && stressList[0] === 2 && word[word.length - 1] === 'y') { // for monosyllabic many
          toRemove.push(word.length - 1);
          word = word.slice(0,-1);
          vowCount--;
        } else if (stressList.length === 1 && stressList[0] === 2 && word.slice(-2,-1)[0] === 'e') {
          console.log("I'm doing something risky and cutting an e out of",word)
          toRemove.push(word.length - 2)
          word = word.slice(0,-2) + word.slice(-1);
          vowCount--;
        }
      
      if (elided) {
        let vows = 0;
        let pos = 0;
        while (vows < elided) {
          if (word[pos] in phonstants.SHORT_VOWELS) {
            vows++;
          }
          pos++;
        }

        pos--;
        toRemove.push(pos);
      }
    }

    // console.log("leaving equalizeVowels with",word,"sylCount",sylCount,"diphCount",diphCount,"silentEs",silentEs,"toRemove",toRemove)

    return {sylCount, vowCount, diphCount, silentEs, toRemove};
  }

  getLinesVowels() {
    /**
     * Returns an object containing 1) 'word': a string representing a word from the line, and
     * 2) 'posList': an array of ints representing the positions in that word where there's a pronounced vowel
     * 
     * based on get_syllables_for from 5 Scansioner
     * 
     * Calls: Line.equalizeVowels
     * Called by: Line.getMarkString
     */

    // Helper function used only in this method
    const vowelCount = word => {
      let count = word.toLowerCase()[0] === 'y' ? -1 : 0;
      
      for (let char of word.toLowerCase()) {
        if (char in phonstants.LONG_VOWELS || char === 'è') {
          count++;
        }
      }

      return count;
    }

    const words = this.getTokens();
    let flatFeet = this.getMeter().feet.flat();

    const lineList = words.map(word => {
      const stressList = new Word(word).getStressList(true);
      let numSyls;

      // get sylCount by checking which pron of the word is being used in this line
      if (Array.isArray(stressList[0])) { // word is a crux
        for (let pron of stressList) {
          if (flatFeet.slice(0, pron.length).every((v,i) => v === pron[i])) {
            numSyls = pron.length;
            var bestPron = pron;
          }
        }
      } else {
        numSyls = stressList.length;
        bestPron = stressList;
      }
      flatFeet = flatFeet.slice(bestPron.length);
      const vowCount = vowelCount(word);
      const match = this.equalizeVowels(word, numSyls, vowCount, bestPron);
      match.text = word;
      match.pron = bestPron;
      return match;
    });

    // console.log(`lineList: `, lineList);
    
    const output = lineList.map(word => {
      // make posList, an array of the position of every vowel in the word except those in toRemove
      let posList = word.text.split('').map((char,ind) => {
        if (char.toLowerCase() in phonstants.LONG_VOWELS && !(word.toRemove.includes(ind))) {
          if (!(ind === 0 && char === 'y')) { // XOR
            return ind;
          }
        }
      }).filter(x => x !== undefined);

      // remove silentEs from posList
      if (word.silentEs > 0 && word.text[posList.slice(-1)[0]] === 'e') { // if the word has an e as its last vowel, remove it from posList
        posList = posList.slice(0,-1);
        word.silentEs--;
      }

      // remove the second vowel of co-syllabic digraphs from posList
      while (word.diphCount > 0) {
        let i = 0;
        while (i+1 < posList.length) {
          if (posList[i] + 1 === posList[i+1]) { // adjacent vowels
            // shift which vowel gets marked if diphthong follows a 'q'
            if (word.text[posList[i]] === 'u' && word.text[posList[i] - 1].toLowerCase() === 'q') {
              posList.splice(i, 1);
              word.diphCount--;
            } else {
              posList.splice(i+1, 1);
              word.diphCount--;
            }
          }
          i++;
        }
      }

      return {word: word.text, posList: posList}
    })

    return output;
  }

  getMarkString() {
    /**
     * Returns a string representing with symbols the stress of each syllable in the line
     * 
     * Calls: Line.getMeter, Line.getLinesVowels
     */

    const meter = this.getMeter();
    const foots = meter.foots;
    const linesList = this.getLinesVowels();
    const markList = [];
    const nbsp = ' ';
    
    // an array of the position of each punctuation mark in the line
    const punctPos = this.text.split('').map((v,i) => phonstants.ALPHAPLUS.includes(v.toLowerCase()) ? null :  i).filter(x => x !== null);
    let syll = 0;
    let foot = 0;
    linesList.forEach(word => {
      let lastPos = 0;
      word.posList.forEach(pos => {
        let pos1 = pos - lastPos;
        markList.push(nbsp.repeat(pos1));

        switch(foots[foot]) {
          case 'A':
            if (syll === 0 || syll === 1) {
              markList.push(phonstants.NONICTUS);
              syll++;
            } else if (syll === 2) {
              markList.push(phonstants.ICTUS);
              syll = 0;
              foot++;
            }
            break;
          case 'D':
            if (syll === 0) {
              markList.push(phonstants.ICTUS);
              syll++;
            } else if (syll === 1) {
              markList.push(phonstants.NONICTUS);
              syll++;
            } else if (syll === 2) {
              markList.push(phonstants.NONICTUS);
              syll = 0;
              foot++;
            }
            break;
          case 'I':
            if (syll === 0) {
              markList.push(phonstants.NONICTUS);
              syll++;
            } else if (syll === 1) {
              markList.push(phonstants.ICTUS);
              syll = 0;
              foot++;
            }
            break;
          case 'P':
            if (syll === 0) {
              markList.push(phonstants.NONICTUS);
              syll++;
            } else if (syll === 1) {
              markList.push(phonstants.NONICTUS);
              syll = 0;
              foot++;
            }
            break;
          case 'T':
            if (syll === 0) {
              markList.push(phonstants.ICTUS);
              syll++;
            } else if (syll === 1) {
              markList.push(phonstants.NONICTUS);
              syll = 0;
              foot++;
            }
            break;
          case 'U':
            if (syll === 0) {
              markList.push(phonstants.UNCERTAIN_ICTUS);
              syll++;
            } else if (syll === 1) {
              if (meter.label.rhythm === 'iambic') markList.push(phonstants.ICTUS); // show unknown feet as iambs in an iambic line
              else markList.push(phonstants.UNCERTAIN_ICTUS);
              syll = 0;
              foot++;
            }
            break;
          case 'str':
            markList.push(phonstants.ICTUS);
            break;
          case 'unstr':
            markList.push(phonstants.NONICTUS);
            break;
          default:
            break;
        }
        lastPos = pos + 1;
      })
      if (word.posList.length === 0) markList.push(nbsp.repeat(word.word.length + 1));
      else markList.push(nbsp.repeat(word.word.length - word.posList.slice(-1)[0]));
    })
    let finalMarkList = markList.join('').split('');

    punctPos.forEach(punct => {
      finalMarkList.splice(punct, 0, nbsp);
    })

    const marks = finalMarkList.join(``);

    return marks;
  }
}

export default Line;