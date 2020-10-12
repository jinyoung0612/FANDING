import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,

} from 'reactstrap';



const NavbarTest = (props) => {
  //const [isOpen, setIsOpen] = useState(false);

  //const toggle = () => setIsOpen(!isOpen);
  const { auth, profile } = props;
  const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;

  return (

    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">FANDING</NavbarBrand>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="#">리워드펀딩</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">모금펀딩</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">업체펀딩</NavLink>
            </NavItem>
        </Nav>

        <Nav className="ml-auto" navbar>
        {links}
        </Nav>

      </Navbar>
    </div>
  );

}

const mapStateToProps = (state) => {
    // console.log(state);
    return{
      auth: state.firebase.auth,
      profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(NavbarTest)