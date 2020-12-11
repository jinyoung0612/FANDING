import React, { Component, useEffect, useState } from "react";
import { Container, Row } from "reactstrap";
import SideBarAdmin from "./SideBarAdmin";
import { connect } from "react-redux";

const AdminDashBoard = (props) => {
  if (props.auth.isLoaded) {
    return (
      <>
        <section class="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
          <Container>
            <Row>
              <SideBarAdmin />
              <div>
                <h4 style={{ paddingTop: "28px", paddingLeft: "25px" }}>
                  FANDING ADMIN DASHBOARD{" "}
                </h4>
              </div>
            </Row>
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

export default connect(mapStateToProps)(AdminDashBoard);
