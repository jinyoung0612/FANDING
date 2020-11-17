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

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    // artist1: "",
    // artist2: "",
    // artist3: "",
    // options: [
    //   {name:'없음', id:0},
    //   {name:'BTS', id:1},
    //   {name:'BLACKPINK', id:2},
    //   {name:'APINK', id:3},
    //   {name:'TXT', id:4},
    //   {name:'DAY6', id:5},
    //   {name:'TWICE', id:6},
    //   {name:'Stray Kids', id:7},
    //   {name:'B1A4', id:8},
    //   {name:"NU'EST", id:9},
    //   {name:'IDLE', id:10},
    //   {name:'기타', id:11},
    // ],
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
      <Container className="signform mt-auto">
        <h2>회원가입</h2>
        <Form>
          <FormGroup>
            <Label for="Email">이메일</Label>
            <Button
              color="warning"
              className="ml-3"
              onChange={this.handleClick}
            >
              이메일 인증
            </Button>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="이메일을 입력하세요"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="Password">비밀번호</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              onChange={this.handleChange}
            />
          </FormGroup>
          </Form>
          <Form>
          {/*<FormGroup>*/}
          {/*  <Label for="SelectMulti">관심아티스트1</Label>*/}
          {/*  <Input*/}
          {/*    type="select"*/}
          {/*    name="selectMulti"*/}
          {/*    id="artist1"*/}
          {/*    multiple*/}
          {/*    onChange={this.handleChange}*/}
          {/*  >*/}
          {/*  {*/}
          {/*    this.state.options.map((e,key) => {*/}
          {/*    return <option value={e.value}>{e.name}</option>;*/}
          {/*   })*/}
          {/*  }*/}
          {/*  </Input>*/}
          {/*</FormGroup>*/}
          {/*<FormGroup>*/}
          {/*  <Label for="SelectMulti">관심아티스트2</Label>*/}
          {/*  <Input*/}
          {/*    type="select"*/}
          {/*    name="selectMulti"*/}
          {/*    id="artist2"*/}
          {/*    multiple*/}
          {/*    onChange={this.handleChange}*/}
          {/*  >*/}
          {/*  {*/}
          {/*    this.state.options.map((e,key) => {*/}
          {/*    return <option value={e.value}>{e.name}</option>;*/}
          {/*   })*/}
          {/*  }*/}
          {/*  </Input>*/}
          {/*</FormGroup>*/}

          {/*<FormGroup>*/}
          {/*  <Label for="SelectMulti">관심아티스트3</Label>*/}
          {/*  <Input*/}
          {/*    type="select"*/}
          {/*    name="selectMulti"*/}
          {/*    id="artist3"*/}
          {/*    multiple*/}
          {/*    onChange={this.handleChange}*/}
          {/*  >*/}
          {/*  {*/}
          {/*    this.state.options.map((e,key) => {*/}
          {/*    return <option value={e.value}>{e.name}</option>;*/}
          {/*   })*/}
          {/*  }*/}
          {/*  </Input>*/}
          {/*</FormGroup>*/}
            <FormGroup>
              <Label>관심 아티스트</Label>
              <Select id="artistSelect" components={this.animatedComponents} options={this.options} menuPortalTarget={document.body} style={{menuPortal:base=>({...base,zIndex:9999})}} isMulti onChange={this.handleChangeSelect}/>
            </FormGroup>

            </Form>
      <Form onSubmit={this.handleSubmit}>
          <Button>Submit</Button>
        </Form>
      </Container>
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
