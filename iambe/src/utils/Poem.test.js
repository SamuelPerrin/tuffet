import Poem from './Poem';

test('constructor sets text attribute', () => {
  const mouse = new Poem("Me up at does\nout of the floor\nquietly Stare\na poisoned mouse\n\nstill who alive\nis asking What\nhave i done that\nYou wouldn't have");
  expect(mouse.text).toBe("Me up at does\nout of the floor\nquietly Stare\na poisoned mouse\n\nstill who alive\nis asking What\nhave i done that\nYou wouldn't have");
})

test('getStanzas splits poem into a list', () => {
  const mouse = new Poem("Me up at does\nout of the floor\nquietly Stare\na poisoned mouse\n\nstill who alive\nis asking What\nhave i done that\nYou wouldn't have");
  expect(mouse.getStanzas()).toStrictEqual(["Me up at does\nout of the floor\nquietly Stare\na poisoned mouse","still who alive\nis asking What\nhave i done that\nYou wouldn't have"]);
})

test('getRhymes returns a list of rhyme objects from each stanza', () => {
  const alms = new Poem("As by the dead we love to sit\nBecome so wondrous dear\nAs for the lost we grapple\nThough all the rest are here\n\nIn broken mathematics\nWe estimate our prize\nVast in its fading ratio\nTo our penurious eyes");
  expect(alms.getRhymes()).toStrictEqual([[{lines:["Become so wondrous dear","Though all the rest are here"], words:["dear","here"], rt:'full rhyme'}], [{lines:["We estimate our prize","To our penurious eyes"], words:["prize","eyes"], rt:'full rhyme'}]])
})