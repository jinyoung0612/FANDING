import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUpCom } from "../../store/actions/authActions";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Container,
} from "reactstrap";
import firebase from "firebase/app";

var company_check = false;
var check_click = false;

class SignUpCom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      companyName: "",
      companyRegistrationNumber: "",
      corporateRegistrationNumber: "",
      companyRegNum_Check: "",
    };

    this.handleClick_Change = this.handleClick_Change.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.companyRegNum_Check);
    console.log(check_click);
    if (
      this.state.companyRegNum_Check == false &&
      check_click == true &&
      this.state.companyRegistrationNumber != ""
    ) {
      var msg = "이메일인증이 전송되었습니다.";
      alert(msg);
      this.props.signUpCom(this.state);
    } else {
      var msg = "사업자등록번호 중복확인을 해주세요";
      alert(msg);
    }
  };
  handleClick_Change = () => {
    if (company_check == true) {
      this.setState({ companyRegNum_Check: true });
    } else if (company_check == false) {
      this.setState({ companyRegNum_Check: false });
    }
    company_check = false;
  };
  handleClick = () => {
    firebase
      .firestore()
      .collection("companies")
      .where("company_reg_num", "==", this.state.companyRegistrationNumber)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, "=>", doc.data());
          console.log("Duplicate Appears");
          company_check = true;
        });
      })
      .then(() => {
        this.handleClick_Change();
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    check_click = true;
  };

  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <Container className="signform mt-auto">
        <h2>업체 회원가입</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="companyName">상호명</Label>
            <Input
              type="text"
              name="companyName"
              id="companyName"
              placeholder="상호명을 입력하세요"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="companyRegistrationNumber">사업자등록번호</Label>
            <Button color="warning" className="ml-3" onClick={this.handleClick}>
              중복확인
            </Button>
            <Input
              type="text"
              name="companyRegistrationNumber"
              id="companyRegistrationNumber"
              placeholder="사업자등록번호를 입력하세요"
              onChange={this.handleChange}
            />
          </FormGroup>
          <div>
            {this.state.companyRegNum_Check === true ? (
              <div>사업자등록번호가 중복입니다</div>
            ) : null}
          </div>
          <FormGroup>
            <Label for="corporateRegistrationNumber">법인등록번호</Label>
            <Input
              type="text"
              name="corporateRegistrationNumber"
              id="corporateRegistrationNumber"
              placeholder="법인등록번호를 입력하세요"
              onChange={this.handleChange}
            />
          </FormGroup>
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
    signUpCom: (creds) => dispatch(signUpCom(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpCom);
