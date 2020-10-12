import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
//import Navbar from './components/layout/Navbar';
import NavbarTest from './components/layout/NavbarTest';
import SignUp from './components/auth/SignUp';
import SignInTest from './components/auth/SignInTest';

class App extends Component{
    render(){
        return (
            <BrowserRouter>
              <div className="App">
              <NavbarTest />
                <Switch>
                  <Route path="/signup" component={SignUp} />
                  <Route path="/signin" component={SignInTest} />
                </Switch>
              </div>
            </BrowserRouter>
          );
        }

    }

export default App;


