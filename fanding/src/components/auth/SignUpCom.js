import React,{Component} from 'react';
// import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions';
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
    render() {

      // const { auth, authError } = this.props;
      // if (auth.uid) return <Redirect to='/' /> 
      return (
       
        <Container className="signform mt-auto">
        <h2>업체 회원가입</h2>
        <Form>
          <FormGroup>
            <Label for="companyName">상호명</Label>
            <Input type="text" name="companyName" id="companyName"
            placeholder="상호명을 입력하세요"
            onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="companyRegistrationNumber">사업자등록번호</Label>
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
          
          
          <Button onSubmit={this.handleSubmit}>Submit</Button>
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
      signUpCom: (creds) => dispatch(signUp(creds))
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(SignUpCom)
