import React from 'react';
import Stanza from '../utils/Stanza';
import Poem from '../utils/Poem';

export const STITCH = "A stitch in time\nSaves nine.";
export const MARY = "Mary had a little lamb\nWhose fleece was white as snow\nAnd everywhere that Mary went\nThe lamb was sure to go.";
export const GRACE = "Amazing grace! (how sweet the sound)\nThat sav'd a wretch like me!\nI once was lost, but now am found,\nWas blind, but now I see.\n\n'Twas grace that taught my heart to fear,\nAnd grace my fears reliev'd;\nHow precious did that grace appear\nThe hour I first believ'd!\n\nThro' many dangers, toils, and snares,\nI have already come;\n'Tis grace hath brought me safe thus far,\nAnd grace will lead me home.\n\nThe Lord has promis'd good to me,\nHis word my hope secures;\nHe will my shield and portion be\nAs long as life endures.\n\nYes, when this flesh and heart shall fail,\nAnd mortal life shall cease;\nI shall possess, within the veil,\nA life of joy and peace.\n\nThe earth shall soon dissolve like snow,\nThe sun forbear to shine;\nBut God, who call'd me here below,\nWill be forever mine.";
export const SONNET116 = "Let me not to the marriage of true minds\nAdmit impediments. Love is not love\nWhich alters when it alteration finds,\nOr bends with the remover to remove.\nO no! it is an ever-fixèd mark\nThat looks on tempests and is never shaken;\nIt is the star to every wand'ring bark,\nWhose worth's unknown, although his height be taken.\nLove's not Time's fool, though rosy lips and cheeks\nWithin his bending sickle's compass come;\nLove alters not with his brief hours and weeks,\nBut bears it out even to the edge of doom.\nIf this be error and upon me prov'd,\nI never writ, nor no man ever lov'd.";
export const KEATS = "If by dull rhymes our English must be chained,\nAnd, like Andromeda, the Sonnet sweet\nFettered, in spite of painèd loveliness,\nLet us find out, if we must be constrained,\nSandals more interwoven and complete\nTo fit the naked foot of Poesy:\nLet us inspect the lyre, and weigh the stress\nOf every chord, and see what may be gained\nBy ear industrious, and attention meet;\nMisers of sound and syllable, no less\nThan Midas of his coinage, let us be\nJealous of dead leaves in the bay wreath crown;\nSo, if we may not let the Muse be free,\nShe will be bound with garlands of her own.";
export const DICKINSON = "The Martyr Poets–did not tell–\nBut wrought their Pang in syllable–\nThat when their mortal name be numb–\nTheir mortal fate–encourage Some–\n\nThe Martyr Painters–never spoke–\nBequeathing–rather–to their Work–\nThat when their conscious fingers cease–\nSome seek in Art–the Art of Peace–";
export const POPE = `While they ring round the same unvaried chimes,\nWith sure returns of still expected rhymes,\nWhere'er you find "the cooling western breeze,"\nIn the next line it "whispers through the trees"\nIf crystal streams "with pleasing murmurs creep"\nThe reader's threatened (not in vain) with "sleep"\nThen, at the last and only couplet fraught\nWith some unmeaning thing they call a thought,\nA needless Alexandrine ends the song\nThat, like a wounded snake drags its slow length along.`;

export const all_samples = {
  /* 'Stitch in Time': {
    title:'',
    sample: new Stanza(STITCH).getLines().map(line => <p>{line}</p>),
    toRun: STITCH,
  },*/
  /*'Mary had a little lamb': {
    title:'',
    sample: new Stanza(MARY).getLines().map(line => <p>{line}</p>),
    toRun: MARY,
  },*/

  // 'Newton': {
  //   title:'"Amazing Grace"',
  //   sample: new Poem(GRACE).getStanzas().map(stanza => (
  //     <div style={{marginBottom:'1rem'}}>
  //       {new Stanza(stanza).getLines().map(line => <p>{line}</p>)}
  //     </div>)
  //   ),
  //   toRun: GRACE,
  // },
  // 'Shakespeare':{
  //   title: 'Sonnet 116',
  //   sample: new Stanza(SONNET116).getLines().map(line => <p>{line}</p>),
  //   toRun: SONNET116,
  // },
  'Pope': {
    title:'from "Essay on Criticism"',
    sample: new Stanza(POPE).getLines().map(line => <p>{line}</p>),
    toRun: POPE,
  },
  'Keats': {
    title:'"If by dull rhymes..."',
    sample: new Stanza(KEATS).getLines().map(line => <p>{line}</p>),
    toRun: KEATS,
  },
  'Dickinson': {
    title:'"The Martyr Poets – did not tell –" (Fr665)',
    sample: new Poem(DICKINSON).getStanzas().map(stanza => (
    <div style={{marginBottom:'1rem'}}>
      {new Stanza(stanza).getLines().map(line => <p>{line}</p>)}
    </div>)
    ),
    toRun: DICKINSON,
  },
}