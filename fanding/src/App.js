import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
// import  Navbar  from './layout/Nav';
// import SignUp from './compoents/auth/SignUp';
import SignIn from './components/auth/SignIn';

class App extends Component{
    render(){
        return (
            <BrowserRouter>
              <div className="App">
              {/* <Navbar /> */}
                <Switch>
                  {/* <Route path="/signup" component={SignUp} /> */}
                  <Route path="/signin" component={SignIn} />
                </Switch>
              </div>
            </BrowserRouter>
          );
        }

    }


    
    

export default App;


