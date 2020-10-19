import React,{Component} from 'react';
import {connect} from 'react-redux';
import {signIn} from '../../store/actions/authActions';
//import { Redirect } from 'react-router-dom';
import { TwitterLoginButton } from "react-social-login-buttons";
import firebase from 'firebase/app';

import { Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import { render } from 'react-dom';



const ColoredLine = ({ color }) => (
  <hr
      style={{
          color: color,
          backgroundColor: color,
          height: 5
      }}
  />
);

class SignIn extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state); // 변경된 부분
  };

  openpopup = e =>{
      var provider = new firebase.auth.TwitterAuthProvider();
      firebase
          .auth()
          .signInWithPopup(provider)
          .then(function(result){
              var token = result.credential.accessToken;
              var secret = result.credential.secret;
              var user = result.user;
          }).catch(function (error) {
              console.log(error.message);

      })


  };

  render() {
    // const { authError, auth } = this.props;
    // if (auth.uid) return <Redirect to='/' /> 
    return (
      <Container className="signform mt-auto">
        <h2>로그인</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="Email">이메일</Label>
            <Input type="email" name="email" id="email" 
            placeholder="이메일을 입력하세요" 
            onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="Password">비밀번호</Label>
            <Input type="password" name="password" id="password" 
            placeholder="비밀번호를 입력하세요" 
            onChange={this.handleChange}/>
          </FormGroup>
        
          <Button>Submit</Button>

          <ColoredLine color="#696861" />

          <TwitterLoginButton className="twitter mt-10" onClick={this.openpopup}>
            <span>트위터로 로그인하기</span>
          </TwitterLoginButton>
        </Form>
      </Container>

    );
  }
}

const mapStateToProps = (state) => {
    return{
      authError: state.auth.authError,
      auth: state.firebase.auth
    }
  }
const mapDispatchToProps = dispatch => {
    return {
      signIn: creds => dispatch(signIn(creds)),
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SignIn);


  





  