import { createAction, handleActions } from 'redux-actions';
import firebase from 'firebase/app';
const RECRUIT_SAVE= 'RECRUIT_SAVE';

export const recruit_save=createAction(RECRUIT_SAVE);


export const firebase_recruit_save = newRecruitForm => {
  const firestore = firebase.firestore();
  const user=firebase.auth().currentUser.email;

  return (dispatch, getState) => {
    firestore
        .collection("recruitCompanies")
        .doc()
        .set({
            user_uid:firebase.auth().currentUser.uid,
            user_email:firebase.auth().currentUser.email,
            itemTitle: newRecruitForm.itemTitle,
            itemImage: newRecruitForm.itemImage,
            detailText: newRecruitForm.detailText,
            itemPrice: newRecruitForm.itemPrice,
            itemRemain: newRecruitForm.itemRemain,
            shippingMethod: newRecruitForm.shippingMethod,
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


