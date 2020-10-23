import firebase from "firebase/app";

export const signIn = (credentials) => {
  return (dispatch, getState) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_ERROR", err });
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
      .then((userCredential) => {
        const currentUser = {
          emailVerified: userCredential.user.emailVerified,
        };
        return firestore
          .collection("users")
          .add({
            artist: newUser.artist,
            emailVerified: currentUser.emailVerified,
          })
          .then(() => {
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
      .then((userCredential) => {
        const currentUser = {
          emailVerified: userCredential.user.emailVerified,
        };
        return firestore
          .collection("companys")
          .add({
            companyName: newCompany.companyName,
            companyRegistrationNumber: newCompany.companyRegistrationNumber,
            corporateRegistrationNumber: newCompany.corporateRegistrationNumber,
            emailVerified: currentUser.emailVerified,
          })
          .then(() => {
            dispatch({ type: "SIGNUP_SUCCESS" });
          })
          .catch((err) => {
            dispatch({ type: "SIGNUP_ERROR", err });
          })
          .then(() => {
            let company = firebase.auth().currentUser;
            company
              .sendEmailVerification()
              .then(function () {
                dispatch({ type: "EMAIL_SPENT_SUCCESS" });
              })
              .catch((err) => {
                dispatch({ type: "NOT_EMAIL_SPENT", err });
              });
          });
      });
  };
};

// export const comRegCheck = (newCompany) => {
//   const firestore = firebase.firestore();
//   return (dispatch, getState) => {
//     firebase.auth().then(() => {
//       return firestore
//         .collection("companys")

//     });
//   };
// };
