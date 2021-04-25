import Word from './Word'

test('correctly pronounces "test" with and without rhyme', () => {
  expect(new Word("test").getPron()).toBe("T EH1 S T");
  expect(new Word("test").getPron(true)).toStrictEqual(["T EH1 S T"]);
})

test('correctly pronounces "object" two ways', () => {
  expect(new Word("object").getPron()).toStrictEqual(['AA1 B JH EH0 K T', 'AH0 B JH EH1 K T'])
})

test('handles apostrophes right', () => {
  const tis = new Word("'tis");
  const i = new Word("i'");
  expect(tis.word).toBe("'tis");
  expect(i.word).toBe("i'");
})

test('handles empty word right', () => {
  const blank = () => new Word('').word;
  expect(blank).toThrow(Error);
})

test('handles non-strings right', () => {
  const num = () => new Word(9).word;
  const bool = () => new Word(true).word;
  const nil = () => new Word(null).word;
  const arr = () => new Word([]).word;
  const obj = () => new Word({}).word;
  expect(num).toThrow(Error);
  expect(bool).toThrow(Error);
  expect(nil).toThrow(Error);
  expect(arr).toThrow(Error);
  expect(obj).toThrow(Error);
})