import React, { Component } from "react";
import firebase from "firebase/app";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Container,
} from "reactstrap";

class PasswordSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleClickPasswordSearch = () => {
    if (this.state.email != "") {
      firebase
        .auth()
        .sendPasswordResetEmail(this.state.email)
        .then(function () {
          //   console.log("비밀번호 재설정 및 이메일 전송");
          alert("비밀번호 재설정 이메일 전송되었습니다.");
        })
        .catch(function (error) {
          console.log(error.message);
        });
    } else {
      alert("이메일을 입력해주세요");
    }
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="mbr-section-head mt-30">
            <h3 className="mbr-section-title mbr-fonts-style align-center  mb-0 display-2">
              <strong>비밀번호 찾기</strong>
            </h3>
            <h4 className="mbr-section-subtitle mbr-fonts-style align-center mb-0 mt-2 display-5">
              {/* Form Subtitle */}
            </h4>
          </div>
          <div className="row justify-content-center mt-4">
            <div className="col-lg-8 mx-auto mbr-form" data-form-type="formoid">
              <Form
                className="mbr-form form-with-styler mx-auto"
                onSubmit={this.handleSubmit}
              >
                <FormGroup>
                  <Label for="Email">
                    <strong>이메일</strong>
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="이메일을 입력하세요"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <div className="col-auto mbr-section-btn align-center">
                  <Button
                    onClick={this.handleClickPasswordSearch}
                    size="lg"
                    block
                    className="btn btn-info display-4"
                  >
                    비밀번호찾기
                  </Button>
                </div>
                <br></br>
                <div className="col-auto mbr-section-btn align-center">
                  <Button
                    onClick={this.props.isPopUpClose()}
                    size="lg"
                    block
                    className="btn btn-info display-4"
                  >
                    로그인하기
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PasswordSearch;
