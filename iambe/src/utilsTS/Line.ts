import * as phonstants from './phonstants';
import Word from '../utils/Word';

/**
 * A line of verse
 */
export default class Line {
  text: string = "";

  constructor(text: string) {
    this.text = text.trim();
  }

  /**
   * Returns an order-preserving list of strings representing the words in the line, with punctuation removed
   */
  getTokens(): string[] {
    let line = this.text;

    // remove some punctuation marks, and replace others with a space
    phonstants.PUNCTS_TO_DELETE.forEach(p => line = line.replace(new RegExp('\\' + p, 'g'), ''));
    phonstants.PUNCTS_TO_SPACE.forEach(p => line = line.replace(new RegExp('\\' + p, 'g'), ' '));

    return line.split(' ').filter(token => token.length > 0);
  }

  /**
   * Returns a list in reverse order of the last n words in the line, where n is 1 by default
   * @param wordsToReturn the number of words to return
   */
  getTerm(wordsToReturn = 1): string[] {
    const tokens = this.getTokens();
    let terms = [];

    if (tokens.length >= wordsToReturn) {
      for (let i = 0; i < wordsToReturn; i++) {
        terms.push(tokens.slice(-1 - i)[0]);
      }
    } else {
      for (let i = 0; i < tokens.length; i++) {
        terms.push(tokens.slice(-1 - i)[0]);
      }
    }

    return terms;
  }

  /**
   * Get an array representing the relative stress of each syllable in the line,
   * where each syllable is represented by a string numeral between 1 and 4.
   */
  getStresses(): string[] {
    return [];
  }
}