import './App.css';
import { Switch, Route } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import { Theme } from './constants/theme';
import GlobalStyle from './components/styled/Global';
import Navbar from './components/styled/Navbar';
import Home from './components/Home';
import Rhymes from './components/Rhymes';
import Meter from './components/Meter';
import RhymeScheme from './components/RhymeScheme';
import RhymeType from './components/RhymeType';
import Scansion from './components/Scansion';
import MeterStanza from './components/MeterStanza';
import MeterType from './components/MeterType';
import MeterLine from './components/MeterLine';
import AboutRhymes from './components/AboutRhymes';
import AboutMeter from './components/AboutMeter';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <div>
        <header>
          <Navbar />
        </header>
        <Switch>
          <Route exact path ='/' component={Home} />
          <Route exact path='/rhyme' component={Rhymes} />
          <Route exact path="/meter" component={Meter} />
          <Route exact path="/rhyme/scheme" component={RhymeScheme}/>
          <Route exact path="/rhyme/type" component={RhymeType} />
          <Route exact path="/meter/scansion" component={Scansion} />
          <Route exact path="/meter/stanza" component={MeterStanza} />
          <Route exact path="/meter/type" component={MeterType} />
          <Route exact path="/meter/line" component={MeterLine} />
          <Route exact path="/about/rhymes" component={AboutRhymes} />
          <Route exact path="/about/meter" component={AboutMeter} />
        </Switch>
      </div>
    </ThemeProvider>  
  );
}

export default App;
