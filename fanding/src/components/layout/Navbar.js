import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';

import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button, Media, FormGroup,Label,Input,InputGroup,InputGroupButtonDropdown,DropdownToggle,DropdownMenu,DropdownItem,InputGroupAddon } from "reactstrap";

import { BsPeopleCircle, BsBell,BsSearch } from "react-icons/bs";
import styles from "./Navbar.module.css";
import {SearchBar} from "./MainPageDefault";


const NavbarTest = (props) => {
  //const [isOpen, setIsOpen] = useState(false);

  //const toggle = () => setIsOpen(!isOpen);
  const { auth, profile } = props;
  const links = auth.uid ? (
    <SignedInLinks profile={profile} />
  ) : (
    <SignedOutLinks />
  );

    const history = useHistory();


    return (
    // <section className={styles.Section}>
    // <div>
    //   <Navbar className={styles.Navbar} fixed="top" light expand="lg">
    //     <NavbarBrand href="/">FANDING</NavbarBrand>
    //     <Nav className="mr-auto" navbar>
    //       <NavItem>
    //         <NavLink href="/reward_funding">리워드 펀딩</NavLink>
    //       </NavItem>
    //       <NavItem>
    //         <NavLink href="/collect_funding">모금 펀딩</NavLink>
    //       </NavItem>
    //       <NavItem>
    //         <NavLink href="/find_company">업체 찾기</NavLink>
    //       </NavItem>
    //       <NavItem>
    //         <NavLink href="/payment">결제</NavLink>
    //       </NavItem>
    //     </Nav>

    //     <Nav className="ml-auto" navbar>
    //       {links}

          
    //     </Nav>
    //   </Navbar>
      
    //   {/*
    //     <img src="fanding_main_image.png" class="img-fluid" alt="Responsive image" />
    //     <img src="fanding_main_image.png" alt="fanding_main" width="500" height="600" />
    //   */
    //   }
      
      
    // </div>
    // </section>

    <section className="menu cid-s48OLK6784" once="menu" id="menu1-h">
    
    <nav className="navbar navbar-dropdown navbar-fixed-top navbar-expand-lg">
      <div class="container">
            <div class="navbar-brand"> 
                <span class="navbar-caption-wrap"><a class="navbar-caption text-black display-7" href="/">FANDING</a></span>
            </div>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <div class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav nav-dropdown mr-auto" data-app-modern-menu="true">
                  <li class="nav-item">
                    <a class="nav-link link text-black display-4" href="/reward_funding">리워드 펀딩</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link link text-black display-4" href="/collect_funding">모금 펀딩</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link link text-black display-4" href="/find_company">업체 찾기</a>
                  </li>
                  {/* <li class="nav-item">
                    <a class="nav-link link text-black display-4" href="/payment">결제</a>
                  </li> */}
                    <li style={{paddingLeft:"50px", width:"250px"}} className="nav-item">
                        <SearchBar history={history}/>
                    </li>

                  
                </ul>
                <div class="nav-item">
                  {links}
                 </div>   
            </div>
      </div>
    </nav>
    </section>

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
