import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';

import Breadcrumbs from './styled/Breadcrumbs';
import Container from './styled/Container';
import Section from './styled/Section';
import {YellowSpan, RedSpan} from './styled/Spans';
import ScannedStanza from './styled/ScannedStanza';
import ListItemTile from './styled/ListItemTile';
import {getMeterTypeDetails, setLineNum} from '../actions';

import Poem from '../utils/Poem';
import Stanza from '../utils/Stanza';
import Line from '../utils/Line';

const Scansion = props => {
  const {poems, stanzaNum, getMeterTypeDetails, setLineNum} = props;
  const history = useHistory();

  const stanzaList = [];
  poems.forEach(poem => new Poem(poem).getStanzas().forEach(stanza => stanzaList.push(stanza)));
  const stanza = new Stanza(stanzaList[stanzaNum]);
  const lineCounts = {};
  stanza.getLines().forEach(line => {
    const lineMeter = new Line(line).getMeterLabelPhrase();
    lineCounts[lineMeter] = lineMeter in lineCounts ? lineCounts[lineMeter] + 1 : 1;
  })

  const submitMeterType = e => {
    e.preventDefault();
    getMeterTypeDetails(e.target.dataset.rt);
    history.push("/meter/type");
  }

  const submitLineNum = e => {
    e.preventDefault();
    setLineNum(e.target.id);
    history.push("/meter/line");
  }

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);


  return (
    <div>
      <Breadcrumbs>
        <Link to='/'>Home</Link>
        <Link to='/meter'>Meter</Link>
        <Link to='/meter/scansion' className='current'>Scansion</Link>
      </Breadcrumbs>
      <Container>
        <Section>
          <h3><RedSpan>Scansion</RedSpan></h3>
          <ScannedStanza stanza={stanza} submitLineNum={submitLineNum} />
          <br/>
          <p>This stanza's meter is: <RedSpan>{stanza.getMeter()}</RedSpan>.</p>
        </Section>
        <Section>
          <h3><YellowSpan>Lines by Meter</YellowSpan></h3>
          <p>The most common lines in this stanza are:</p>
            <ol>
              {lineCounts && Object.entries(lineCounts).sort((a,b) => b[1] - a[1]).map(entry => <ListItemTile key={entry[0]} onClick={submitMeterType} rt={entry[0]}>{entry[0]} ({entry[1]} line{entry[1] === 1 ? '' : 's'})</ListItemTile>)}
            </ol>
        </Section>
      </Container>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    ...state,
    poems: state.poems,
    stanzaMeters: state.stanzaMeters,
    stanzaNum: state.stanzaNum,
  }
}

export default connect(mapStateToProps, {getMeterTypeDetails, setLineNum})(Scansion)
