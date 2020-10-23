import firebase from 'firebase/app';

export const signIn = credentials => {
  return (dispatch, getState) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' });
      })
      .catch(err => {
        dispatch({ type: 'LOGIN_ERROR', err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState) => {
    firebase.auth()
    .signOut()
    .then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    });
  }
}

export const signUp = newUser => {
  const firestore = firebase.firestore();
  return (dispatch, getState) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(resp => {
        return firestore
          .collection('users')
            .doc(newUser.email)
            .set({
              user_uid:firebase.auth().currentUser.uid,
              user_email:firebase.auth().currentUser.email,
              nickname:"",
              addr:"",
              addr_detail:"",
              zipcode:"",
              phone_number:"",
              email_verification:false,
              artist_id : newUser.artist
          })
            .then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' });
            })
            .catch(err => {
            dispatch({ type: 'SIGNUP_ERROR', err });
            });
      });
  };

};

export const signUpCom = newCompany => {
  const firestore = firebase.firestore();
  return (dispatch, getState)=>{
    firebase
    .auth()
    .createUserWithEmailAndPassword(newCompany.email, newCompany.password)
    .then(resp => {
      return firestore
          .collection('companies')
          .doc(newCompany.email)
          .set({
            company_uid: firebase.auth().currentUser.uid,
            name : newCompany.companyName,
            company_reg_num : newCompany.companyRegistrationNumber,
            corporate_reg_num : newCompany.corporateRegistrationNumber,
              addr : "",
              addr2 : "",
              email : newCompany.email,
              email_verification:false

      })
      .then(() => {
        dispatch({type: 'SIGNUP_SUCCESS' });
      })
      .catch(err => {
        dispatch({ type: 'SIGNUP_ERROR', err });
      });
    });
}
}

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

export const twitterSignIn = credentials =>{
  const provider = new firebase.auth.TwitterAuthProvider();
  const firestore = firebase.firestore();

    firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result){
          // const token=result.credentials.accessToken;
          // const secret=result.credentials.secret;
          // const user=result.user;
        })
        .then(resp => {

          firestore
              .collection('users')
              .doc(firebase.auth().currentUser.email)
              .get()
              .then(doc=>{
                if(!doc.exists){
                  firestore
                      .collection("users")
                      .doc(firebase.auth().currentUser.email)
                      .set({
                        user_uid:firebase.auth().currentUser.uid,
                        user_email:firebase.auth().currentUser.email,
                        nickname:"",
                        addr:"",
                        addr_detail:"",
                        zipcode:"",
                        phone_number:"",
                        email_verification:false,
                        artist_id : ""
                      })
                }
                else{
                  console.log("already exists");
                }
              })
              .catch(err=>{
                console.log("error",err);
              })

        });



}


