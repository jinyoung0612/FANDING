import React from 'react';
//import { NavLink } from 'react-router-dom';
import {
  NavItem,
  NavLink

} from 'reactstrap';

const SignedOutLinks = () => {
  return (

    
      <ul className="navbar-nav">
      <NavItem>
          <NavLink href="/signin">로그인</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/signup">회원가입</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/signupcom">업체 회원가입</NavLink>
      </NavItem>
      </ul>
   
  )
}

export default SignedOutLinks;