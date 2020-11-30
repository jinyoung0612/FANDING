import React from "react";
import { connect, useSelector } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import { NavLink, NavItem, Button } from 'reactstrap';
import {BsPeopleCircle, BsBell} from "react-icons/bs"
import {useFirestoreConnect} from "react-redux-firebase";
import firebase from 'firebase';


const style = {
  color: "rgb(0, 0, 0)",
  fill: "rgb(0, 0, 0)",
};
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

  useFirestoreConnect([{
    collection: 'chongdaes',
    where: [
        ['user_email','==',firebase.auth().currentUser.email]
    ]
  }]);

  const chongdae =useSelector((state)=>state.firestore.ordered.chongdaes);
  console.log(chongdae);

  const checkVerificationHandler = () => {
    if(chongdae.length>0){
      console.log("function chongdae[0]: ",chongdae[0]);
      const accessToken = chongdae[0].access_token;
      console.log(accessToken);
      
          if(accessToken!=null && accessToken!='error'){
              window.location.href = "http://localhost:3000/create_funding";
          }
          else{
              alert("총대인증이 안돼있습니다. 펀딩을 생성 하기 위해선 총대 인증을 먼저 하세요.");
              window.location.href = "http://localhost:3000/chongdae";    
          }
      }
      else{
          alert("총대인증이 안돼있습니다. 펀딩을 생성 하기 위해선 총대 인증을 먼저 하세요.");
          window.location.href = "http://localhost:3000/chongdae";
      }
  }

    return (
      

    // <NavItem>
    //   <NavLink href="/create_funding"><Button outline color="info">펀딩 생성</Button></NavLink>
    // </NavItem>

    // <NavLink href='/' onClick={props.signOut} >로그아웃</NavLink>
    // </>
    <div>
      <ul class="navbar-nav ml-auto">
        {/* <div class="icons-menu">
            <a class="iconfont-wrapper" href="/" rel="noopener noreferrer" target="_blank">
                <span class="p-2 mbr-iconfont mobi-mbri-alert mobi-mbri"></span>
            </a>
            <a class="iconfont-wrapper" href="/myaccount" rel="noopener noreferrer" target="_blank">
                <span class="p-2 mbr-iconfont mobi-mbri-user-2 mobi-mbri" style={style}></span>
            </a>
            </div> */}

        <div class="icons-menu">
          <NavItem>
            <NavLink href="/totalchat">
              <BsBell size={28} style={{ fill: "black" }} className="mr-3" />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/myaccount">
              <BsPeopleCircle style={{ fill: "black" }} size={28} />
            </NavLink>
          </NavItem>
        </div>
        <div class="navbar-buttons mbr-section-btn">
          <a class="btn btn-info display-4" onClick={checkVerificationHandler}>
            펀딩 생성
          </a>
        </div>
        <div class="navbar-buttons mbr-section-btn">
          <a class="btn btn-info display-4" href="/notice">
            공지사항
          </a>
        </div>
        
        <li className="nav-item mt-3">
          <a
            className="nav-link link text-black display-4"
            href="/"
            onClick={props.signOut}
          >
            로그아웃
          </a>
        </li>
      </ul>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
