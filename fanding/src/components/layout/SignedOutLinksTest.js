import React from 'react';
//import { NavLink } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink

} from 'reactstrap';

const SignedOutLinksTest = () => {
  return (
    
      <ul className="navbar-nav">
      <NavItem>
          <NavLink href="/signin">로그인</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/signup">회원가입</NavLink>
      </NavItem>
      </ul>
    

  )
}

export default SignedOutLinksTest;