import Poem from './Poem';

test('constructor sets text attribute', () => {
  const mouse = new Poem("Me up at does\nout of the floor\nquietly Stare\na poisoned mouse\n\nstill who alive\nis asking What\nhave i done that\nYou wouldn't have");
  expect(mouse.text).toBe("Me up at does\nout of the floor\nquietly Stare\na poisoned mouse\n\nstill who alive\nis asking What\nhave i done that\nYou wouldn't have");
})

test('getStanzas splits poem into a list', () => {
  const mouse = new Poem("Me up at does\nout of the floor\nquietly Stare\na poisoned mouse\n\nstill who alive\nis asking What\nhave i done that\nYou wouldn't have");
  expect(mouse.getStanzas()).toStrictEqual(["Me up at does\nout of the floor\nquietly Stare\na poisoned mouse","still who alive\nis asking What\nhave i done that\nYou wouldn't have"]);
})