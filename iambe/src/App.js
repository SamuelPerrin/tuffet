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
import AboutRhymeSchemes from './components/AboutRhymeSchemes';
import AboutMeter from './components/AboutMeter';
import FAQs from './components/FAQ';
import Samples from './components/Samples';
import PageNotFound from './components/PageNotFound';
import Login from './components/Login';
import Register from './components/Register';
import UserPoems from './components/UserPoems';
import AddPoem from './components/AddPoem';
import EditPoem from './components/EditPoem';
import FocusPoem from './components/FocusPoem';
import AdminDash from './components/AdminDash';
import Contact from './components/Contact';
import EditUser from './components/EditUser';
import Footer from './components/styled/Footer';
import PrivateRoute from './components/PrivateRoute';

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
          <Route exact path="/about" component={FAQs} />
          <Route exact path="/about/rhymes" component={AboutRhymes} />
          <Route exact path="/about/rhyme-schemes" component={AboutRhymeSchemes} />
          <Route exact path="/about/meter" component={AboutMeter} />
          <Route exact path="/samples" component={Samples} />
          <Route exact path="/login">
            <Login uri="/my-poems"/>
          </Route>
          <Route exact path="/register" component={Register} />
          <Route path="/contact" component={Contact} />
          <PrivateRoute exact path="/my-poems" component={UserPoems} />
          <PrivateRoute exact path="/save-poem" component={AddPoem} />
          <PrivateRoute path="/edit/poem/:poemid" component={EditPoem} />
          <PrivateRoute path="/poem/:poemid" component={FocusPoem} />
          <PrivateRoute path="/dashboard" roles={["ADMIN"]} component={AdminDash} />
          <PrivateRoute path="/edit-user" component={EditUser} />
          <Route component={PageNotFound} />
        </Switch>
        <Footer />
      </div>
    </ThemeProvider>  
  );
}

export default App;
