import './App.css';
import {Switch, Route, Link} from 'react-router-dom';

import {ThemeProvider} from 'styled-components';
import {Theme} from './constants/theme';
import GlobalStyle from './components/styled/Global';
import Home from './components/Home';
import Rhymes from './components/Rhymes';
import Meter from './components/Meter';
import RhymeScheme from './components/RhymeScheme';
import RhymeType from './components/RhymeType';
import Scansion from './components/Scansion';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <div>
        <header>
          <Link to='/'>Home</Link>
          <Link to='/rhyme'>Rhymes</Link>
          <Link to='/meter'>Meter</Link>
        </header>
        <Switch>
          <Route exact path ='/' component={Home} />
          <Route exact path='/rhyme' component={Rhymes} />
          <Route exact path="/meter" component={Meter} />
          <Route exact path="/rhyme/scheme" component={RhymeScheme}/>
          <Route exact path="/rhyme/type" component={RhymeType} />
          <Route exact path="/meter/scansion" component={Scansion} />
        </Switch>
      </div>
    </ThemeProvider>  
  );
}

export default App;
