import React, {useState} from "react";
import { NavItem, NavLink, Nav, Collapse } from "reactstrap";
import { FaTools } from "react-icons/fa";
import { BsPersonCheckFill, BsFileText, BsFillHeartFill, BsBuilding } from "react-icons/bs";
import classNames from "classnames";
import { Link } from "react-router-dom";
import styles from './SideBar.css';

const SubMenu = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggle = () => setCollapsed(!collapsed);
  const { icon, title, items } = props;

  return (
    <div>
      <NavItem
        onClick={toggle}
        className={classNames({ "menu-open": !collapsed })}
      >
        <NavLink className="dropdown-toggle inactive" activeClassName="active">
          <BsFileText icon={icon} className="mr-2" />
          {title}
        </NavLink>
      </NavItem>
      <Collapse
        isOpen={!collapsed}
        navbar
        className={classNames("items-menu", { "mb-1": !collapsed })}
      >
        {items.map((item, index) => (
          <NavItem key={index} className="pl-4" >
            <NavLink tag={Link} to={item.target} className="inactive" activeClassName="active">
              {item.title}
            </NavLink>
          </NavItem>
        ))}
      </Collapse>
    </div>
  );
};



const SideBar = ({ isOpen, toggle }) => (
  <div className={classNames("sidebar", { "is-open": isOpen })}>
    <div className="sidebar-header">
      <span color="info" onClick={toggle} style={{ color: "#fafafa" }}>
        &times;
      </span>
      <h3 style={{color: 'black'}}>내 정보</h3>
    </div>
    <div className="side-menu">
      <Nav vertical className="list-unstyled pb-3">
        <NavItem>
          <NavLink size={12} className="inactive" activeClassName="active" tag={Link} to={"/myaccount"}>
            <FaTools className="mr-2" />
            {/* <FontAwesomeIcon icon={faBriefcase} className="mr-2" /> */}
            내 정보 관리
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="inactive" activeClassName="active" tag={Link} to={"/chongdae"}>
            <BsPersonCheckFill className="mr-2" />
            총대 인증
          </NavLink>
        </NavItem>
        <NavItem>
        <SubMenu title="펀딩 관리" icon={BsFileText} items={submenus[0]} />
          <NavLink className="inactive" activeClassName="active" tag={Link} to={"/faq"}>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="inactive" activeClassName="active" tag={Link} to={"/myRecruit"}>
            <BsBuilding className="mr-2" />
            업체 모집글 관리
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="inactive" activeClassName="active" tag={Link} to={"/myaccount"}>
            <BsFillHeartFill className="mr-2" />
            마이 위시리스트
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  </div>
);

const submenus = [
  [
    {
      title: "내가 만든 펀딩",
      target: "myFunding_created",
    },
    {
      title: "내가 참여한 펀딩",
      target: "myFunding_participated",
    },
  ],
];

export default SideBar;

