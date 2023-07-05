import React from 'react';
import './App.css';

import {BrowserRouter, Route, Switch} from 'react-router-dom'
// components
import Navbar from './components/Navbar.jsx'
import Trainers from './views/Trainers.jsx'
import Trainer from './views/Trainer.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import BookingForm from './views/BookingForm';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Navbar />
         <Switch>
            <Route exact path="/" component={Trainers} />
            <Route path="/trainer" component={Trainer} />
            <Route path="/BookingForm" component={BookingForm} />
          </Switch>
      </BrowserRouter>
    </div>  
  );
}

export default App;
