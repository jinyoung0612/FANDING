import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import { NavLink, NavItem, Button } from "reactstrap";
import { BsPeopleCircle, BsBell, BsBellFill } from "react-icons/bs";
import { useFirestoreConnect, isLoaded } from "react-redux-firebase";
import firebase from "firebase";

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
  useFirestoreConnect([
    {
      collection: "chongdaes",
      where: [["user_email", "==", firebase.auth().currentUser.email]],
    },
  ]);
  useFirestoreConnect([
    {
      collection: "companies",
      where: [["email", "==", firebase.auth().currentUser.email]],
    },
  ]);
  const [isCompanyView, setisCompanyView] = useState(true);
  const [isadminView, setisadminView] = useState(false);
  const adminLogin = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.email === "fandingkorea@gmail.com") {
          setisadminView(true);
          setisCompanyView(false);
        } else {
          firebase
            .firestore()
            .collection("users")
            .where("user_email", "==", user.email)
            .get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                setisCompanyView(false);
              });
            });
        }
      }
    });
  };
  const [chatnotice, setChatnotice] = useState(false);
  const chatalert = () => {
    firebase
      .firestore()
      .collection("chats")
      .where("users", "array-contains", firebase.auth().currentUser.email)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // console.log(doc.id, "=>", doc.data());
          if (doc.data().receiver == firebase.auth().currentUser.email) {
            if (doc.data().readmsg == false) {
              setChatnotice(true);
            }
          }
        });
      })
      .catch(function (error) {
        console.log("error getting document :", error);
      });
  };
  // const [isCompanyView, setisCompanyView] = useState(false);
  const company = useSelector((state) => state.firestore.ordered.companies);
  useEffect(() => {
    chatalert();
    adminLogin();
  }, []);
  const chongdae = useSelector((state) => state.firestore.ordered.chongdaes);
  // const company = useSelector((state) => state.firestore.ordered.companies);

  const checkVerificationHandler = () => {
    if (chongdae.length > 0) {
      console.log("function chongdae[0]: ", chongdae[0]);
      const accessToken = chongdae[0].access_token;
      console.log(accessToken);

      if (accessToken != null && accessToken != "error") {
        window.location.href = "http://localhost:3000/create_funding";
      } else {
        alert(
          "총대인증이 안돼있습니다. 펀딩을 생성 하기 위해선 총대 인증을 먼저 하세요."
        );
        window.location.href = "http://localhost:3000/chongdae";
      }
    } else {
      alert(
        "총대인증이 안돼있습니다. 펀딩을 생성 하기 위해선 총대 인증을 먼저 하세요."
      );
      window.location.href = "http://localhost:3000/chongdae";
    }
  };
  // if (isLoaded(company) && company.length !== 0) {
  // console.log("업체");
  return (
    <div>
      <ul class="navbar-nav ml-auto">
        <div class="icons-menu">
          {chatnotice === false ? (
            <NavItem>
              <NavLink href="/totalchat">
                <BsBell size={28} style={{ fill: "black" }} className="mr-3" />
              </NavLink>
            </NavItem>
          ) : (
            <NavItem>
              <NavLink href="/totalchat">
                <BsBellFill
                  size={28}
                  style={{ fill: "red" }}
                  className="mr-3"
                />
              </NavLink>
            </NavItem>
          )}
          {isCompanyView === true ? (
            <NavItem>
              <NavLink href="/myCompany">
                <BsPeopleCircle style={{ fill: "black" }} size={28} />
              </NavLink>
            </NavItem>
          ) : isadminView === false ? (
            <NavItem>
              <NavLink href="/myaccount">
                <BsPeopleCircle style={{ fill: "black" }} size={28} />
              </NavLink>
            </NavItem>
          ) : (
            <NavItem>
              <NavLink href="/admindashboard">
                <BsPeopleCircle style={{ fill: "black" }} size={28} />
              </NavLink>
            </NavItem>
          )}
        </div>
        <div class="navbar-buttons mbr-section-btn">
          {isCompanyView === true ? null : (
            <a
              class="btn btn-info display-4"
              onClick={checkVerificationHandler}
            >
              펀딩 생성
            </a>
          )}
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
  // } else {
  //   return (
  //     <div>
  //       <ul class="navbar-nav ml-auto">
  //         <div class="icons-menu">
  //           {chatnotice === false ? (
  //             <NavItem>
  //               <NavLink href="/totalchat">
  //                 <BsBell
  //                   size={28}
  //                   style={{ fill: "black" }}
  //                   className="mr-3"
  //                 />
  //               </NavLink>
  //             </NavItem>
  //           ) : (
  //             <NavItem>
  //               <NavLink href="/totalchat">
  //                 <BsBellFill
  //                   size={28}
  //                   style={{ fill: "red" }}
  //                   className="mr-3"
  //                 />
  //               </NavLink>
  //             </NavItem>
  //           )}
  //           <NavItem>
  //             <NavLink href="/myaccount">
  //               <BsPeopleCircle style={{ fill: "black" }} size={28} />
  //             </NavLink>
  //           </NavItem>
  //         </div>
  //         <div class="navbar-buttons mbr-section-btn">
  //           <a
  //             class="btn btn-info display-4"
  //             onClick={checkVerificationHandler}
  //           >
  //             펀딩 생성
  //           </a>
  //         </div>
  //         <li className="nav-item mt-3">
  //           <a
  //             className="nav-link link text-black display-4"
  //             href="/"
  //             onClick={props.signOut}
  //           >
  //             로그아웃
  //           </a>
  //         </li>
  //       </ul>
  //     </div>
  //   );
  // }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
