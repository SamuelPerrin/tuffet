import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Home from './components/Home';
import Rhymes from './components/Rhymes';
import Meter from './components/Meter';
import RhymeScheme from './components/RhymeScheme';
import Scansion from './components/Scansion';

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <Link to='/'>Home</Link>
          <Link to='/rhyme'>Rhymes</Link>
          <Link to='/meter'>Meter</Link>
        </header>
        
        <Route exact path ='/' component={Home} />
        <Route exact path='/rhyme' component={Rhymes} />
        <Route exact path="/meter" component={Meter} />
        <Route exact path="/rhyme/scheme" component={RhymeScheme}/>
        <Route exact path="/meter/scansion" component={Scansion} />
      </Router>
    </div>
  );
}

export default App;
