import React from 'react';

export const STANZA_METER_DESCRIPTIONS = {
  'iambic pentameter': <div className='paragraph'>
    <p><strong>Iambic pentameter</strong> consists of five metrical feet with ten syllables with rising rhythm. In its most standard form, it consists of five iambs (da Dum da Dum da Dum da Dum da Dum), but several variations are also common, including an eleventh unstressed syllable. Iambic pentameter is probably the most important poetic meter in the history of English poetry. Everyone from Chaucer to Shakespeare and from Milton to Wordsworth wrote much of their verse in this meter. It is highly flexible, supporting lyrical and narrative verse, sonnet and epic.</p>
    <p>The English pentameter is likely a descendant of the Italian hendecasyllable, a line of eleven syllables used by Dante and Petrarch. Chaucer adapted this line to English, which doesn't have as many weak endings as Italian, resulting in a line of ten syllables.</p>
    <p>When iambic pentameter is unrhymed, it is called <strong>blank meter</strong>. When it is rhymed in couplets, it is called <strong>heroic couplets</strong>. Iambic pentameter is the meter normally used in the sonnet, a rhymed stanza of fourteen lines.</p>
  </div>,
  'alexandrines': <div className='paragraph'>
    <p>In English verse, <strong>alexandrine</strong> is the name given to iambic hexameter, which consists of six metrical feet with twelve syllables in rising rhythm (da Dum da Dum da Dum da Dum da Dum da Dum), often with caesura after the sixth syllable. The most common stanza form for alexandrines is rhymed couplets. This form comes from the medieval French form of the same name.</p>
  </div>,
  'fourteeners': <div className='paragraph'>
    <p><strong>Fourteeners</strong> are couplets of (usually rhymed) iambic heptameter, which consists of seven metrical feet with fourteen syllables in rising rhythm (da Dum da Dum da Dum da Dum da Dum da Dum da Dum), often with caesura after the eighth syllable. When divided at the their caesura, two rhymed fourteeners make a common meter quatrain.</p>
  </div>,
  'common hymn': <div className='paragraph'>
    <p>The <strong>common hymn</strong> (8.6.8.6), sometimes called <strong>common meter</strong>, is a quatrain in which the first and third lines are iambic tetrameter and the second and fourth lines are iambic trimeter. Common meter is familiar from Christian hymns like John Newton’s “Amazing Grace”, Isaac Watts’s “Joy to the World”, and the Christmas carol “O Little Town of Bethlehem”. It was also the favorite form of Emily Dickinson. When a common meter quatrain is collapsed down to a rhyming couplet with fourteen syllables in each line, the resulting verse form is called fourteeners.</p>
    <p>Common meter is related to the English ballad, which also features alternating lines with four and three stressed syllables. The ballad is more flexible than common meter proper, allowing for headless lines, anapestic substitution, and the like.</p>
  </div>,
  'long hymn': <div className='paragraph'>
    <p><strong>Long meter</strong> (8.8.8.8) is a quatrain of iambic tetrameter, in which each line has eight syllables arranged in four metrical feet with rising rhythm (da Dum da Dum da Dum da Dum). Long meter's name is derived from the fact that its second and fourth lines are longer than they would be in common meter. Like common meter and short meter, long meter was popular for hymns, yielding classics like Isaac Watts's "When I Survey the Wondrous Cross". It is also used throughout Alfred Lord Tennyson's book-length poem, <em>In Memoriam A.H.H.</em>.</p>
  </div>,
  'short hymn': <div className='paragraph'>
    <p><strong>Short meter</strong> (6.6.8.6) is a quatrain in of iambic trimeter in which the third line is iambic tetrameter. Short meter is short as compared to common meter, in which the first line is one foot longer. Like common meter and long meter, short meter was a popular hymn meter, used in such hymns as "Blest Be the Tie that Binds".</p>
    <p>When short meter is collapsed into a rhyming couplet with twelve syllables in the first line and fourteen in the second, it is known as <em>poulter's measure</em>, since a poulter—who sold eggs—sometimes gave twelve in a dozen and sometimes fourteen (compare the term <em>baker's dozen</em>, which has a similar origin).</p>
  </div>,
  '8s&5s': <div className='paragraph'>
    <p><strong>Eights and Fives</strong> (8.5.8.5) is a quatrain alternating lines of trochaic tetrameter (with eight syllables) and trochaic trimeter catalectic (with five). It can be thought of as the trochaic equivalent of the iambic common meter. It is used in some hymns and is the favorite trochaic meter of Emily Dickinson.</p>
  </div>,
  '8s&7s': <div className='paragraph'>
    <p><strong>Eights and Sevens</strong> (8.7.8.7) is a quatrain alternating lines of trochaic tetrameter (with eight syllables) and trochaic tetrameter catalectic (with seven). It was used primarily as a hymn meter, producing "Come Thou Fount of Every Blessing" and Charles Wesley's "Loves Divine, All Loves Excelling".</p>
  </div>,
  '6s&5s':<div className='paragraph'>
    <p><strong>Sixes and Fives</strong> (6.5.6.5) is a quatrain alternating lines of trochaic trimeter (with six syllables) and trochaic trimeter catalectic (with five). It is sometimes used for hymns, including "Onward, Christian Soldiers".</p>
  </div>,
  'ballad':<div className='paragraph'>
    <p><strong>Ballad meter</strong> is a quatrain alternating lines with four beats and three beats. Ballad meter closely resembles common meter, which alternates iambic lines with eight syllables and six syllables. Unlike common meter, which counts stressed and unstressed syllables, ballad meter counts only stressed syllables&mdash;it is accentual rather than accentual-syllabic. Thus, ballad meter is more flexible than common meter, allowing variations like headless lines and anapestic substitution.</p>
    <p>Ballad meter has had hundreds of years of success in popular culture, generating everything from "The House of the Rising Sun" and "The Yellow Rose of Texas" to the theme songs for <em>Gilligan's Island</em> and the <em>Pokemon</em> anime series. There is also a tradition of ballad among writers of art-verse, including Samuel Taylor Coleridge's "Rime of the Ancient Mariner".</p>
  </div>,
  'common hymn, split': <div className='paragraph'>
    <p><strong></strong></p>
  </div>,
  'short hymn, split': <div className='paragraph'>
    <p><strong></strong></p>
  </div>,
  'limerick': <div className='paragraph'>
    <p><strong></strong></p>
  </div>,
  'common particular': <div className='paragraph'>
    <p><strong>Common particular meter</strong> (8.8.6.8.8.6) is a metrical variant of common meter that doubles the tetrameters to produce a sestet in which the first, second, fourth, and fifth lines are iambic tetrameter and the third and sixth lines are iambic trimeter. Stanzas of common particular meter often use the rhyme scheme AABCCB.</p>
  </div>,
  'common hymn, doubled': <div className='paragraph'>
    <p><strong>Common meter double</strong>(8.6.8.6.8.6.8.6) is an eight-line stanza that doubles the pattern of common meter, alternating lines of iambic tetrameter and iambic trimeter. Common meter double is a popular hymn meter, producing such songs as "It Came Upon the Midnight Clear" and "America the Beautiful."</p>
  </div>,
  'raven': <div className='paragraph'>
    <p>This stanza is the same as the one used in Edgar Allan Poe's <strong>The Raven</strong>.</p>
  </div>,
  'Lady of Shalott': <div className='paragraph'>
    <p>This stanza is the same as the one used in Alfred Lord Tennyson's <strong>The Lady of Shalott</strong>.</p>
  </div>,
};
export const LINE_METER_DESCRIPTIONS = {
  'iambic trimeter': <div className='paragraph'>
    <p><strong>Iambic trimeter</strong> consists of six syllables arranged in three metrical feet with rising rhythm. The most standard form of iambic trimeter is three iambs (da Dum da Dum da Dum), but there is sometimes trochaic inversion in the first foot. Stanzas rarely consist entirely of iambic trimeter, but it does play an important role in hymn meters like <em>common meter</em> and <em>short meter</em>.</p>
  </div>,
  'iambic trimeter catalectic': <div className='paragraph'>
    <p><strong></strong></p>
  </div>,
  'iambic tetrameter': <div className='paragraph'>
    <p><strong>Iambic tetrameter</strong> consists of eight syllables arranged in four metrical feet with rising rhythm. The most standard form of iambic trimeter is four iambs (da Dum da Dum da Dum da Dum), but it isn't uncommon to see trochaic inversion in the first foot. A quatrain of iambic tetrameter is called <em>long meter</em> and is a common meter for hymns, as in "When I Survey the Wondrous Cross". Iambic tetrameter is also used in other hymn meters like <em>common meter</em> and <em>short meter</em>.</p>
  </div>,
  'iambic tetrameter catalectic': <div className='paragraph'>
    <p><strong></strong></p>
  </div>,
  'iambic pentameter': <div className='paragraph'>
    <p><strong>Iambic pentameter</strong> consists of ten syllables arranged in five metrical feet with rising rhythm. The most standard form of iambic pentameter is five iambs (da Dum da Dum da Dum da Dum), but there are several common variations, including adding an unstressed eleventh syllable after the last iamb and substituting a trochee for one of more of the first four iambs. Iambic pentameter is probably the most important poetic meter in the history of English poetry. Everyone from Chaucer to Shakespeare and from Milton to Wordsworth wrote much of their verse in this meter. It is highly flexible, supporting lyrical and narrative verse, sonnet and epic.</p>
    <p>The English pentameter is likely a descendant of the Italian hendecasyllable, a line of eleven syllables used by Dante and Petrarch. Chaucer adapted this line to English, which doesn't have as many weak endings as Italian, resulting in a line of ten syllables.</p>
    <p>When iambic pentameter is unrhymed, it is called <strong>blank meter</strong>. When it is rhymed in couplets, it is called <strong>heroic couplets</strong>. Iambic pentameter is the meter normally used in the sonnet, a rhymed stanza of fourteen lines.</p>
  </div>,
  'iambic pentameter catalectic': <div className='paragraph'>
    <p><strong></strong></p>
  </div>,
  'iambic hexameter': <div className='paragraph'>
    <p><strong>Iambic hexameter</strong> consists of twelve syllables arranged in six metrical feet with rising rhythm. The most standard form of iambic hexameter is six iambs (da Dum da Dum da Dum da Dum da Dum) with a caesura after the third foot, but variations are common, including trochaic substitution and an unstressed thirteenth syllable. Stanzas rarely consist of solely iambic hexameters outside of the tradition of alexandrines (rhymed hexameter couplets) inherited from the medieval French tradition. Iambic hexameter sometimes appears as the last line of pentameter stanzas, such as the <em>Spenserian</em> and some <em>heroic couplets</em>. It also appears as the first line of <em>poulter's measure</em>.</p>
  </div>,
  'iambic hexameter catalectic': <div className='paragraph'>
    <p><strong></strong></p>
  </div>,
  'iambic heptameter': <div className='paragraph'>
    <p><strong></strong></p>
  </div>,
  'iambic heptameter catalectic': <div className='paragraph'>
    <p><strong></strong></p>
  </div>,
};
export const RHYME_TYPE_DESCRIPTIONS = {
  'full rhyme':<div className={'paragraph'}>
    <p><strong>Full rhyme</strong> is what most people imagine when they think about rhyme. Defining full rhyme linguistically is more complicated than it might seem, but generally speaking a rhyme between two words is full whenever all the sounds match from the last stressed vowel to the end of the word. For example, <i>Tennyson</i> rhymes with <i>venison</i> because the sounds in both words match beginning at the last stressed vowel, [ɛ], and continuing through the end of each word. Likewise, <i>Shelley</i> rhymes with <i>vermicelli</i> because the words match from the last stressed vowel, which again is [ɛ].</p>
    <p>Full rhyme is sometimes called <strong>exact rhyme</strong> or <strong>perfect rhyme</strong>, but these terms can give the impression that rhymes of other types are the result of either a defective ear or laziness on the part of the poet. In fact, many poets consciously choose other types of rhyme because of the effect those rhymes have on the ear.</p>
    <p>Full rhyme can be divided into <strong>masculine rhyme</strong>, <strong>feminine rhyme</strong>, and <strong>triple rhyme</strong>, depending on the number of syllables that the two words share. In masculine rhyme, the last stressed vowel occurs in the final syllable of the word. For instance, <i>Keats–completes</i> is a masculine rhyme because the stressed vowel [i] occurs in the last syllable of each word. In feminine rhyme, the last stressed vowel comes in the penultimate syllable. <i>Shelley–vermicelli</i> is an example of feminine rhyme because the final stressed vowel in both words, [ɛ], is the next-to-last syllable. In triple rhyme, the last stressed vowel is in the antepenultimate syllable. For instance, <i>Tennyson–venison</i> is a triple rhyme because the last stressed vowel, [ɛ], is two syllables before the last syllable of each word.</p>
  </div>,
  'homophone rhyme':<div className={'paragraph'}>
    <p><strong>Homophone rhyme</strong> occurs between any two words that have the same sound but a different spelling. For instance, in the homophone rhyme <i>urn</i>&ndash;<i>earn</i>, both words have all the same sounds. Homophone rhyme differs from full rhyme because in full rhyme, the sounds match only from the last stressed vowel to the end. A rhyme like <i>fair</i>&ndash;<i>fare</i> is homophone rhyme rather than full rhyme because both words match entirely. Homophone rhyme differs from identical rhyme because in identical rhyme, both words have the same spelling in addition to the same sounds.</p>
  </div>,
  'identical rhyme':<div className={'paragraph'}>
    <p>In an <strong>identical rhyme</strong>, both words are spelled and pronounced the same. For instance, in the identical rhyme <i>me</i>&ndash;<i>me</i>, both words have all the same sounds, and they are spelled the same. Identical rhyme differs from homophone rhyme because in homophone rhyme, the words have the same pronunciation but different spellings. Identical rhyme differs from full rhyme because in full rhyme, the sounds match only from the last stressed vowel to the end while in identical rhyme all the sounds match.</p>
  </div>,
  'promotion rhyme':<div className={'paragraph'}>
    <p><strong>Promotion rhyme</strong> is a type of partial rhyme in which at least one of the rhyming syllables has its degree of stress promoted by the meter of the line in which it appears. For instance, in a promotion rhyme like <em>sea</em>&ndash;<em>Eternity</em>, the last syllable of <i>Eternity</i> has its stress promoted by the line&rsquo;s iambic meter from its natural unstressed state to a state of secondary stress. A full rhyme for <i>eternity</i> would be a word like <i>modernity</i>, which matches it from the last stressed vowel, /ɝ/, all the way to the end. In a promotion rhyme, however, <i>sea</i> is made to rhyme with the stress-promoted last syllable of <i>Eternity</i>.</p>
  </div>,
  'mosaic full':<div className={'paragraph'}>
    <p><strong>Mosaic rhyme</strong> is rhyme in which at least one of the rhyme-fellows consists of multiple words strung together to match the sounds of the other. For instance, <i>Shakespeare</i>&ndash;<i>lake&rsquo;s pier</i> is a mosaic rhyme in which two words (<i>lake&rsquo;s pier</i>) are pieced together like tiles in a mosaic to give the impression of a rhyme with the other term (<i>Shakespeare</i>). Even when the sound resemblance is quite close, these are partial rhymes because of the intervening word boundaries, which affect pronunciation.</p>
    <p>The most notorious practitioners of mosaic rhyme in the nineteenth century must include Byron (<i>mahogany</i>&ndash;<i>a dog any</i>) and Robert Browning (<i>appetite</i>&ndash;<i>clap it tight</i>). Whether mosaic rhyme is more tour de force or tour de farce is perhaps best determined on a case-by-case basis. Whatever the case, it must have been in the nineteenth-century Anglophone air, with everyone from Poe (<i>lattice</i>&ndash;<i>thereat is</i>) to Hopkins (<i>I am, and</i>&ndash;<i>diamond</i>) trying their hand at it, often unsuccessfully.</p>
  </div>,
  'diphthong rhyme':<div className={'paragraph'}>
    <p>A diphthong is a vowel sound that glides from one vowel to another. For instance, in the word <i>ride</i>, the diphthong [aɪ] begins at the vowel [a] and glides to a finish toward the vowel [ɪ]. Standard English has several diphthongs, including the vowels in the following words: <i>bait</i>, <i>bite</i>, <i>boat</i>, <i>bout</i>, and <i>boy</i>.</p>
    <p>A <strong>diphthong rhyme</strong> is a rhyme that&rsquo;s like a full rhyme with one exception: instead of having matching vowels, a diphthong rhyme has vowels that match only in the second half of the vowel (the &lsquo;off-glide&rsquo;). For instance, in the diphthong rhyme <i>Blake</i>&ndash;<i>spike</i>, the [eɪ] diphthong in <i>Blake</i> ends at the same place as the [aɪ] diphthong in <i>spike</i>: [ɪ]. In a slightly different variety of diphthong rhyme, the off-glide of a diphthong matches a long vowel. For instance, in the diphthong rhyme <i>Pope</i>&ndash;<i>soup</i>, the off-glide of the diphthong [oʊ] in <i>Pope</i> is equivalent to the long vowel [u] in <i>soup</i>.</p>
    <p>Some kinds of diphthong rhyme are more common in English poetry than you might think. Eye rhymes like <i>how</i>&ndash;<i>slow</i> or <i>frown</i>&ndash;<i>shown</i> sound like diphthong rhymes, and due to changes in the pronunciation of English vowels, pairs like <i>join</i>&ndash;<i>line</i> and <i>smiles</i>&ndash;<i>toils</i> sound like diphthong rhymes in today's Standard English, even though their authors probably thought of them as full rhymes.</p>
    <p>The greatest practitioner of diphthong rhyme in English was Emily Dickinson, whose creative re-imaginings of this pattern extended the category far beyond its humble beginnings.</p>
  </div>,
  'promotion diphthong rhyme':<div className={'paragraph'}>
    <p>A diphthong is a vowel sound that glides from one vowel to another. For instance, in the word <i>ride</i>, the diphthong [aɪ] begins at the vowel [a] and glides to a finish toward the vowel [ɪ]. Standard English has several diphthongs, including the vowels in the following words: <i>bait</i>, <i>bite</i>, <i>boat</i>, <i>bout</i>, and <i>boy</i>.</p>
    <p>A <em>diphthong rhyme</em> is a rhyme that&rsquo;s like a full rhyme with one exception: instead of having matching vowels, a diphthong rhyme has vowels that match only in the second half of the vowel (the &lsquo;off-glide&rsquo;). For instance, in the diphthong rhyme <i>fate</i>&ndash;<i>bright</i>, the [eɪ] diphthong in <i>fate</i> ends at the same place as the [aɪ] diphthong in <i>bright</i>: [ɪ]. In a slightly different variety of diphthong rhyme, the off-glide of a diphthong matches a long vowel. For instance, in the diphthong rhyme <i>Pope</i>&ndash;<i>soup</i>, the off-glide of the diphthong [oʊ] in <i>Pope</i> is equivalent to the long vowel [u] in <i>soup</i>.</p>
    <p>A rhyme that combines this diphthong pattern with the stress-pattern of <em>promotion rhyme</em> can be called <strong>promotion diphthong rhyme</strong>. One kind of promotion diphthong is relatively common in traditional English poetry: rhymes like <i>die</i>&ndash;<i>mystery</i> and <i>poetry</i>&ndash;<i>high</i> match a stress-promoted [i] with the off-glide of the diphthong [aɪ].</p>
  </div>,
  'mosaic slant rhyme':'mosaic slant rhyme',
  'sibilant assonance':<div className={'paragraph'}>
    <p>Most types of rhyme rely on the <em>principle of identity</em>, which says that the sounds in rhyming words must be identical, as are the endings in the rhyme <i>Pope</i>&ndash;<i>elope</i>. But another class of rhymes relies on the <em>principle of equivalence</em>, which says that it&rsquo;s enough for the sounds in rhyming words to be equivalent (see Shapiro). Here, <i>equivalent</i> has a special meaning that has to do with a concept linguists call the &ldquo;distinctive features&rdquo; of speech sounds.</p>
    <p>Every speech sound has a set of distinctive features, each of which is a binary value (denoted by + or -), that collectively describe how the sound is produced. For instance, if a speech sound is produced in part by allowing air to escape through the nose&mdash;as in [m], [n], and [ŋ]&mdash;it has the [+ nasal] distinctive feature. If it is produced by directing a high-energy stream of turbulent air toward two surfaces&mdash;as in [s], [z], [dʒ], and [ʃ]&mdash;it has the [+ sibilant] feature.</p>
    <p>For any two speech sounds that differ, they must differ by at least one distinctive feature; for instance, [m] differs from [ŋ] because, although both have the [+ nasal] feature, [m] is [+ labial] while [ŋ] is [- labial] and [m] is [- velar] while [ŋ] is [+ velar]&mdash;all of which is just a technical way of describing the fact that [m] is produced with the lips closed while [ŋ] is produced with the back of the tongue raised to the soft palate.</p>
    <p>When we say that a rhyme obeys the principle of equivalence, what we mean is that, instead of the corresponding sounds of the two words being identical, they are equivalent because they share distinctive features.</p>
    <p><strong>Sibilant assonance</strong> is the name we give to a variety of rhyme obeying the principle of equivalence. For instance, in the sibilant assonance rhyme <i>eyes</i>&ndash;<i>paradise</i>, the /z/ at the end of <i>eyes</i> and the /s/ at the end of <i>paradise</i> are equivalent because they share the distinctive feature [+ sibilant]. The &lsquo;assonance&rsquo; part of the name indicates that both words share the same last stressed vowel, [aɪ]. Sibilant assonance is a rare variety of rhyme, but it is used in the work of Emily Dickinson.</p>
  </div>,
  'nasal assonance':<div className={'paragraph'}>
    <p>Most types of rhyme rely on the <em>principle of identity</em>, which says that the sounds in rhyming words must be identical, as are the endings in the rhyme <i>Pope</i>&ndash;<i>elope</i>. But another class of rhymes relies on the <em>principle of equivalence</em>, which says that it&rsquo;s enough for the sounds in rhyming words to be equivalent (see Shapiro). Here, <i>equivalent</i> has a special meaning that has to do with a concept linguists call the &ldquo;distinctive features&rdquo; of speech sounds.</p>
    <p>Every speech sound has a set of distinctive features, each of which is a binary value (denoted by + or -), that collectively describe how the sound is produced. For instance, if a speech sound is produced in part by allowing air to escape through the nose&mdash;as in [m], [n], and [ŋ]&mdash;it has the [+ nasal] distinctive feature. If it is produced by directing a high-energy stream of turbulent air toward two surfaces&mdash;as in [s], [z], [dʒ], and [ʃ]&mdash;it has the [+ sibilant] feature.</p>
    <p>For any two speech sounds that differ, they must differ by at least one distinctive feature; for instance, [m] differs from [ŋ] because, although both have the [+ nasal] feature, [m] is [+ labial] while [ŋ] is [- labial] and [m] is [- velar] while [ŋ] is [+ velar]&mdash;all of which is just a technical way of describing the fact that [m] is produced with the lips closed while [ŋ] is produced with the back of the tongue raised to the soft palate.</p>
    <p>When we say that a rhyme obeys the principle of equivalence, what we mean is that, instead of the corresponding sounds of the two words being identical, they are equivalent because they share distinctive features.</p>
    <p><strong>Nasal assonance</strong> is the name we give to a variety of rhyme that obeys the principle of equivalence. For instance, in the nasal assonance rhyme <i>hung</i>&ndash;<i>sun</i>, the /ŋ/ at the end of <i>hung</i> and the /n/ at the end of <i>sun</i> are equivalent because they share the distinctive feature [+ nasal]. The &lsquo;assonance&rsquo; part of the name indicates that both words share the same last stressed vowel, [ʌ]. Nasal assonance is uncommon, but it does occur in the work of Emily Dickinson as in <i>run</i>&ndash;<i>come</i> and <i>name</i>&ndash;<i>gain</i>.</p>
  </div>,
  'assonance':<div className={'paragraph'}>
    <p>When the matching sounds in two words are vowel sounds, they may be said to demonstrate <strong>assonance</strong> or <strong>assonantal rhyme</strong>. In an assonantal rhyme like <i>Blake</i>&ndash;<i>fate</i>, both words share the [eɪ] vowel, but all the consonants differ. Assonance differs from full rhyme, in which both the last stressed vowel and any consonants that follow are identical. The opposite of assonance is <em>consonance</em>, in which the only matching sounds are consonant sounds rather than vowels. Assonance in place of end rhyme is not especially common in formal English poetry before the twentieth century, but it is very common in other traditions, including rap and hiphop.</p>
  </div>,
  'full consonance':<div className={'paragraph'}>
    <p><strong>Consonantal rhymes</strong> are rhymes in which the sound resemblance between two words is limited to their consonants (especially consonants coming after the last stressed vowel). For instance, in consonantal rhymes like <i>winds</i>&ndash;<i>stands</i> and <i>light</i>&ndash;<i>forgot</i>, the vowel sounds are different, but the final consonant sounds are identical. Sometimes called <strong>suspended rhyme</strong> or <strong>consonance</strong>, consonantal rhyme has a long history in English poetry. In the work of the hymnist Isaac Watts, for example, consonantal rhymes constitute about one-fourth of all rhymes. Consonance differs from alliteration, in which the matching consonants come at the beginning of the word, rather than at the end.</p>
  </div>,
  'promotion consonance':<div className={'paragraph'}>
    <p>Rhymes that combine the metrical pattern of promotion rhyme with the consonant-matching of consonantal rhyme can be called <strong>promotion consonance</strong>. In such pairings, consonants at the end of words with final stress are made to rhyme with consonants in the stress-promoted last syllable of words with antepenultimate stress. For instance, in the promotion consonance rhyme <i>south</i>&ndash;<i>Nazareth</i>, the [θ] in <i>south</i> rhymes with the [θ] in the stress-promoted last syllable of <i>Nazareth</i>, even though the vowels do not match.</p>
  </div>,
  'diphthong assonance':<div className={'paragraph'}>
    <p>A diphthong is a vowel sound that glides from one vowel to another. For instance, in the word <i>ride</i>, the diphthong [aɪ] begins at the vowel [a] and glides toward the vowel [ɪ]. Standard English has several diphthongs, including the vowels in the following words: <i>bait</i>, <i>bite</i>, <i>boat</i>, <i>bout</i>, and <i>boy</i>. <strong>Diphthong assonance</strong> is a rhyme like assonance with one exception: instead of having matching vowels, a diphthong rhyme has vowels that match only in the second half of the vowel (the &lsquo;off-glide&rsquo;). For instance, in a pairing like <i>Blake</i>&ndash;<i>meet</i>, the off-glide of the diphthong [eɪ] in <i>Blake</i> is equivalent to the [i] vowel in <i>meet</i>.</p>
  </div>,
  'partial consonance':<div className={'paragraph'}>
    <p><strong>Partial consonance</strong> differs from what might be called full consonance because not all of the consonant sounds in a cluster are present in both words. For instance, in the partial consonantal rhyme <i>book</i>&ndash;<i>think</i>, both words share the [k] sound, but <i>book</i> doesn&rsquo;t have the [ŋ] sound that is present in <i>think</i>. In the rhyme <i>dissolved</i>&ndash;<i>proved</i>, both words end in [vd], but <i>dissolved</i>&rsquo;s [l] is missing from <i>proved</i>.</p>
  </div>,
  'unstressed rhyme':<div className={'paragraph'}>
    <p>One way to make a partial rhyme with words that end in unstressed syllables is to ignore the stressed syllables altogether, leaving the sound resemblance to the unstressed syllables alone. Such a rhyme might be called <strong>unstressed rhyme</strong> or <strong>homeoteleuton</strong>, which is Greek for &ldquo;same endings&rdquo;. Traditionally, the term <i>homeoteleuton</i> has referred to the resemblance between the ending of two words when they have the same grammatical endings. Wimsatt gives the example of <i>exstinguendam</i>&ndash;<i>infringendam</i> from Latin, where the <i>-endam</i> ending on both words is something like the <i>-ing</i> at the end of <i>extinguishing</i> and <i>infringing</i> in English.</p>
    <p>For our purposes, <i>unstressed rhyme</i> will refer to the sound resemblance in final, unstressed syllables, whether the endings are the same grammatical morpheme or not, as in <i>window</i>&ndash;<i>meadow</i> or <i>happy</i>&ndash;<i>sorry</i>. Such a sound resemblance may not feel like much of a rhyme at all, but poets do occasionally use them.</p>
  </div>,
  'promotion diphthong assonance':<div className={'paragraph'}>
    <p>A diphthong is a vowel sound that glides from one vowel to another. For instance, in the word <i>ride</i>, the diphthong [aɪ] begins at the vowel [a] and glides to a finish toward the vowel [ɪ]. Standard English has several diphthongs, including the vowels in the following words: <i>bait</i>, <i>bite</i>, <i>boat</i>, <i>bout</i>, and <i>boy</i>. In a rhyme like <strong>promotion diphthong assonance</strong>, instead of having matching vowels, the words&rsquo; vowels match only in the second half of the vowel (the &lsquo;off-glide&rsquo;). For instance, in the promotion diphthong assonance rhyme <i>fate</i>&ndash;<i>justify</i>, the [eɪ] diphthong in <i>fate</i> ends at the same place as the stress-promoted [aɪ] diphthong in <i>justify</i>: [ɪ].</p>
  </div>,
  'anisobaric rhyme':<div className={'paragraph'}>
    <p>Instead of rhyming stressed syllables with stressed and unstressed with unstressed, as in full rhyme, one might also match a stressed syllable with an unstressed, as in <i>be</i>&ndash;<i>happy</i> or <i>go</i>&ndash;<i>sorrow</i>. Such pairs are called <strong>anisobaric rhymes</strong>, from the Greek for &ldquo;unequal weight&rdquo;. Anisobaric rhymes differ from promotion rhymes in one important aspect: the unstressed syllable rhymed in anisobaric pairs is not (and cannot be) promoted by the line&rsquo;s meter. In promotion rhymes, the unstressed &lt;y&gt; in a word like <i>eternity</i> can be stress-promoted in iambic lines because it is two syllables away from the word&rsquo;s primary stress. But in an anisobaric rhyme, the unstressed &lt;y&gt; in a word like <i>happy</i> is directly adjacent to the syllable with primary stress and cannot be promoted without a stress-clash.</p>
  </div>,
  'zero consonance':<div className={'paragraph'}>
    <p>In the work of Emily Dickinson, rhymes words sometimes have only one thing in common: they both have no final consonant sounds. In such rhymes, which we can term <strong>zero consonance</strong>, the only resemblance is that both words end with vowel sounds. For instance, in the rhyme <i>so</i>&ndash;<i>me</i> (from Dickinson&rsquo;s Fr431), the sound resemblance is limited to the lack of final consonants. Though it is uncommon in the work of her predecessors, Dickinson uses such rhymes relatively frequently, often in pairings that feature stress-promotion. Many rhymes that first seem to be zero consonance are better classified as diphthong rhyme.</p>
    <p>Zero consonance is among the most distant rhyme types since the words often don&rsquo;t have any sounds in common. As an example, consider the zero consonance rhyme <i>Doe</i>&ndash;<i>reply</i> from the second stanza of Dickinson&rsquo;s &ldquo;My Life had stood – a Loaded Gun –&rdquo; (Fr764).</p>
  </div>,
  'sibilant consonance':<div className={'paragraph'}>
    <p>Most types of rhyme rely on the <em>principle of identity</em>, which says that the sounds in rhyming words must be identical, as are the endings in the rhyme <i>Pope</i>&ndash;<i>elope</i>. But another class of rhymes relies on the <em>principle of equivalence</em>, which says that it&rsquo;s enough for the sounds in rhyming words to be equivalent (see Shapiro). Here, <i>equivalent</i> has a special meaning that has to do with a concept linguists call the &ldquo;distinctive features&rdquo; of speech sounds.</p>
    <p>Every speech sound has a set of distinctive features, each of which is a binary value (denoted by + or -), that collectively describe how the sound is produced. For instance, if a speech sound is produced in part by allowing air to escape through the nose&mdash;as in [m], [n], and [ŋ]&mdash;it has the [+ nasal] distinctive feature. If it is produced by directing a high-energy stream of turbulent air toward two surfaces&mdash;as in [s], [z], [dʒ], and [ʃ]&mdash;it has the [+ sibilant] feature.</p>
    <p>For any two speech sounds that differ, they must differ by at least one distinctive feature; for instance, [m] differs from [ŋ] because, although both have the [+ nasal] feature, [m] is [+ labial] while [ŋ] is [- labial] and [m] is [- velar] while [ŋ] is [+ velar]&mdash;all of which is just a technical way of describing the fact that [m] is produced with the lips closed while [ŋ] is produced with the back of the tongue raised to the soft palate.</p>
    <p>When we say that a rhyme obeys the principle of equivalence, what we mean is that, instead of the corresponding sounds of the two words being identical, they are equivalent because they share distinctive features.</p>
    <p>One type of rhyme that obeys the principle of equivalence might be called <strong>sibilant consonance</strong>. Such rhymes are a type of consonantal rhyme, but instead of having identical consonants at the end of the two rhyming words, they have consonants that are <em>equivalent</em> because they share the [+ sibilant] distinctive feature. For instance, in the rhyme <i>suffice</i>&ndash;<i>mysteries</i>, the [s] at the end of <i>suffice</i> is equivalent to, but not identical with, the [z] at the end of <i>mysteries</i> since both are [+ sibilant]. Thus, <i>suffice</i>&ndash;<i>mysteries</i> is an example of sibilant consonance. What makes rhymes like this so interesting is that the two words do not need to share any of the same sounds at all, but we can still say that they rhyme. As a result, rhymes of equivalence like sibilant consonance are surely among the most distant sound resemblances that can meaningfully be classified as rhyme.</p>
    <p>Sibilant consonance is present, but quite rare in Emily Dickinson's poems. When it does occur, it is often mistaken for a total lack of rhyme. Many of Dickinson&rsquo;s readers, for instance, miss that <i>Forge</i>&ndash;<i>Blaze</i> in &ldquo;Dare you see a Soul at the &lsquo;White Heat&rsquo;?&rdquo; (Fr401) really is a rhyme, since the [dʒ] at the end of <i>Forge</i> and the [z] at the end of <i>Blaze</i> are both [+ voiced] and [+ sibilant]. Such rhymes, however, are very unusual, even for Dickinson. More often, she will add assonance to such rhymes, perhaps to reinforce the feeling that they are rhymes. For instance, in the rhyme <i>eyes</i>&ndash;<i>Paradise</i> (Fr224), in addition to the sibilant consonance between the [z] in <i>eyes</i> and the [s] in <i>Paradise</i>, both words have the vowel [aɪ].</p>
  </div>,
  'nasal consonance':<div className={'paragraph'}>
    <p>Most types of rhyme rely on the <em>principle of identity</em>, which says that the sounds in rhyming words must be identical, as are the endings in the rhyme <i>Pope</i>&ndash;<i>elope</i>. But another class of rhymes relies on the <em>principle of equivalence</em>, which says that it&rsquo;s enough for the sounds in rhyming words to be equivalent (see Shapiro). Here, <i>equivalent</i> has a special meaning that has to do with a concept linguists call the &ldquo;distinctive features&rdquo; of speech sounds.</p>
    <p>Every speech sound has a set of distinctive features, each of which is a binary value (denoted by + or -), that collectively describe how the sound is produced. For instance, if a speech sound is produced in part by allowing air to escape through the nose&mdash;as in [m], [n], and [ŋ]&mdash;it has the [+ nasal] distinctive feature. If it is produced by directing a high-energy stream of turbulent air toward two surfaces&mdash;as in [s], [z], [dʒ], and [ʃ]&mdash;it has the [+ sibilant] feature.</p>
    <p>For any two speech sounds that differ, they must differ by at least one distinctive feature; for instance, [m] differs from [ŋ] because, although both have the [+ nasal] feature, [m] is [+ labial] while [ŋ] is [- labial] and [m] is [- velar] while [ŋ] is [+ velar]&mdash;all of which is just a technical way of describing the fact that [m] is produced with the lips closed while [ŋ] is produced with the back of the tongue raised to the soft palate.</p>
    <p>When we say that a rhyme obeys the principle of equivalence, what we mean is that, instead of the corresponding sounds of the two words being identical, they are equivalent because they share distinctive features.</p>
    <p><strong>Nasal consonance</strong> is a consonantal rhyme that uses the principle of equivalence such that the equivalence of the terminal consonants is due to their shared [+ nasal] feature. For example, in the rhyme <i>Tongue</i>&ndash;<i>unknown</i> (Fr1112) the [ŋ] at the end of <i>Tongue</i> and the [n] at the end of <i>unknown</i> are equivalent because they are both nasal consonants. In Emily Dickinson's work, nasal consonance is often paired with assonance, so that the rhyming words have identical vowels and equivalent nasal consonants. For instance, in the rhyme <i>noon</i>&ndash;<i>perfume</i>, both words share the vowel [u] and both end with nasal consonants.</p>
  </div>,
  'N/A':'nonrhyme',
};