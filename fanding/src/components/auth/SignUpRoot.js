import React, {Component} from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Row, Col } from "reactstrap";
import { BsFillPeopleFill } from  "react-icons/bs";
import { MdStore } from "react-icons/md"

const ColoredLine = ({ color }) => (
    <hr
      style={{
        width: "3px",
        color: color,
        backgroundColor: color,
        height: "100%"
      }}
    />
  );

  class SignUpRoot extends Component {

    render() {
        const { auth, authError } = this.props;
        if (auth.uid) return <Redirect to="/" />;

        return (
            <section className="form7 cid-sgu5krdF9y" id="form7-t">
                <div className="container">
                    <div className="mbr-section-head mt-30">
                        <h3 className="mbr-section-title mbr-fonts-style  mb-0 display-2">
                            <strong> 회원가입 </strong></h3>
                        <br/>
                        <p >팬딩 신규회원 가입하고 다양한 KPOP 펀딩을 경험해보세요 :)</p>
                    </div>
                    <br/><br/>
                    <div className="row justify-content-center mt-4">
                        <div className="col-lg-8 mx-auto mbr-form" data-form-type="formoid">
                            <Row>
                                <Col className="align-center">
                                <h4 className="mbr-fonts-style align-center">
                                    <strong> 일반 사용자 </strong></h4>
                                    <br/>
                                    <BsFillPeopleFill size={150} style={{ fill: "orange" }} className="mr-3" />
                                    <Button outline color="secondary" href="/signup"> 가입하기 </Button>
                                </Col>
                                
                                <Col className="align-center">
                                <h4 className="mbr-fonts-style align-center">
                                    <strong> 업체 </strong></h4>
                                    <br/>
                                    <MdStore size={150} style={{ fill: "green" }} className="mr-3" />
                                    <Button outline color="secondary" href="/signupcom"> 가입하기 </Button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <br/><br/><br/>
                    <div className="row justify-content-center mt-4">
                        <p>이미 FANDING의 회원이신가요? <a style={{textDecoration: "underline", color:"blue"}} href="/signin" >로그인</a></p>
                    </div>
                </div>
            </section>
        )
    }
  }

  const mapStateToProps = (state) => {
    return {
      authError: state.auth.authError,
      auth: state.firebase.auth,
    };
  };

  export default connect(mapStateToProps)(SignUpRoot);