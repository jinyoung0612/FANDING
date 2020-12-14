import React, {useState, Component} from "react";
import { NavItem, NavLink, Nav, Collapse, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from "reactstrap";
import { FaTools } from "react-icons/fa";
import { BsPersonCheckFill, BsFileText, BsFillHeartFill, BsBuilding } from "react-icons/bs";
import { Link } from "react-router-dom";
import styles from './SideBar.css';


  
const TopNavbar = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpen2, setDropdownOpen2] = useState(false);
    const toggle = () => setDropdownOpen(!dropdownOpen);
    const toggle2 = () => setDropdownOpen2(!dropdownOpen2);
    return(
      <div className="top-navbar">
      <Nav pills className="mb-5">
          <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle nav caret>
            내 정보
          </DropdownToggle>
          <DropdownMenu>
            {/* <DropdownItem header>내 정보</DropdownItem> */}
            <DropdownItem>
            <NavLink className="inactive" activeClassName="active" tag={Link} to={"/myaccount"}>
              <FaTools className="mr-2" />
              {/* <FontAwesomeIcon icon={faBriefcase} className="mr-2" /> */}
              내 정보 관리
            </NavLink>
            </DropdownItem>
            <DropdownItem>
            <NavLink className="inactive" activeClassName="active" tag={Link} to={"/chongdae"}>
              <BsPersonCheckFill className="mr-2" />
              총대 인증
            </NavLink>
          </DropdownItem>
          </DropdownMenu>
          </Dropdown>

          <Dropdown nav isOpen={dropdownOpen2} toggle={toggle2} className="ml-4">
          <DropdownToggle nav caret>
            펀딩 관리
          </DropdownToggle>
          <DropdownMenu>
            {/* <DropdownItem header>내 정보</DropdownItem> */}
            <DropdownItem>
            <NavLink className="inactive" activeClassName="active" tag={Link} to={"/myFunding_created"}>
            <BsFileText className="mr-2" />
              내가 만든 펀딩
            </NavLink>
            </DropdownItem>
            <DropdownItem>
            <NavLink className="inactive" activeClassName="active" tag={Link} to={"/myFunding_participated"}>
              <BsFileText className="mr-2" />
              내가 참여한 펀딩
            </NavLink>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem>
          <NavLink className="inactive" activeClassName="active" tag={Link} to={"/myRecruit"}>
            <BsBuilding className="mr-2" />
            업체 모집글 관리
          </NavLink>
          </DropdownItem>
          </DropdownMenu>

           
        </Dropdown>
        <NavItem className="ml-4">
            <NavLink className="inactive" activeClassName="active" tag={Link} to={"/myaccount"}>
              <BsFillHeartFill className="mr-2" />
              위시리스트
            </NavLink>
          </NavItem>
        </Nav>
        </div>
    )
        
       
    // </div>
  };

  export default TopNavbar;