import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
// import './App.css';
//Materialize
import 'materialize-css/dist/css/materialize.min.css';

import Navbar from "./components/navbar.component"
import InfoIndex from "./components/info-index.component"
import InfoList from "./components/info-list.component"
import InfoUpdate from "./components/info-update.component"

function App() {
  return (
    <Router>
      <Navbar />
      <Route path='/' exact component={InfoIndex}></Route>
      <Route path='/list' exact component={InfoList}></Route>
      <Route path='/update/:id' exact component={InfoUpdate}></Route>
    </Router>
  );
}

export default App;
