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
  const ratio = new Poem("As by the dead we love to sit\nBecome so wondrous dear\nAs for the lost we grapple\nThough all the rest are here\n\nIn broken mathematics\nWe estimate our prize\nVast in its fading ratio\nTo our penurious eyes");
  expect(ratio.getRhymes()).toStrictEqual([[{lines:["Become so wondrous dear","Though all the rest are here"], words:["dear","here"], rt:'full rhyme'}], [{lines:["We estimate our prize","To our penurious eyes"], words:["prize","eyes"], rt:'full rhyme'}]])
})

test('getPoemMeter identifies a poem in which every stanza has the same meter', () => {
  const dickinson = new Poem("As if I asked a common alms–\nAnd in my wandering hand,\nA stranger pressed a kingdom–\nAnd I–bewildered stand–\n\nAs if I asked the Orient\nHad it for me a morn?\nAnd it sh'd lift its purple dikes\nAnd flood me with the Dawn!");
  expect(dickinson.getPoemMeter()).toBe('common meter');
})

test('getPoemMeter identifies a poem in which stanzas have different meters', () => {
  const problem = new Poem("Low at my problem bending,\nAnother problem comes–\nLarger than mine–serener–\nInvolving statelier sums.\n\nI check my busy pencil–\nMy figures file away–\nWherefore, my baffled fingers\nThy perplexity?");
  expect(problem.getPoemMeter()).toBe("N/A");
})

test('getMeters identifies the meter of short stanzas', () => {
  const prose = new Poem(`They shut me up in Prose–\nAs when a little Girl\nThey put me in the Closet–\nBecause they liked me "still"–\n\nStill! Could themself have peeped–\nAnd seen my Brain–go round–\nThey might as wise have lodged a Bird\nFor Treason–in the Pound–`);
  expect(prose.getMeters()).toStrictEqual(['short meter','short meter']);
})

