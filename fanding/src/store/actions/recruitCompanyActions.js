import { createAction, handleActions } from 'redux-actions';
import firebase from 'firebase/app';
const RECRUIT_SAVE= 'RECRUIT_SAVE';

export const recruit_save=createAction(RECRUIT_SAVE);


export const firebase_funding_save = newForm => {
  const firestore = firebase.firestore();
  const user=firebase.auth().currentUser.email;

  return (dispatch, getState) => {
    firestore
        .collection("recruitComapnies")
        .doc()
        .set({
            user_uid:firebase.auth().currentUser.uid,
            user_email:firebase.auth().currentUser.email,
            itemTitle: newForm.itemTitle,
            itemImage: newForm.itemImage,
            detailText: newForm.detailText,
            itemPrice: newForm.itemPrice,
            itemRemain: newForm.itemRemain,
            shippingMethod: newForm.shippingMethod,
    })
  };

};

const initialState = {
    auth: null,
    user_data: []
};
export default handleActions({
    [RECRUIT_SAVE]: (state,action)=>{
        return {...state }
    }
},initialState);


