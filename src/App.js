// import logo from './logo.svg';
import "./App.css";

import React, { Component } from "react";
import Navbar from "./Component/Navbar";
import News from "./Component/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/"
              element={ 
              <News key="General" pageSize={5} country="us" category="General" />}/>
            <Route exact path="/Business"
              element={ 
              <News key="Business" pageSize={5} country="us" category="Business" />}/>
            <Route exact path="/Entertainment"
              element={ 
              <News key="Entertainment" pageSize={5} country="us" category="Entertainment" />}/>
            <Route exact path="/General"
              element={ 
              <News key="General" pageSize={5} country="us" category="General" />}/>
            <Route exact path="/Health"
              element={ 
              <News key="Health" pageSize={5} country="us" category=" Health" />}/>
            <Route exact path="/Science"
              element={ 
              <News key="Science" pageSize={5} country="us" category="Science" />}/>
            <Route exact path="/Sports"
              element={ 
              <News key="Sports" pageSize={5} country="us" category="Sports" />}/>
            <Route exact path="/Technology"
              element={ 
              <News key="Technology" pageSize={5} country="us" category="Technology" />}/>
          </Routes>
        </Router>
      </div>
    );
  }
}
