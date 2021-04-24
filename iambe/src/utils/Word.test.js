import Word from './Word'

test('correctly pronounces "test"', () => {
  expect(new Word("test").getPron()).toBe("T EH1 S T");
})