import React, { Component, useEffect, useState } from "react";
import { Container, Row, Button, Col, CardText } from "reactstrap";
import SideBarCom from "./SideBarCom";
import { connect } from "react-redux";
import firebase from "firebase/app";

const MyCompany = (props) => {
  const handleClickDelete = () => {
    if (window.confirm("회원탈퇴를 진행 하시겠습니까?") === true) {
      var user = firebase.auth().currentUser;
      console.log("제발", user);
      var userDoc = firebase.auth().currentUser.email;
      console.log("제발2", userDoc);
      firebase
        .firestore()
        .collection("companies")
        .doc(userDoc)
        .delete()
        .then(function () {
          console.log("delete succeslly");
        })
        .catch(function (error) {
          console.log("error", error.message);
        });
      user
        .delete()
        .then(function () {
          alert("회원탈퇴 처리 되었습니다.");
          window.location.href = "/";
        })
        .catch(function (error) {
          console.log(error.message);
        });
    } else {
      alert("취소되었습니다.");
    }
  };
  const handleClickPasswordSearch = () => {
    var user_email = firebase.auth().currentUser.email;
    if (user_email != "") {
      firebase
        .auth()
        .sendPasswordResetEmail(user_email)
        .then(function () {
          alert("비밀번호 재설정 이메일 전송되었습니다.");
        })
        .catch(function (error) {
          console.log(error.message);
        });
    }
  };
  if (props.auth.isLoaded) {
    return (
      <>
        <section
          class="gallery5 mbr-gallery cid-sgtDmxvlJH"
          id="gallery5-q"
          style={{ paddingTop: "25px" }}
        >
          <Container>
            <Row>
              <SideBarCom />
              {/* <div>
                <h4 style={{ paddingTop: "28px", paddingLeft: "25px" }}>
                  내 정보에서는 프로필 관리, 펀딩 관리를 할 수 있습니다.{" "}
                </h4>
              </div> */}
              <Col style={{ width: "732px", paddingTop: "30px" }}>
                <CardText>
                  <b>이메일: {firebase.auth().currentUser.email}</b>
                  <Button
                    className="ml-3"
                    color="warning"
                    size="sm"
                    onClick={handleClickPasswordSearch}
                  >
                    비밀번호 수정
                  </Button>
                  <Button onClick={handleClickDelete}>회원 탈퇴</Button>
                </CardText>
              </Col>
            </Row>
            {/* <div>
              <Button
                className="ml-3"
                color="warning"
                size="sm"
                onClick={handleClickPasswordSearch}
              >
                비밀번호 수정
              </Button>
              <Button onClick={handleClickDelete}>회원 탈퇴</Button>
            </div> */}
          </Container>
        </section>
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
};

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    user_data: state.user_data,
  };
};

export default connect(mapStateToProps)(MyCompany);
