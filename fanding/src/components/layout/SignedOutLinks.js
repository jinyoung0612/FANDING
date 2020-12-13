import React from 'react';
//import { NavLink } from 'react-router-dom';
import {
  NavItem,
  NavLink

} from 'reactstrap';

const SignedOutLinks = () => {
  return (

    <ul class="navbar-nav nav-dropdown" data-app-modern-menu="true">
      <li class="nav-item">
        <a class="nav-link link text-black display-4" href="/signin">로그인</a>
      </li>
      <li class="nav-item">
        <a class="nav-link link text-black display-4" href="/signuproot">회원가입</a>
      </li>

      {/* <li class="nav-item">
        <a class="nav-link link text-black display-4" href="/signupcom">업체 회원가입</a>
      </li> */}
    </ul>
      
   
  )
}

export default SignedOutLinks;

{/* <ul className="navbar-nav">



      <NavItem>
          <NavLink href="/signin">로그인</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/signup">회원가입</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/signupcom">업체 회원가입</NavLink>
      </NavItem>
      </ul> */}