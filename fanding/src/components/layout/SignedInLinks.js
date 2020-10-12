import React from 'react'
//import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import { NavLink } from 'reactstrap';
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
      <ul className="right">
      
          {/* <li><NavLink to='/'>New Project</NavLink></li> */}
          {/* <li><a onClick={props.signOut}>Log Out</a></li> */}

          <li><NavLink href='/'>New Project</NavLink></li>
          <li><NavLink href='/' onClick={props.signOut} >Logout</NavLink></li>
          {/* <li><NavLink href='/'>Logout</NavLink></li> */}


      </ul>
    )
  }

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)