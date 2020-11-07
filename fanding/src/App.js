import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
//import Navbar from './components/layout/Navbar';

import Navbar from "./components/layout/Navbar";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import SignUpCom from "./components/auth/SignUpCom";
import MyAccount from "./components/layout/MyAccount";
import Chongdae_auth from "./components/layout/Chongdae_auth";
import Identity_auth from "./components/auth/Identity_auth";
import Account_auth from "./components/auth/Account_auth";
import CreateFunding from "./components/layout/CreateFunding";
import FindCompany from "./components/layout/FindCompany";
import FindCompanyForm from "./components/layout/FindCompanyForm";
import Payment from "./components/payment/Payment";
import test from './components/layout/test';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/signupcom" component={SignUpCom} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signupcom" component={SignUpCom} />
            <Route path="/myaccount" component={MyAccount} />
            <Route path="/create_funding" component={CreateFunding} />
            <Route path="/chongdae" component={Chongdae_auth} />
            <Route path="/identity_auth" component={Identity_auth} />
            <Route path="/account_auth" component={Account_auth} />
            <Route path="/find_company" component={FindCompany} />
            <Route path="/find_company_form" component={FindCompanyForm} />
            <Route path="/payment" component={Payment} />
            <Route path="/test" component={test}/>

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
