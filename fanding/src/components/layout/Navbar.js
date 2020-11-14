import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";

import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button, Media } from "reactstrap";

import { BsPeopleCircle, BsBell } from "react-icons/bs";


const NavbarTest = (props) => {
  //const [isOpen, setIsOpen] = useState(false);

  //const toggle = () => setIsOpen(!isOpen);
  const { auth, profile } = props;
  const links = auth.uid ? (
    <SignedInLinks profile={profile} />
  ) : (
    <SignedOutLinks />
  );

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">FANDING</NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/reward_funding">리워드 펀딩</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/collect_funding">모금 펀딩</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/find_company">업체 찾기</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/payment">결제</NavLink>
          </NavItem>
        </Nav>

        <Nav className="ml-auto" navbar>
          {links}

          
        </Nav>
      </Navbar>
      
      {/*
        <img src="fanding_main_image.png" class="img-fluid" alt="Responsive image" />
        <img src="fanding_main_image.png" alt="fanding_main" width="500" height="600" />
      */
      }
      
      
    </div>
  );
};

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(NavbarTest);
