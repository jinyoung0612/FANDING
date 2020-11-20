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


      <section class="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
             <div class="mbr-section-head pb-10">
                        <h3 class="mbr-section-title mbr-fonts-style align-center mb-10 display-2 "><strong>업체 회원가입</strong></h3>
                        
            </div>
            <Container
            style={{backgroundColor:"#fafafa", borderRadius:"10px", padding:"3em 2em", 
            marginTop:"40px"}}>
        
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="companyName"><strong>상호명</strong></Label>
            <Input
              type="text"
              name="companyName"
              id="companyName"
              placeholder="상호명을 입력하세요"
              onChange={this.handleChange}
            />
          </FormGroup>
          </Form>

          <Label for="companyRegistrationNumber"><strong>사업자등록번호</strong></Label>
            <Button color="warning" className="ml-3" size="sm" onClick={this.handleClick}>
              중복확인
            </Button>
          <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            
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
            <Label for="corporateRegistrationNumber"><strong>법인등록번호</strong></Label>
            <Input
              type="text"
              name="corporateRegistrationNumber"
              id="corporateRegistrationNumber"
              placeholder="법인등록번호를 입력하세요"
              onChange={this.handleChange}
            />
          </FormGroup>
          </Form>

          <Label for="Email"><strong>이메일</strong></Label>
            <Button
              color="warning"
              className="ml-3" size="sm" 
              onChange={this.handleClick}
            >
              이메일 인증
            </Button>

          <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="이메일을 입력하세요"
              onChange={this.handleChange}
            />
          </FormGroup>
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
    signUpCom: (creds) => dispatch(signUpCom(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpCom);
