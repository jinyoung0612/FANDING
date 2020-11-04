import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";

import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from "reactstrap";

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
            <NavLink href="#">리워드 펀딩</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">모금 펀딩</NavLink>
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

          {/*
          <NavItem>
            <NavLink href="#"><BsBell size={24}/></NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/myaccount"><BsPeopleCircle size={24}/></NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="/create_funding"><Button className="mt-4 ml-2" outline color="info">펀딩 생성</Button></NavLink>
          </NavItem>
          */}
        </Nav>
      </Navbar>
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
