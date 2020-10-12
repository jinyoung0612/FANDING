import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import SignUpCom from './components/auth/SingUpCom';

class App extends Component{
    render(){
        return (
            <BrowserRouter>
              <div className="App">
              <Navbar />
                <Switch>
                  <Route path="/signup" component={SignUp} />
                  <Route path="/signupcom" component={SignUpCom} />
                  <Route path="/signin" component={SignIn} />
                </Switch>
              </div>
            </BrowserRouter>
          );
        }

    }

export default App;


