import React,{Component} from 'react';
import {connect} from 'react-redux';
import {signIn} from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';
import { TwitterLoginButton } from "react-social-login-buttons";
import firebase from 'firebase/app';
import {twitterSignIn} from "../../store/actions/authActions";
import { Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import { render } from 'react-dom';

// let divColor = {
//   border-radius: 10px,
//   backgroundColor: '#fafafa';
// }

const ColoredLine = ({ color }) => (
  <hr
      style={{
          color: color,
          backgroundColor: color,
          height: 1
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


  handleTwitter = () => {
      twitterSignIn();
  }

  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to='/' />
    return(


    <section className="form7 cid-sgu5krdF9y" id="form7-t">
    
    
    <div className="container">
        <div className="mbr-section-head mt-30">
            <h3 className="mbr-section-title mbr-fonts-style align-center  mb-0 display-2">
              <strong>로그인</strong>
            </h3>
            <h4 className="mbr-section-subtitle mbr-fonts-style align-center mb-0 mt-2 display-5">
                {/* Form Subtitle */}
            </h4>
        </div>
        <div className="row justify-content-center mt-4" >
            <div className="col-lg-8 mx-auto mbr-form" data-form-type="formoid" >
            <Form className="mbr-form form-with-styler mx-auto"onSubmit={this.handleSubmit} >
            <p class="mbr-text mbr-fonts-style align-center mb-4 display-7">FANDING</p>
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
          <div className="col-auto mbr-section-btn align-center">
            <Button size="lg" block className="btn btn-info display-4">로그인</Button>
          </div>
           <ColoredLine color="#dedede" />

           <TwitterLoginButton className="twitter mt-15" onClick={this.handleTwitter}>
            <span>트위터로 로그인하기</span>
           </TwitterLoginButton>
        </Form>
            </div>
        </div>
    </div>
</section>
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

// style={{borderRadius:'10px',backgroundColor: '#fafafa'}}
  // return (
    //   <Container className="signform mt-auto">
    //     <h2>로그인</h2>
    //     <Form onSubmit={this.handleSubmit}>
    //       <FormGroup>
    //         <Label for="Email">이메일</Label>
    //         <Input type="email" name="email" id="email" 
    //         placeholder="이메일을 입력하세요" 
    //         onChange={this.handleChange}/>
    //       </FormGroup>
    //       <FormGroup>
    //         <Label for="Password">비밀번호</Label>
    //         <Input type="password" name="password" id="password" 
    //         placeholder="비밀번호를 입력하세요" 
    //         onChange={this.handleChange}/>
    //       </FormGroup>
        
    //       <Button>Submit</Button>

    //       <ColoredLine color="#696861" />

    //       <TwitterLoginButton className="twitter mt-10" onClick={this.handleTwitter}>
    //         <span>트위터로 로그인하기</span>
    //       </TwitterLoginButton>
    //     </Form>
    //   </Container>

    // );





  