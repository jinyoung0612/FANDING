import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/authActions";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Container,
} from "reactstrap";
import { render } from "react-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated/dist/react-select.esm";
const style = {
  control: base => ({
    ...base,
    border: 1,
    // This line disable the blue border
      boxShadow: 'none',
  })
};
class SignUp extends Component {
  state = {
    email: "",
    password: "",
    artistSelect:""
  };
  options=[
    {value:'BTS', label:"BTS"},
    {value:'BLACKPINK', label:"BLACKPINK"},
    {value: "APINK", label:"APINK"},
    {value: "TXT", label:"TXT"},
    {value: "DAY6", label:"DAY6"},
    {value: "TWICE", label:"TWICE"},
    {value: "Stray Kids", label:"Stray Kids"},
    {value: "B1A4", label:"B1A4"},
    {value: "NU'EST", label:"NU'EST"},
    {value: "IDLE", label:"IDLE"},
    {value: "기타", label:"기타"},
  ];

  animatedComponents =makeAnimated();

  //handle click
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    var msg = "이메일인증이 전송되었습니다.";
    alert(msg);
    this.props.signUp(this.state); // 변경된 부분
  };

  handleClick = (e) => {
    e.preventDefault();
    //action 추가
  };

  handleChangeSelect = e => {
    this.setState({
      artistSelect:e
    });
  };

  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <section class="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
             <div class="mbr-section-head pb-10">
                        <h3 class="mbr-section-title mbr-fonts-style align-center mb-10 display-2 "><strong>회원가입</strong></h3>
                        
            </div>
            <Container
            style={{backgroundColor:"#fafafa", borderRadius:"10px", padding:"3em 2em", 
            marginTop:"40px"}}>
           
           <Label className="mr-2" for="Email"><strong>닉네임</strong></Label>
        <Button
              className="ml-3"
              color="warning"
              onChange={this.handleClick}
              size="sm"
            >
            중복 확인
            </Button>
        <Form>
          
          <FormGroup>
             
            
            <Input
              type="nickname"
              name="nickname"
              id="nickname"
              placeholder="닉네임을 입력하세요"
              onChange={this.handleChange}
            />
            
          </FormGroup>
        </Form>

        <Label className="mr-2" for="Email"><strong>이메일</strong></Label>
        <Button
              className="ml-3"
              color="warning"
              onChange={this.handleClick}
              size="sm"
            >
              이메일 인증
            </Button>
        <Form>
          
          <FormGroup>
             
            
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="이메일을 입력하세요"
              onChange={this.handleChange}
            />
            
          </FormGroup>
        </Form>


          <Form className="mt-4">
          <FormGroup>
            <Label for="Password"><strong>비밀번호</strong></Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              onChange={this.handleChange}
            />
          </FormGroup>
          </Form>
          <Form className="mt-4">

            <FormGroup>
              <Label><strong>관심 아티스트</strong></Label>
              <Select styles={style} id="artistSelect" components={this.animatedComponents} options={this.options} menuPortalTarget={document.body} style={{menuPortal:base=>({...base,zIndex:9999})}} isMulti onChange={this.handleChangeSelect}/>
            </FormGroup>

            </Form>
      <Form  onSubmit={this.handleSubmit}>
          <Button className="mx-auto" size="lg">가입하기</Button>
        </Form>


      </Container>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (creds) => dispatch(signUp(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
