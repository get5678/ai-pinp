import React, { createContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import Index from './pages/index';
import Beautify from './pages/beautify';
import Splice from './pages/splice';
import Spliceedit from './pages/spliceedit';
import Video from './pages/video';
import Mine from './pages/mine';
import Setting from './pages/setting';


import './App.scss';

export const imageContext = createContext();

function App() {

  useEffect(() => {
    let height = window?.innerHeight;
   
    let body = document.getElementsByTagName('body')[0];
    body.style.height = `${height}px`;

  }, [])

  return (
    <Router>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/index" component={Index} />
        <Route path="/beautify" component={Beautify} />
        <Route path="/splice" component={Splice} />
        <Route path="/spliceedit" component={Spliceedit} />
        <Route path="/video" component={Video} />
        <Route path="/mine" component={Mine} />
        <Route path="/setting" component={Setting} />
       
        <Redirect from="*" to="/home" />
      </Switch>
    </Router>
  );
}

export default App;
