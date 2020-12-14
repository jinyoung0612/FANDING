import React from 'react';

const SignedOutLinks = () => {
  return (

    <ul class="navbar-nav nav-dropdown" data-app-modern-menu="true">
      <li class="nav-item">
        <a class="nav-link link text-black display-4" href="/signin">로그인</a>
      </li>
      <li class="nav-item">
        <a class="nav-link link text-black display-4" href="/signuproot">회원가입</a>
      </li>

    </ul>
      
   
  )
}

export default SignedOutLinks;
