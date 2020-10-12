import React,{Component} from 'react';
// import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions';

import { Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import { render } from 'react-dom';
  
  class SignUp extends Component {
    state = {
      email: '',
      password: '',
      artist:'',
    };
  
    //handle click
    handleChange = e => {
      this.setState({
        [e.target.id]: e.target.value,
      });
    };
    handleSubmit = e => {
      e.preventDefault();
      this.props.signUp(this.state); // 변경된 부분
    };
    
    handleClick = e => {
      e.preventDefault();
      //action 추가
    }

    render() {
      // const { authError, auth } = this.props;
      // if (auth.uid) return <Redirect to='/' /> 
      return (
        <Container className="signform mt-auto">
          <h2>회원가입</h2>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="Email">이메일</Label>
              <Button color="warning" className="ml-3" onChange={this.handleClick}>이메일 인증</Button>
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
            <FormGroup>
            <Label for="SelectMulti">관심아티스트</Label>
            <Input type="select" name="selectMulti" id="artist" multiple>
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
            
            <Button>Submit</Button>
          </Form>
        </Container>
  
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,
      authError: state.auth.authError
    }
  }

  const mapDispatchToProps = (dispatch)=> {
    return {
      signUp: (creds) => dispatch(signUp(creds))
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

 
  
  
  
  
  
    