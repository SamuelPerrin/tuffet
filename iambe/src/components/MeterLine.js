import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';

import Breadcrumbs from './styled/Breadcrumbs';
import Container from './styled/Container';
import Section from './styled/Section';
import {YellowSpan, RedSpan} from './styled/Spans';
import ScannedLine from './styled/ScannedLine';
import ButtonRow from './styled/ButtonRow';
import Button from './styled/Button';

import {crement} from '../actions';

import Poem from '../utils/Poem';
import Stanza from '../utils/Stanza';
import Line from '../utils/Line';

const MeterLine = props => {
  const {poems, stanzaNum, lineNum, crement} = props;
  const history = useHistory();

  const stanzaList = [];
  poems.forEach(poem => new Poem(poem).getStanzas().forEach(stanza => stanzaList.push(stanza)));
  const stanza = new Stanza(stanzaList[stanzaNum]);
  const line = new Line(stanza.getLines()[lineNum]);
  const marks = line.getMarkString();
  const varList = line.getVariationList();

  const goBack = () => {
    history.push('/meter/scansion');
  }

  const submitCrement = direction => {
    crement(direction, 'lineNum');
    history.push('/meter/line');
  }

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  return (
    <div>
      <Breadcrumbs>
        <Link to='/'>Home</Link>
        <Link to='/meter'>Meter</Link>
        <Link to='/meter/scansion'>Scansion</Link>
        <Link to='/meter/line' className='current'>Line</Link>
      </Breadcrumbs>
      <Container>
        <Section>
          <h3><YellowSpan>Scansion</YellowSpan></h3>
          <p>This line can be scanned as follows:</p>
          <ScannedLine marks={marks} line={line.text} />
        </Section>
        {!!varList.length &&
          <Section>
            <h3><RedSpan>Variations</RedSpan></h3>
            <p>This line has {varList.length.toString()} metrical variation{varList.length === 1 ? '' : 's'}:</p>
            <ul>
              {varList.map(vari => (
                <li>There's {vari.varType} in foot {vari.foot}.</li>
                ))}
            </ul>
          </Section>
        }
        <ButtonRow>
          {lineNum != 0 && <Button onClick={() => submitCrement('de')}>&lt; Last line</Button>}
          <Button onClick={goBack}>Back to stanza</Button>
          {lineNum != stanza.getLines().length - 1 && <Button onClick={() => submitCrement('in')}>Next line &gt;</Button>}
        </ButtonRow>
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
    lineNum: state.lineNum,
  }
}

export default connect(mapStateToProps, {crement})(MeterLine)
