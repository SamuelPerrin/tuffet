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
        meter += 1;
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
        meter += 1;
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

  getMeter(crux=false) {
    /**
     * Returns an object with three descriptions of the line's meter:
     * label: a string representing a label for the line's meter (e.g., "")
     * foots: an array of one-letter strings representing each foot in the line (e.g., ['U','I','I'])
     * feet: an array of integers representing the relative stress of each syllable in the line (e.g., [2,2,1,4,3,2])
     * 
     * If crux is not false, it is a stressList from resolveCrux.
     * 
     * Calls: Line.getStress, Line.correctWeirdFeet, Line.getLabel
     * Called by:
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
    if ('foots' in raw && 'feet' in raw && typeof raw.catalexis === 'boolean') return raw;

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
    const corrected = this.correctWeirdFeet(foots, feet);
    foots = corrected[0];
    feet = corrected[1];

    // Get a label for this line's meter
    const label = this.getLabel(foots, feet);

    // Correct for pyrrhic substitution
    for (let f in foots) {
      if (feet[f] === [3,3] && (foots[f] === 'U' || foots[f] === 'I')) {
        foots[f] = 'P';
      }
    }

    return {feet, foots, label};
  }
}

export default Line;