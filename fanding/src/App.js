import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
//import Navbar from './components/layout/Navbar';
import Navbar from './components/layout/Navbar';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import SignUpCom from './components/auth/SignUpCom';



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
                  <Route path="/signupcom" component={SignUpCom} />
                </Switch>
              </div>
            </BrowserRouter>
          );
        }

    }

// class App extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             username:null
//         };
//     }
//
//     componentDidMount() {
//         fetch('/api')
//             .then(res=>res.json())
//             .then(data=>this.setState({username:data.username}));
//     }
//
//
//     render() {
//         const {username} = this.state;
//         return (
//             <div className="App">
//                 <header className="App-header">
//                     {username ? `Hello ${username}` : 'Hello World'}
//                 </header>
//             </div>
//         );
//         ;
//     }
// }

export default App;


