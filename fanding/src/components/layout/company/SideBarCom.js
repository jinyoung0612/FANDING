import React, {useState} from "react";
import { NavItem, NavLink, Nav, Collapse } from "reactstrap";
import { BsPersonCheckFill, BsFileText, BsCreditCard, BsBuilding } from "react-icons/bs";
import classNames from "classnames";
import { Link } from "react-router-dom";

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



const SideBarCom = ({ isOpen, toggle }) => (
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
          <NavLink size={12} className="inactive" activeClassName="active" tag={Link} to={"/myCompany"}>
            <BsPersonCheckFill className="mr-2" />
            {/* <FontAwesomeIcon icon={faBriefcase} className="mr-2" /> */}
            내 업체 관리
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="inactive" activeClassName="active" tag={Link} to={"/payment"}>
            <BsCreditCard className="mr-2" />
            결제
          </NavLink>
        </NavItem>
        <NavItem>
        <SubMenu title="펀딩 관리" icon={BsFileText} items={submenus[0]} />
          <NavLink className="inactive" activeClassName="active" tag={Link} to={"/faq"}>
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  </div>
);

const submenus = [
  [
    {
      title: "지원한 펀딩 관리",
      target: "myAppliedFunding",
    },
    {
      title: "진행한 펀딩 관리",
      target: "myOngoingFunding",
    },
  ],
];

export default SideBarCom;

