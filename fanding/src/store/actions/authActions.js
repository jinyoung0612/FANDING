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
          .add({
            artist : newUser.artist
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
      .collection('companys')
      .add({
        companyName : newCompany.companyName,
        companyRegistrationNumber : newCompany.companyRegistrationNumber,
        corporateRegistrationNumber : newCompany.corporateRegistrationNumber,
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

export const twitterSignIn = credentials =>{
  const provider = new firebase.auth.TwitterAuthProvider();

  firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {

        const token = result.credentials.accessToken;
        const secret = result.credentials.secret;
        const user = result.user;
  }).catch(function(error){

  });
}

