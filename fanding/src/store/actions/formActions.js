import firebase from 'firebase/app';

//수정이 필요함. 현재는 authAction의 복사본일 뿐입니다.
export const makeForm = newForm => {
  const firestore = firebase.firestore();
  return (dispatch, getState) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(newForm.email, newForm.password)
      .then(resp => {
        return firestore
          .collection('users')
            .doc(newForm.email)
            .set({
              user_uid:firebase.auth().currentUser.uid,
              user_email:firebase.auth().currentUser.email,
              nickname:"",
              addr:"",
              addr_detail:"",
              zipcode:"",
              phone_number:"",
              email_verification:false,
              artist_id : newForm.artist
          })
            .then(() => {
            dispatch({ type: 'CREATEFORM_SUCCESS' });
            })
            .catch(err => {
            dispatch({ type: 'CREATEFORM_ERROR', err });
            });
      });
  };

}


