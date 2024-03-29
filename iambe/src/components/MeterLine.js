import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory, Redirect } from 'react-router-dom';

import Breadcrumbs from './styled/Breadcrumbs';
import Container from './styled/Container';
import Section from './styled/Section';
import {BlueSpan, YellowSpan, RedSpan} from './styled/Spans';
import ScannedLine from './styled/ScannedLine';
import ButtonRow from './styled/ButtonRow';
import Button from './styled/Button';
import HoverCard from './styled/HoverCard';

import {crement, getMeterTypeDetails} from '../actions';

import Poem from '../utils/Poem';
import Stanza from '../utils/Stanza';
import Line from '../utils/Line';
import { VARIATION_DESCRIPTIONS } from '../utils/descriptions';

const MeterLine = props => {
  const {poems, stanzaNum, lineNum, crement, getMeterTypeDetails} = props;
  const history = useHistory();

  if (!!poems) {
    var stanzaList = [];
    poems.forEach(poem => new Poem(poem).getStanzas().forEach(stanza => stanzaList.push(stanza)));
    var stanza = new Stanza(stanzaList[stanzaNum]);
    var line = new Line(stanza.getLines()[lineNum]);
    var marks = line.getMarkString();
    var varList = line.getVariationList();
  }

  const goBack = () => {
    history.push('/meter/scansion');
  }

  const submitCrement = direction => {
    crement(direction, 'lineNum');
    history.push('/meter/line');
  }

  const submitMeterTypeDetail = e => {
    getMeterTypeDetails(e.target.innerHTML);
    // if ('rt' in e.target.dataset) getMeterTypeDetails(e.target.dataset.rt);
    // else if ('rt' in e.target.attributes) getMeterTypeDetails(e.target.attributes.rt.value);
    // else console.log("couldn't find rt in e",e);
    history.push("/meter/type");
  }

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  if (!poems) return <Redirect to='/' />
  else return (
    <div>
      <Breadcrumbs>
        <Link to='/' key="Home">Home</Link>
        <Link to='/meter' key="Meter">Meter</Link>
        <Link to='/meter/scansion' key="Stanza">Stanza</Link>
        <Link to='/meter/line' className='current' key="Line">Scansion</Link>
      </Breadcrumbs>
      <Container>
        <Section>
          <h2><YellowSpan>Scansion</YellowSpan></h2>
          <p>This line can be scanned as follows:</p>
          <ScannedLine marks={marks} line={line.text} />
          <p style={{marginTop:'1.5rem'}}>This line's meter is:&nbsp;
            <BlueSpan
              onClick={submitMeterTypeDetail}
              style={{cursor:'pointer'}}
            >
              {line.getMeterLabelPhrase()}
            </BlueSpan>.
          </p>
        </Section>
        {!!varList.length &&
          <Section>
            <h2><RedSpan>Variations</RedSpan></h2>
            <p>This line has {varList.length.toString()} metrical variation{varList.length === 1 ? '' : 's'}:</p>
            <ul>
              {varList.map(vari => (
                <li key={vari.foot}>
                  There's <HoverCard hoverText={VARIATION_DESCRIPTIONS[vari.varType]}><YellowSpan>{vari.varType}</YellowSpan></HoverCard> in foot {vari.foot}.
                </li>
                ))}
            </ul>
          </Section>
        }
        <ButtonRow>
          {lineNum > 0 &&
          <Button
            size='small'
            onClick={() => submitCrement('de')}
          >
            ᐊ
          </Button>}
          <Button
            // size='small'
            onClick={goBack}
          >
            Back to Stanza
          </Button>
          {lineNum < stanza.getLines().length - 1 && 
          <Button
            size='small'
            onClick={() => submitCrement('in')}
          >
            ᐅ
          </Button>}
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

export default connect(mapStateToProps, {crement, getMeterTypeDetails})(MeterLine)
