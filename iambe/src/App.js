import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Home from './components/Home';
import Rhymes from './components/Rhymes';
import Meter from './components/Meter';


function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <Link to='/'>Home</Link>
          <Link to='/rhymes'>Rhymes</Link>
          <Link to='/meter'>Meter</Link>
        </header>
        
        <Route exact path ='/' component={Home} />
        <Route exact path='/rhymes' component={Rhymes} />
        <Route exact path="/meter" component={Meter} />
      </Router>
    </div>
  );
}

export default App;
