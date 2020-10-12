import React,{Component} from 'react';
import {connect} from 'react-redux';
import {signIn} from '../../store/actions/authActions';
//import { Redirect } from 'react-router-dom';

import { Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import { render } from 'react-dom';

class SignInTest extends Component {
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

  render() {
    // const { authError, auth } = this.props;
    // if (auth.uid) return <Redirect to='/' /> 
    return (
      <Container className="signform mt-auto">
        <h2>회원가입</h2>
        <Form>
          <FormGroup>
            <Label for="Email">이메일</Label>
            <Input type="email" name="email" id="exampleEmail" 
            placeholder="이메일을 입력하세요" 
            onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="Password">비밀번호</Label>
            <Input type="password" name="password" id="examplePassword" 
            placeholder="비밀번호를 입력하세요" 
            onChange={this.handleChange}/>
          </FormGroup>
          
          <FormGroup>
            <Label for="SelectMulti">관심아티스트</Label>
            <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
              <option>BTS</option>
              <option>BLACKPINK</option>
              <option>ITZY</option>
              <option>TWICE</option>
              <option>GOT7</option>
              <option>MONSTA X</option>
              <option>NU'EST</option>
              <option>DAY6</option>
            </Input>
          </FormGroup>
          <Button onSubmit={this.handleSubmit}>Submit</Button>
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
  )(SignInTest);





  