import React,{Component} from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { signUpCom } from '../../store/actions/authActions';
import { Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';

class SignUpCom extends Component {
    state = {
      email: '',
      password: '',
      companyName : '',
      companyRegistrationNumber: '',
      corporateRegistrationNumber: '',
    };
  
    handleChange = e => {
      this.setState({
        [e.target.id]: e.target.value,
      });
    };
    handleSubmit = e => {
      e.preventDefault();
      this.props.signUpCom(this.state);
    };
    handleClick = e => {
      e.preventDefault();
      //action 추가
    }

    render() {

      const { auth, authError } = this.props;
      if (auth.uid) return <Redirect to='/' />
      return (
       
        <Container className="signform mt-auto">
        <h2>업체 회원가입</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="companyName">상호명</Label>
            <Input type="text" name="companyName" id="companyName"
            placeholder="상호명을 입력하세요"
            onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="companyRegistrationNumber">사업자등록번호</Label>
            <Button color="warning" className="ml-3" onChange={this.handleClick}>중복확인</Button>
            <Input type="text" name="companyRegistrationNumber" 
            id="companyRegistrationNumber"
            placeholder="사업자등록번호를 입력하세요"
            onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="corporateRegistrationNumber">법인등록번호</Label>
            <Input type="text" name="corporateRegistrationNumber" 
            id="corporateRegistrationNumber"
            placeholder="법인등록번호를 입력하세요"
            onChange={this.handleChange}/>
          </FormGroup>
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
      signUpCom: (creds) => dispatch(signUpCom(creds))
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(SignUpCom)
