import firebase from "firebase/app";

export const signIn = (credentials) => {
  return (dispatch, getState) => {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function () {
        firebase
          .auth()
          .signInWithEmailAndPassword(credentials.email, credentials.password)
          .then((data) => {
            if (data.user.emailVerified) {
              // firebase
              //   .auth()
              //   .setPersistence(firebase.auth.Auth.Persistence.SESSION);
              dispatch({ type: "LOGIN_SUCCESS" });
            } else {
              var msg = "이메일인증을 확인해주세요";
              alert(msg);
              // firebase
              //   .auth()
              //   .setPersistence(firebase.auth.Auth.Persistence.SESSION);
              // firebase.auth().signOut();
            }
          })
          .catch((err) => {
            var msg = "아이디 또는 비밀번호를 확인해주세요";
            alert(msg);
            dispatch({ type: "LOGIN_ERROR", err });
          });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};

export const signUp = (newUser) => {
  const firestore = firebase.firestore();
  return (dispatch, getState) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((resp) => {
        return firestore
          .collection("users")
          .doc(newUser.email)
          .set({
            user_uid: firebase.auth().currentUser.uid,
            user_email: firebase.auth().currentUser.email,
            nickname: newUser.nickname,
            addr: "",
            addr_detail: "",
            zipcode: "",
            phone_number: "",
            email_verification: firebase.auth().currentUser.emailVerified,
            // artist1: newUser.artist1,
            // artist2: newUser.artist2,
            // artist3: newUser.artist3,
            artistSelect: newUser.artistSelect,
            type: "user",
          })
          .then(() => {
            firebase
              .auth()
              .setPersistence(firebase.auth.Auth.Persistence.SESSION);
            // firebase.auth().signOut();

            dispatch({ type: "SIGNUP_SUCCESS" });
          })
          .catch((err) => {
            dispatch({ type: "SIGNUP_ERROR", err });
          })
          .then(() => {
            let user = firebase.auth().currentUser;
            user
              .sendEmailVerification()
              .then(function () {
                firebase
                  .auth()
                  .setPersistence(firebase.auth.Auth.Persistence.SESSION);
                //   firebase.auth().signOut();

                dispatch({ type: "EMAIL_SPENT_SUCCESS" });
              })
              .catch((err) => {
                dispatch({ type: "NOT_EMAIL_SPENT", err });
              });
          });
      });
  };
};

export const signUpCom = (newCompany) => {
  const firestore = firebase.firestore();
  return (dispatch, getState) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(newCompany.email, newCompany.password)
      .then((resp) => {
        return firestore
          .collection("companies")
          .doc(newCompany.email)
          .set({
            company_uid: firebase.auth().currentUser.uid,
            name: newCompany.companyName,
            company_reg_num: newCompany.companyRegistrationNumber,
            corporate_reg_num: newCompany.corporateRegistrationNumber,
            addr: "",
            addr2: "",
            email: newCompany.email,
            email_verification: firebase.auth().currentUser.emailVerified,
            type: "company",
          })
          .then(() => {
            firebase
              .auth()
              .setPersistence(firebase.auth.Auth.Persistence.SESSION);
            dispatch({ type: "SIGNUP_SUCCESS" });
          })
          .catch((err) => {
            dispatch({ type: "SIGNUP_ERROR", err });
          })
          .then(() => {
            let companies = firebase.auth().currentUser;
            companies
              .sendEmailVerification()
              .then(function () {
                firebase
                  .auth()
                  .setPersistence(firebase.auth.Auth.Persistence.SESSION);
                //   firebase.auth().signOut();
                dispatch({ type: "EMAIL_SPENT_SUCCESS" });
              })
              .catch((err) => {
                dispatch({ type: "NOT_EMAIL_SPENT", err });
              });
          })
          .then(() => {
            firebase
              .firestore()
              .collection("payments")
              .doc(newCompany.email)
              .set({
                isPaymentOpen: true,
                totalFundingAmount: 0,
                buyer_email: newCompany.email,
                buyer_name: newCompany.companyName,
                paymentFundingList: [],
                adminPaymentList: [],
                isSaved: false,
              });
          });
      });
  };
};

// export const twitterSignIn = credentials =>{
//   const provider = new firebase.auth.TwitterAuthProvider();
//
//   firebase
//       .auth()
//       .signInWithPopup(provider)
//       .then(function (result) {
//
//         const token = result.credentials.accessToken;
//         const secret = result.credentials.secret;
//         const user = result.user;
//   }).catch(function(error){
//
//   });
// }

export const twitterSignIn = (credentials) => {
  const provider = new firebase.auth.TwitterAuthProvider();
  const firestore = firebase.firestore();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // const token=result.credentials.accessToken;
      // const secret=result.credentials.secret;
      // const user=result.user;
    })
    .then((resp) => {
      firestore
        .collection("users")
        .doc(firebase.auth().currentUser.email)
        .get()
        .then((doc) => {
          if (!doc.exists) {
            firestore
              .collection("users")
              .doc(firebase.auth().currentUser.email)
              .set({
                user_uid: firebase.auth().currentUser.uid,
                user_email: firebase.auth().currentUser.email,
                nickname: "",
                addr: "",
                addr_detail: "",
                zipcode: "",
                phone_number: "",
                email_verification: firebase.auth().currentUser.emailVerified,
                artist_id: "",
                type: "user",
              });
          } else {
            console.log("already exists");
          }
          firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.SESSION);
        })
        .catch((err) => {
          console.log("error", err);
        });
    });
};
