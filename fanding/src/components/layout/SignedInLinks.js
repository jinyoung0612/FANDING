import React from 'react'
//import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import { NavLink, NavItem, Button } from 'reactstrap';
import {BsPeopleCircle, BsBell} from "react-icons/bs"


// const SignedInLinks = (props) => {
//   return (
//     <div>
//       <ul className="right">
//         <li><NavLink to='/create'>New Project</NavLink></li>
//         <li><a onClick={props.signOut}>Log Out</a></li>
//         <li><NavLink to='/' className="btn btn-floating pink lighten-1">
//           {props.profile.initials}
//         </NavLink></li>
//       </ul>
//     </div>
//   )
// }

const SignedInLinks = (props) => {
    return (
      

          <>
          <NavItem>
            <NavLink href="#"><BsBell size={24}/></NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/myaccount"><BsPeopleCircle size={24}/></NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="/create_funding"><Button outline color="info">펀딩 생성</Button></NavLink>
          </NavItem>

          <NavLink href='/' onClick={props.signOut} >로그아웃</NavLink>
          </>
      
    )
  }

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)