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
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import { BsArrowDown } from "react-icons/bs";

var company_check = false;
var check_click = false;
var email_check = false;
const AgreedStyle = {
  overflowY: "scroll",
  height: "150px",
  position: "relative",
};
class SignUpCom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_check: "",
      companyName: "",
      companyRegistrationNumber: "",
      corporateRegistrationNumber: "",
      companyRegNum_Check: "",
      companyRegNum_Success: false,
      isPassWordCheck: false,
      isNoPassWord: false,
      isPassWordLengthCheck: false,
      isEmailCheck: true,
      isAgreed1: false,
      isAgreed2: false,
      isAgreed3: false,
    };

    this.handleClick_Change = this.handleClick_Change.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEmailCheck = this.handleEmailCheck.bind(this);
  }
  handleEmailCheck = () => {
    if (email_check) {
      this.setState({ isEmailCheck: false });
    } else {
      this.setState({ isEmailCheck: true });
    }
    email_check = false;
  };
  email_Checking = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
    setTimeout(() => {
      firebase
        .firestore()
        .collection("companies")
        .where("email", "==", this.state.email)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            email_check = true;
          });
        });
      firebase
        .firestore()
        .collection("users")
        .where("user_email", "==", this.state.email)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            email_check = true;
          });
        });
    }, 200);
    setTimeout(() => {
      console.log("email duplicate check", email_check);
      this.handleEmailCheck();
    }, 500);
  };
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
      if (
        this.state.email != "" &&
        this.state.password != "" &&
        this.state.corporateRegistrationNumber != "" &&
        this.state.companyName != "" &&
        this.state.password_check != ""
      ) {
        if (
          this.state.isNoPassWord &&
          this.state.isPassWordCheck &&
          this.state.isEmailCheck &&
          this.state.isPassWordLengthCheck &&
          this.state.isAgreed1 &&
          this.state.isAgreed2 &&
          this.state.isAgreed3
        ) {
          var msg = "이메일인증 메일 전송되었습니다.";
          this.props.signUpCom(this.state);
          alert(msg);
        } else if (this.state.password_check != this.state.password) {
          var msg = "비밀번호 확인을 해주세요";
          alert(msg);
        } else if (!this.state.isEmailCheck) {
          var msg = "이미 가입한 이메일입니다";
          alert(msg);
        } else if (!this.state.isPassWordLengthCheck) {
          var msg = "비밀번호는 최소 6자리 이상으로 해주세요";
          alert(msg);
        } else if (!this.state.isAgreed1) {
          alert("회원약관에 동의해주세요");
        } else if (!this.state.isAgreed2) {
          alert("개인정보 처리방침안내에 동의해주세요");
        } else if (!this.state.isAgreed3) {
          alert("마케팅,홍보의 수집 및 이용 동의해주세요");
        }
      } else if (this.state.email == "") {
        var msg = "이메일을 입력해주세요";
        alert(msg);
      } else if (this.state.password == "") {
        var msg = "비밀번호를 입력해주세요";
        alert(msg);
      } else if (this.state.password_check == "") {
        var msg = "비밀번호 확인을 입력해주세요";
        alert(msg);
      } else if (this.state.corporateRegistrationNumber == "") {
        var msg = "법인등록번호를 입력해주세요";
        alert(msg);
      } else if (this.state.companyName == "") {
        var msg = "상호명을 입력해주세요";
        alert(msg);
      }
    } else {
      var msg = "사업자등록번호 중복확인을 해주세요";
      alert(msg);
    }
  };
  handleClick_Change = () => {
    if (company_check == true && this.state.companyRegistrationNumber != "") {
      this.setState({ companyRegNum_Check: true });
    } else if (
      company_check == false &&
      this.state.companyRegistrationNumber != ""
    ) {
      this.setState({ companyRegNum_Check: false });
      this.setState({ companyRegNum_Success: true });
    } else if (this.state.companyRegistrationNumber == "") {
      this.setState({ companyRegNum_Check: false });
      this.setState({ companyRegNum_Success: false });
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
  password_Checking = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
    setTimeout(() => {
      if (this.state.password == this.state.password_check) {
        this.setState({ isPassWordCheck: true });
        this.setState({ isNoPassWord: true });
        if (this.state.password == "" && this.state.password_check == "") {
          this.setState({ isNoPassWord: false });
        }
      } else if (this.state.password != this.state.password_check) {
        if (this.state.password != "" || this.state.password_check != "") {
          this.setState({ isPassWordCheck: false });
          this.setState({ isNoPassWord: true });
        }
      }
      if (this.state.password.length >= 6) {
        this.setState({ isPassWordLengthCheck: true });
      } else {
        this.setState({ isPassWordLengthCheck: false });
      }
    }, 200);
  };
  handleAgree1 = (e) => {
    console.log("회원약관 check");
    this.setState({
      isAgreed1: !this.state.isAgreed1,
    });
  };
  handleAgree2 = (e) => {
    console.log("개인정보 처리방침 check");
    this.setState({
      isAgreed2: !this.state.isAgreed2,
    });
  };
  handleAgree3 = (e) => {
    console.log("홍보및 마케팅 check");
    this.setState({
      isAgreed3: !this.state.isAgreed3,
    });
  };
  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <section class="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
        <div class="mbr-section-head pb-10">
          <h3 class="mbr-section-title mbr-fonts-style align-center mb-10 display-2 ">
            <strong>업체 회원가입</strong>
          </h3>
        </div>
        <Container
          style={{
            backgroundColor: "#fafafa",
            borderRadius: "10px",
            padding: "3em 2em",
            marginTop: "40px",
          }}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="companyName">
                <strong>상호명</strong>
              </Label>
              <Input
                type="text"
                name="companyName"
                id="companyName"
                placeholder="상호명을 입력하세요"
                onChange={this.handleChange}
              />
            </FormGroup>
          </Form>

          <Label for="companyRegistrationNumber">
            <strong>사업자등록번호</strong>
          </Label>
          <Button
            color="warning"
            className="ml-3"
            size="sm"
            onClick={this.handleClick}
          >
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
                <div>사업자등록번호 중복입니다</div>
              ) : (
                <div>
                  {this.state.companyRegNum_Success === true ? (
                    <div>사업자등록번호 중복확인 완료되었습니다</div>
                  ) : null}
                </div>
              )}
            </div>
            <FormGroup>
              <Label for="corporateRegistrationNumber">
                <strong>법인등록번호</strong>
              </Label>
              <Input
                type="text"
                name="corporateRegistrationNumber"
                id="corporateRegistrationNumber"
                placeholder="법인등록번호를 입력하세요"
                onChange={this.handleChange}
              />
            </FormGroup>
          </Form>

          <Label for="Email">
            <strong>이메일</strong>
          </Label>
          {/* <Button
            color="warning"
            className="ml-3"
            size="sm"
            onChange={this.handleClick}
          >
            이메일 인증
          </Button> */}

          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="이메일을 입력하세요"
                onChange={this.email_Checking}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Password">
                <strong>비밀번호</strong>
              </Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="비밀번호를 입력하세요"
                onChange={this.password_Checking}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Password">
                <strong>비밀번호 확인</strong>
              </Label>
              <Input
                type="password"
                name="password"
                id="password_check"
                placeholder="비밀번호를 입력하세요"
                onChange={this.password_Checking}
              />
              <div>
                {this.state.isNoPassWord === false ? null : (
                  <div>
                    {this.state.isPassWordCheck === false ? (
                      <div>비밀번호가 일치하지 않습니다</div>
                    ) : (
                      <div>비밀번호가 일치합니다</div>
                    )}
                  </div>
                )}
              </div>
            </FormGroup>
            <Label>
              <strong>회원약관</strong>
            </Label>
            <Accordion>
              <AccordionSummary
                expandIcon={<BsArrowDown />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="additional-actions1-header"
              >
                <FormControlLabel
                  aria-label="Acknowledge"
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                  control={<Checkbox onChange={this.handleAgree1} />}
                  label="약관에 동의합니다."
                />
              </AccordionSummary>
              <AccordionDetails>
                <div style={AgreedStyle}>
                  <Typography color="textSecondary">
                    제 1 장 총칙
                    <br></br>
                    <br></br>
                    제1조(목적)
                    <br></br>
                    <br></br>이 약관은 A2B2(이하 "회사")이 운영하는 FANDING(이하
                    "팬딩"라 한다)를 이용함에 있어 회사와 이용자의 권리. 의무,
                    책임사항 및 기타 필요한 사항을 규정함을 목적으로 합니다.
                    <br></br>
                    <br></br>제 2 조 (약관의 효력과 변경)
                    <br></br>
                    <br></br>
                    1. 귀하가 본 약관 내용에 동의하는 경우, 팬딩의 서비스 제공
                    행위 및 귀하의 서비스 사용 행위에 본 약관이 우선적으로
                    적용됩니다.
                    <br></br>
                    2. 팬딩은 본 약관을 사전 고지 없이 변경할 수 있고, 변경된
                    약관은 팬딩 내에 공지하거나 e-mail을 통해 회원에게 공지하며,
                    공지와 동시에 그 효력이 발생됩니다. 이용자가 변경된 약관에
                    동의하지 않는 경우, 이용자는 본인의 회원등록을
                    취소(회원탈퇴)할 수 있으며 계속 사용의 경우는 약관 변경에
                    대한 동의로 간주됩니다.
                    <br></br>
                    <br></br>제 3 조 (약관 외 준칙)
                    <br></br> <br></br>
                    1. 본 약관에 명시되지 않은 사항은 전기통신기본법,
                    전기통신사업법, 정보통신윤리위원회심의규정, 정보통신
                    윤리강령, 프로그램보호법 및 기타 관련 법령의 규정에
                    의합니다.
                    <br></br>
                    <br></br>제 4 조 (용어의 정의)
                    <br></br>
                    <br></br>본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
                    <br></br>
                    1. 이용자 : 본 약관에 따라 팬딩이 제공하는 서비스를 받는 자.
                    <br></br>
                    2. 가입 : 팬딩이 제공하는 신청서 양식에 해당 정보를
                    기입하고, 본 약관에 동의하여 서비스 이용계약을 완료시키는
                    행위.
                    <br></br>
                    3. 회원 : 팬딩에 개인 정보를 제공하여 회원 등록을 한 자로서
                    팬딩이 제공하는 서비스를 이용할 수 있는 자<br></br>
                    4. 비밀번호 : 이용자와 회원ID가 일치하는지를 확인하고
                    통신상의 자신의 비밀보호를 위하여 이용자 자신이 선정한
                    문자와 숫자의 조합.
                    <br></br>
                    5. 탈퇴 : 회원이 이용계약을 종료시키는 행위.
                    <br></br>
                    <br></br>제 2 장 서비스 제공 및 이용
                    <br></br>
                    <br></br>제 5 조 (이용계약의 성립)
                    <br></br>
                    <br></br>
                    1. 이용계약은 신청자가 온라인으로 팬딩에서 제공하는 소정의
                    가입신청 양식에서 요구하는 사항을 기록하여 가입을 완료하는
                    것으로 성립됩니다.
                    <br></br>
                    2. 팬딩은 다음 각 호에 해당하는 이용계약에 대하여는 가입을
                    취소할 수 있습니다.
                    <br></br>
                    1) 다른 사람의 명의를 사용하여 신청하였을 때<br></br>
                    2) 이용계약 신청서의 내용을 허위로 기재하였거나 신청하였을
                    때<br></br>
                    3) 다른 사람의 팬딩 서비스 이용을 방해하거나 그 정보를
                    도용하는 등의 행위를 하였을 때<br></br>
                    4) 팬딩을 이용하여 법령과 본 약관이 금지하는 행위를 하는
                    경우
                    <br></br>
                    5) 기타 팬딩이 정한 이용신청요건이 미비 되었을 때<br></br>
                    <br></br>제 6 조 (회원정보 사용에 대한 동의)
                    <br></br>
                    <br></br>
                    1. 회원의 개인정보는 공공기관의 개인정보보호에 관한 법률에
                    의해 보호됩니다.
                    <br></br>
                    2. 회원 정보는 다음과 같이 사용, 관리, 보호됩니다.
                    <br></br>
                    1) 개인정보의 사용 : 팬딩은 서비스 제공과 관련해서 수집된
                    회원의 신상정보를 본인의 승낙 없이 제3자에게 누설, 배포하지
                    않습니다. 단, 전기통신기본법 등 법률의 규정에 의해
                    국가기관의 요구가 있는 경우, 범죄에 대한 수사상의 목적이
                    있거나 정보통신윤리 위원회의 요청이 있는 경우 또는 기타
                    관계법령에서 정한 절차에 따른 요청이 있는 경우, 귀하가
                    팬딩에 제공한 개인정보를 스스로 공개한 경우에는 그러하지
                    않습니다.
                    <br></br>
                    2) 개인정보의 관리 : 귀하는 개인정보의 보호 및 관리를 위하여
                    서비스의 개인정보관리에서 수시로 귀하의 개인정보를
                    수정/삭제할 수 있습니다.
                    <br></br>
                    3) 개인정보의 보호 : 귀하의 개인정보는 오직 귀하만이
                    열람/수정/삭제 할 수 있으며, 이는 전적으로 귀하의 ID와
                    비밀번호에 의해 관리되고 있습니다. 따라서 타인에게 본인의
                    ID와 비밀번호를 알려주어서는 안되며, 작업 종료 시에는 반드시
                    로그아웃 해주시기 바랍니다.
                    <br></br>
                    3. 회원이 본 약관에 따라 이용신청을 하는 것은, 팬딩이
                    신청서에 기재된 회원정보를 수집, 이용하는 것에 동의하는
                    것으로 간주됩니다.
                    <br></br>
                    <br></br>제 7 조 (사용자의 정보 보안)
                    <br></br>
                    <br></br>
                    1. 가입 신청자가 팬딩 서비스 가입 절차를 완료하는 순간부터
                    귀하는 입력한 정보의 비밀을 유지할 책임이 있으며, 회원의
                    ID와 비밀번호를 사용하여 발생하는 모든 결과에 대한 책임은
                    회원 본인에게 있습니다.
                    <br></br>
                    2. ID와 비밀번호에 관한 모든 관리의 책임은 회원에게 있으며,
                    회원의 ID나 비밀번호가 부정하게 사용되었다는 사실을 발견한
                    경우에는 즉시 팬딩에 신고하여야 합니다. 신고를 하지 않음으로
                    인한 모든 책임은 회원 본인에게 있습니다.
                    <br></br>
                    3. 이용자는 팬딩 서비스의 사용 종료 시 마다 정확히 접속을
                    종료해야 하며, 정확히 종료하지 아니함으로써 제3자가 귀하에
                    관한 정보를 이용하게 되는 등의 결과로 인해 발생하는 손해 및
                    손실에 대하여 팬딩은 책임을 부담하지 아니합니다.
                    <br></br>
                    <br></br>제 8 조 (서비스의 중지)
                    <br></br>
                    <br></br>
                    1. 팬딩은 이용자가 본 약관의 내용에 위배되는 행동을 한 경우,
                    임의로 서비스 사용을 제한 및 중지할 수 있습니다.
                    <br></br>
                    <br></br>제 9 조 (서비스의 변경 및 해지)
                    <br></br>
                    <br></br>
                    1. 팬딩은 귀하가 서비스를 이용하여 기대하는 손익이나
                    서비스를 통하여 얻은 자료로 인한 손해에 관하여 책임을 지지
                    않으며, 회원이 본 서비스에 게재한 정보, 자료, 사실의 신뢰도,
                    정확성 등 내용에 관하여는 책임을 지지 않습니다.
                    <br></br>
                    2. 팬딩은 서비스 이용과 관련하여 가입자에게 발생한 손해 중
                    가입자의 고의, 과실에 의한 손해에 대하여 책임을 부담하지
                    아니합니다.
                    <br></br>
                    <br></br>제 10 조 (게시물의 저작권)
                    <br></br>
                    <br></br>
                    1. 귀하가 게시한 게시물의 내용에 대한 권리는 귀하에게
                    있습니다.
                    <br></br>
                    2. 팬딩은 게시된 내용을 사전 통지 없이 편집, 이동할 수 있는
                    권리를 보유하며, 게시판 운영원칙에 따라 사전 통지 없이
                    삭제할 수 있습니다.
                    <br></br>
                    3. 귀하의 게시물이 타인의 저작권을 침해함으로써 발생하는 민,
                    형사상의 책임은 전적으로 귀하가 부담하여야 합니다.
                    <br></br>
                    4. 팬딩이 작성한 저작물에 대한 저작권 기타 지적재산권은
                    팬딩에 귀속합니다.
                    <br></br>
                    5. 이용자는 팬딩을 이용함으로써 얻은 정보를 팬딩의 사전 승낙
                    없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여
                    영리목적으로 이용하거나 제3자에게 이용하게 하여서는
                    안됩니다.
                    <br></br>
                    <br></br>제 11 조 (광고주와의 거래)
                    <br></br>
                    <br></br>
                    팬딩은 본 서비스상에 게재되어 있거나 본 서비스를 통한
                    광고주의 판촉활동에 회원이 참여하거나 교신 또는 거래의
                    결과로서 발생하는 모든 손실 또는 손해에 대해 책임을 지지
                    않습니다.
                    <br></br>
                    <br></br>제 3 장 의무 및 책임
                    <br></br>
                    <br></br>제 12 조 (팬딩의 의무)
                    <br></br>
                    <br></br>
                    1. 팬딩은 회원의 개인 신상 정보를 본인의 승낙 없이 타인에게
                    누설, 배포하지 않습니다. 다만, 전기통신관련법령 등
                    관계법령에 의하여 관계 국가기관 등의 요구가 있는 경우에는
                    그러하지 아니합니다.
                    <br></br>
                    <br></br>제 13 조 (회원의 의무)
                    <br></br>
                    <br></br>
                    1. 회원 가입 시에 요구되는 정보는 정확하게 기입하여야
                    합니다. 또한 이미 제공된 귀하에 대한 정보가 정확한 정보가
                    되도록 유지, 갱신하여야 하며, 회원은 자신의 ID 및 비밀번호를
                    제3자에게 이용하게 해서는 안됩니다.
                    <br></br>
                    2. 회원은 팬딩의 사전 승낙 없이 서비스를 이용하여 어떠한
                    영리행위도 할 수 없습니다.
                    <br></br>
                    <br></br>제 4 장 기타
                    <br></br>
                    <br></br>제 14 조 (양도금지)
                    <br></br>
                    <br></br>
                    1. 회원이 서비스의 이용권한, 기타 이용계약 상 지위를
                    타인에게 양도, 증여할 수 없습니다.
                    <br></br>
                    <br></br>제 15 조 (손해배상)
                    <br></br>
                    <br></br>
                    1. 팬딩은 무료로 제공되는 서비스와 관련하여 회원에게 어떠한
                    손해가 발생하더라도 팬딩이 고의로 행한 범죄행위를 제외하고
                    이에 대하여 책임을 부담하지 아니합니다.
                    <br></br>
                    <br></br>제 16 조 (면책조항)
                    <br></br>
                    <br></br>
                    1. 팬딩은 회원이나 제3자에 의해 표출된 의견을 승인하거나
                    반대하거나 수정하지 않습니다. 팬딩은 어떠한 경우라도 회원이
                    서비스에 담긴 정보에 의존해 얻은 이득이나 입은 손해에 대해
                    책임이 없습니다.
                    <br></br>
                    2. 팬딩은 회원간 또는 회원과 제3자간에 서비스를 매개로 하여
                    물품거래 혹은 금전적 거래 등과 관련하여 어떠한 책임도
                    부담하지 아니하고, 회원이 서비스의 이용과 관련하여 기대하는
                    이익에 관하여 책임을 부담하지 않습니다.
                    <br></br>
                    <br></br>제 17 조 (재판관할)
                    <br></br>
                    <br></br>
                    1. 팬딩과 이용자간에 발생한 전자거래 분쟁에 관한 소송은
                    민사소송법상의 관할법원에 제기합니다.
                    <br></br>
                    2. 팬딩과 이용자간에 제기된 전자거래 소송에는 한국 법을
                    적용합니다.
                    <br></br>
                  </Typography>
                </div>
              </AccordionDetails>
            </Accordion>
            <br></br>
            <Label>
              <strong>개인정보처리방침안내</strong>
            </Label>
            <Accordion>
              <AccordionSummary
                expandIcon={<BsArrowDown />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="additional-actions1-header"
              >
                <FormControlLabel
                  aria-label="Acknowledge"
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                  control={<Checkbox onChange={this.handleAgree2} />}
                  label="약관에 동의합니다."
                />
              </AccordionSummary>
              <AccordionDetails>
                <div style={AgreedStyle}>
                  <Typography text-overflow="auto" color="textSecondary">
                    ('FANDING'이하 '팬딩')은 개인정보보호법에 따라 이용자의
                    개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의
                    고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고
                    있습니다.
                    <br></br>
                    <br></br>
                    팬딩은 회사는 개인정보처리방침을 개정하는 경우 웹사이트
                    공지사항(또는 개별공지)을 통하여 공지할 것입니다.
                    <br></br>
                    <br></br>○ 본 방침은부터 2020년 12월 14일부터 시행됩니다.
                    <br></br>
                    <br></br>
                    1. 개인정보의 처리 목적
                    <br></br>
                    팬딩은 개인정보를 다음의 목적을 위해 처리합니다. 처리한
                    개인정보는 다음의 목적이외의 용도로는 사용되지 않으며 이용
                    목적이 변경될 시에는 사전동의를 구할 예정입니다.
                    <br></br>
                    가. 홈페이지 회원가입 및 관리
                    <br></br>
                    회원 가입의사 확인, 회원제 서비스 제공에 따른 본인
                    식별·인증, 회원자격 유지·관리, 제한적 본인확인제 시행에 따른
                    본인확인, 서비스 부정이용 방지, 각종 고지·통지, 고충처리,
                    분쟁 조 정을 위한 기록 보존 등을 목적으로 개인정보를
                    처리합니다.
                    <br></br>
                    나. 민원사무 처리
                    <br></br>
                    민원인의 신원 확인, 민원사항 확인, 사실조사를 위한
                    연락·통지, 처리결과 통보 등을 목적으로 개인정보를
                    처리합니다.
                    <br></br>
                    다. 재화 또는 서비스 제공
                    <br></br>
                    물품배송 등을 목적으로 개인정보를 처리합니다.
                    <br></br>
                    라. 마케팅 및 광고에의 활용
                    <br></br>
                    신규 서비스(제품) 개발 및 맞춤 서비스 제공, 접속빈도 파악
                    또는 회원의 서비스 이용에 대한 통계 등을 목적으로 개인정보를
                    처리합니다.
                    <br></br>
                    <br></br>
                    2. 개인정보 파일 현황
                    <br></br>
                    <br></br>
                    (1) 개인정보 파일명 : 팬딩
                    <br></br>
                    1) 개인정보 항목 : 이메일, 비밀번호, 로그인ID, 이름, 별명,
                    주소, 휴대폰번호
                    <br></br>
                    2) 수집방법 : 홈페이지
                    <br></br>
                    3) 보유근거 : 표준 개인정보 보호지침
                    <br></br>
                    4) 보유기간 : 탈퇴시
                    <br></br>
                    5) 관련법령
                    <br></br>- 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년
                    <br></br>- 대금결제 및 재화 등의 공급에 관한 기록 : 5년
                    <br></br>
                    <br></br>
                    3. 개인정보의 처리 및 보유 기간
                    <br></br>
                    <br></br>① 팬딩은 법령에 따른 개인정보 보유·이용기간 또는
                    정보주체로부터 개인정보를 수집시에 동의 받은 개인정보
                    보유,이용기간 내에서 개인정보를 처리, 보유합니다.
                    <br></br>② 각각의 개인정보 처리 및 보유 기간은 다음과
                    같습니다.
                    <br></br>
                    (1) 재화 또는 서비스 제공
                    <br></br>
                    제화 또는 서비스 제공와 관련한 개인정보는 수집.이용에 관한
                    동의일로부터 탈퇴시까지 위 이용목적을 위하여
                    보유.이용됩니다.
                    <br></br>
                    -보유근거 : 표준 개인정보 보호지침
                    <br></br>
                    -관련법령 : 1)소비자의 불만 또는 분쟁처리에 관한 기록 : 3년
                    <br></br>
                    (2) 대금결제 및 재화 등의 공급에 관한 기록 : 5년
                    <br></br>
                    <br></br>
                    4. 개인정보의 제3자 제공에 관한 사항
                    <br></br>
                    <br></br>① 팬딩은 정보주체의 동의, 법률의 특별한 규정 등
                    개인정보 보호법 제17조 및 제18조에 해당하는 경우에만
                    개인정보를 제3자에게 제공합니다.
                    <br></br>
                    <br></br>
                    5. 개인정보처리 위탁
                    <br></br>
                    <br></br>① 팬딩은 원칙적으로 이용자의 동의없이 해당
                    개인정보의 처리를 타인에게 위탁하지 않습니다. 다만, 이용자의
                    동의를 받아 팬딩이 현재 개인정보 처리를 위탁
                    <br></br>
                    하는 사항은 다음과 같습니다.
                    <br></br>
                    (1) 수탁기관명 : KG이니시스
                    <br></br>
                    대상고객 : 회원
                    <br></br>
                    위탁업무 내용 : 결제대행 서비스
                    <br></br>
                    위탁기간 : 개인정보 보유 기간
                    <br></br>② 팬딩은 위탁계약 체결시 개인정보 보호법 제25조에
                    따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적․관리적
                    보호조치, 재위탁 제한, 수탁자에 대한 관리․감독
                    <br></br>, 손해배상 등 책임에 관한 사항을 계약서 등 문서에
                    명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고
                    있습니다.
                    <br></br>③ 위탁업무의 내용이나 수탁자가 변경될 경우에는
                    지체없이 본 개인정보 처리방침을 통하여 공개하도록
                    하겠습니다.
                    <br></br>
                    <br></br>
                    6. 정보주체와 법정대리인의 권리·의무 및 그 행사방법 이용자는
                    개인정보주체로써 다음과 같은 권리를 행사할 수 있습니다.
                    <br></br>
                    <br></br>① 정보주체는 팬딩 대해 언제든지 개인정보
                    열람,정정,삭제,처리정지 요구 등의 권리를 행사할 수 있습니다.
                    <br></br>② 제1항에 따른 권리 행사는 팬딩 에 대해 개인정보
                    보호법 시행령 제41조제1항에 따라 서면, 전자우편,
                    모사전송(FAX) 등을 통하여 하실 수 있으며 팬딩은
                    <br></br>
                    이에 대해 지체 없이 조치하겠습니다.
                    <br></br>③ 제1항에 따른 권리 행사는 정보주체의
                    법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수
                    있습니다. 이 경우 개인정보 보호법 시행규칙 별지 제11호
                    서식에 따른 위임장을 제출
                    <br></br>
                    하셔야 합니다.
                    <br></br>④ 개인정보 열람 및 처리정지 요구는 개인정보보호법
                    제35조 제5항, 제37조 제2항에 의하여 정보주체의 권리가 제한
                    될 수 있습니다.
                    <br></br>⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그
                    개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를
                    요구할 수 없습니다.
                    <br></br>⑥ 팬딩 은 정보주체 권리에 따른 열람의 요구,
                    정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가
                    본인이거나 정당한 대리인인지를 확인합니다.
                    <br></br>
                    <br></br>
                    7. 처리하는 개인정보의 항목 작성
                    <br></br>
                    <br></br>① 팬딩은 다음의 개인정보 항목을 처리하고 있습니다.
                    <br></br>
                    (1)제화 또는 서비스 제공
                    <br></br>- 필수항목 : 이메일, 비밀번호, 로그인ID, 이름,
                    별명, 휴대폰번호, 주소
                    <br></br>
                    <br></br>
                    8. 팬딩은 원칙적으로 개인정보 처리목적이 달성된 경우에는
                    지체없이 해당 개인정보를 파기합니다. 파기의 절차, 기한 및
                    방법은 다음과 같습니다.
                    <br></br>
                    <br></br>① 파기절차
                    <br></br>
                    이용자가 입력한 정보는 목적 달성 후 별도의 DB에
                    옮겨져(종이의 경우 별도의 서류) 내부 방침 및 기타 관련
                    법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다. 이 때
                    <br></br>, DB로 옮겨진 개인정보는 법률에 의한 경우가
                    아니고서는 다른 목적으로 이용되지 않습니다.
                    <br></br>② 파기기한
                    <br></br>
                    이용자의 개인정보는 개인정보의 보유기간이 경과된 경우에는
                    보유기간의 종료일로부터 5일 이내에, 개인정보의 처리 목적
                    달성, 해당 서비스의 폐지, 사업의 종료 등 그 개인정보가 불필
                    <br></br>
                    요하게 되었을 때에는 개인정보의 처리가 불필요한 것으로
                    인정되는 날로부터 5일 이내에 그 개인정보를 파기합니다.
                    <br></br>
                    ③파기방법
                    <br></br>
                    전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적
                    방법을 사용합니다.
                    <br></br>
                    종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여
                    파기합니다.
                    <br></br>
                    <br></br>
                    9. 개인정보 자동 수집 장치의 설치•운영 및 거부에 관한 사항
                    <br></br>
                    <br></br>① 팬딩 은 개별적인 맞춤서비스를 제공하기 위해
                    이용정보를 저장하고 수시로 불러오는 ‘쿠기(cookie)’를
                    사용합니다. ② 쿠키는 웹사이트를 운영하는데 이용되는
                    서버(http)
                    <br></br>가 이용자의 컴퓨터 브라우저에게 보내는 소량의
                    정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도
                    합니다. 가. 쿠키의 사용 목적 : 이용자가 방문한 각 서비스와
                    웹 사이트들
                    <br></br>에 대한 방문 및 이용형태, 인기 검색어, 보안접속
                    여부, 등을 파악하여 이용자에게 최적화된 정보 제공을 위해
                    사용됩니다. 나. 쿠키의 설치•운영 및 거부 : 웹브라우저 상단의
                    도구-인터
                    <br></br>넷 옵션-개인정보 메뉴의 옵션 설정을 통해 쿠키
                    저장을 거부 할 수 있습니다. 다. 쿠키 저장을 거부할 경우
                    맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.
                    <br></br>
                    <br></br>
                    10. 개인정보 처리방침 변경
                    <br></br>
                    <br></br>① 이 개인정보처리방침은 시행일로부터 적용되며, 법령
                    및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는
                    변경사항의 시행 7일 전부터 공지사항을 통하여 고지할
                    것입니다.
                    <br></br>
                    <br></br>
                    11. 팬딩은 개인정보보호법 제29조에 따라 다음과 같이 안전성
                    확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.
                    <br></br>
                    <br></br>
                    (1) 개인정보 취급 직원의 최소화 및 교육
                    <br></br>
                    개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화
                    하여 개인정보를 관리하는 대책을 시행하고 있습니다.
                    <br></br>
                    (2) 내부관리계획의 수립 및 시행
                    <br></br>
                    개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고
                    시행하고 있습니다.
                    <br></br>
                    (3) 개인정보의 암호화
                    <br></br>
                    이용자의 개인정보는 비밀번호는 암호화 되어 저장 및 관리되고
                    있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송
                    데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의 별
                    <br></br>도 보안기능을 사용하고 있습니다.
                    <br></br>
                    (4) 개인정보에 대한 접근 제한
                    <br></br>
                    개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의
                    부여,변경,말소를 통하여 개인정보에 대한 접근통제를 위하여
                    필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부
                    로부터의 무단 접근을 통제하고 있습니다.
                    <br></br>
                    (5) 문서보안을 위한 잠금장치 사용
                    <br></br>
                    개인정보가 포함된 서류, 보조저장매체 등을 잠금장치가 있는
                    안전한 장소에 보관하고 있습니다.
                    <br></br>
                    (6) 비인가자에 대한 출입 통제
                    <br></br>
                    개인정보를 보관하고 있는 물리적 보관 장소를 별도로 두고 이에
                    대해 출입통제 절차를 수립, 운영하고 있습니다.
                    <br></br>
                  </Typography>
                </div>
              </AccordionDetails>
            </Accordion>
            <br></br>
            <Label>
              <strong>마케팅,홍보의 수집 및 이용 동의</strong>
            </Label>
            <Accordion>
              <AccordionSummary
                expandIcon={<BsArrowDown />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="additional-actions1-header"
              >
                <FormControlLabel
                  aria-label="Acknowledge"
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                  control={<Checkbox onChange={this.handleAgree3} />}
                  label="약관에 동의합니다."
                />
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="textSecondary">
                  1. 수집 정보
                  <br></br>
                  (1) 제공동의 사항 : 정보수신 여부(SMS/DM/E-mail)
                  <br></br>
                  (2) 수집목적 : 재화나 서비스 홍보, 안내, 마케팅 제공
                  <br></br>
                  (3) 수집항목 : 성명, HP, E-mail, 주소
                  <br></br>
                  (4) 보유 및 이용기간 : 회원탈퇴시 까지 보유
                  <br></br>* 개인정보 수집 이용에 동의를 거부할 권리가 있으며,
                  동의 거부시 회원가입이 불가 합니다.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <br></br>
            <Button className="mx-auto" size="lg">
              가입하기
            </Button>
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
