import React from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Movies from './components/Movies';
import Favourite from './components/Favourite';
import {BrowserRouter as Router,Switch,Route, BrowserRouter} from 'react-router-dom';
import './App.css';

function App() {
  return (
      <Router>
        <Navbar/>
        <Switch>
          <Route path='/' exact render={(props)=>(
            <>
                <Banner {...props}/>
                <Movies {...props}/>
            </>
          )}/>
          <Route path='/favourite' exact component={Favourite}/>
        </Switch>
      </Router>
  );
}

export default App;