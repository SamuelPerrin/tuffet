import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory, Redirect } from 'react-router-dom';

import Breadcrumbs from './styled/Breadcrumbs';
import { YellowSpan, RedSpan, BlueSpan } from './styled/Spans';
import Container from './styled/Container';
import Section from './styled/Section';
import PoemBox from './styled/PoemBox';
import StanzaTile from './styled/StanzaTile';
import ListItemTile from './styled/ListItemTile';
import Button from './styled/Button';
import ButtonRow from './styled/ButtonRow';
import FlexRow from './styled/FlexRow';
import { Pie } from 'react-chartjs-2';

import { getRhymeSchemeDetails, getRhymeTypeDetails, getMeter } from '../actions';

import Poem from '../utils/Poem';
import { RHYME_TYPES } from '../utils/phonstants';
import { COLOR_SEQUENCE } from '../constants/colors';

const Rhymes = props => {
  let {poetry, poems, rhymeTypeCounts, rhymeSchemeCounts, currentUser, getRhymeSchemeDetails, getRhymeTypeDetails, getMeter} = props;
  let history = useHistory();

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  const submitRhymeDetail = e => {
    e.preventDefault();
    getRhymeSchemeDetails(e.target.attributes.stanzaNum.value);
    history.push("/rhyme/scheme");
  }

  const submitRhymeType = e => {
    e.preventDefault();
    if ('rt' in e.target.dataset) getRhymeTypeDetails(e.target.dataset.rt);
    else if ('rt' in e.target.attributes) getRhymeTypeDetails(e.target.attributes.rt.value);
    else console.log("couldn't find rt in e",e);
    history.push("/rhyme/type");
  }

  const goToMeter = e => {
    e.preventDefault();
    getMeter(poetry);
    history.push("/meter");
  }

  const goToAddPoem = e => {
    e.preventDefault();
    history.push("/save-poem");
  }

  const typeCounts = rhymeTypeCounts && Object.entries(rhymeTypeCounts).filter(x => x[1] > 0).sort((a,b) => b[1] - a[1]);
  const totalRhymes = rhymeTypeCounts && Object.keys(rhymeTypeCounts).reduce((a,b) => a + rhymeTypeCounts[b], 0);

  const pieData = rhymeTypeCounts && {
    labels: typeCounts.map(x => x[0]),
    datasets: [{
      label: "Rhyme Types",
      data: typeCounts.map(x => x[1]),
      backgroundColor: COLOR_SEQUENCE,
      borderWidth: 1,
    }],
  };

  const pieOptions = {
    plugins: {
      legend: {
        display: false,
        labels: {
          display: false
        }
      }
    }
  };

  if (!poetry) return <Redirect to="/"/>
  else if (totalRhymes === 0) {
    // console.log('poems',poems);
    return (
      <div>
        <Breadcrumbs>
          <Link to='/'>Home</Link>
          <Link to='/rhyme' className='current'>Rhyme</Link>
        </Breadcrumbs>
        <Container>
          <Section>
            <h2><YellowSpan>Oops!</YellowSpan></h2>
            <p>No rhymes found. If there are rhymes in this stanza, <Link to='/' style={{color:'#3887D6'}}>try again</Link> with it broken into shorter stanzas.</p>
          </Section>
        </Container>
      </div>
    )
  } else return (
    <div>
      <Breadcrumbs>
        <Link to='/'>Home</Link>
        <Link to='/rhyme' className='current'>Rhyme</Link>
      </Breadcrumbs>
      <FlexRow>
        <Container id='context'>
          <Section>
            <h2><YellowSpan>Rhymes by Type</YellowSpan></h2>
            <p>There {totalRhymes === 1 ? 'is': 'are'} {totalRhymes} rhyme{totalRhymes === 1 ? '' : 's'} in this sample.</p>
            <p>The most common rhyme-types are:</p>
            <div style={{
              display:'flex',
              flexFlow:'row wrap',
              justifyContent: 'center',
            }}>
              <Pie 
                data={pieData}
                options={pieOptions}
                style={{maxWidth:200,maxHeight:200,marginTop:'2rem'}}
              />
              <ul>
                  {rhymeTypeCounts && typeCounts.map((entry,i) =>
                    <ListItemTile
                      key={entry[0]}
                      onClick={submitRhymeType}
                      rt={entry[0]}
                      bulletColor={COLOR_SEQUENCE[i % COLOR_SEQUENCE.length]}
                    >
                      {RHYME_TYPES[entry[0]]} ({entry[1]} rhyme{entry[1] === 1 ? '' : 's'})
                    </ListItemTile>
                  )}
              </ul>
            </div>
            <Link to="/about/rhymes"><YellowSpan>Read more »</YellowSpan></Link>
          </Section>
          <Section>
            <h2><RedSpan>Rhyme Schemes</RedSpan></h2>
            {Object.entries(rhymeSchemeCounts).reduce((a,b) => a+b[1], 0) > 1 ? <p>The most common rhyme schemes in this sample are:</p> : <p>This stanza's rhyme scheme is:</p>}
            <ol>
              {rhymeSchemeCounts && Object.entries(rhymeSchemeCounts).filter(entry => entry[1] > 0).sort((a,b) => b[1] - a[1]).map(entry => <li key={entry[0]}>{entry[0]} ({entry[1]} stanza{entry[1] > 1 ? 's' : ''})</li>)}
            </ol>
            <Link to="/about/rhyme-schemes"><RedSpan>Read more »</RedSpan></Link>
          </Section>
          <ButtonRow>
            <Button onClick={goToMeter} className="hide-for-mobile" size="small">Get Meter</Button>
            {currentUser &&
            !currentUser.poems.some(one => one.poem.text === poems[0]) &&
            <Button onClick={goToAddPoem} className="hide-for-mobile" size="small">Save Poem</Button>}
          </ButtonRow>
        </Container>
        <Container id="text">
          <Section>
            <h2><BlueSpan>Rhyme Scheme by Stanza</BlueSpan></h2>
            <p>Select a stanza to learn more about its rhymes.</p>
            <PoemBox>
              {poems.map(poem => new Poem(poem).getStanzas().map((stanza, idx) =>
                <StanzaTile 
                  onClick={submitRhymeDetail}
                  children={stanza.getLines().map(l => l.text)} 
                  hoverText={"Rhyme scheme: " + stanza.getRhymeScheme()}
                  key={idx}
                  stanzaNum={idx}
                />
              ))}
            </PoemBox>
          </Section>
          <ButtonRow>
            <Button onClick={goToMeter} className="hide-for-desktop" size="small">Get Meter</Button>
            {currentUser &&
            !currentUser.poems.some(one => one.poem.text === poems[0]) && 
            <Button onClick={goToAddPoem} className="hide-for-desktop" size="small">Save Poem</Button>}
          </ButtonRow>
        </Container>
      </FlexRow>
    </div>
  )
}

const mapStateToProps = state => {
  return {
  ...state,
  poetry: state.poetry,
  poems: state.poems,
  rhymes: state.rhymes,
  rhymeTypeCounts: state.rhymeTypeCounts,
  rhymeSchemeCounts: state.rhymeSchemeCounts,
  currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps, { getRhymeSchemeDetails, getRhymeTypeDetails, getMeter })(Rhymes)