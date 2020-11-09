import { createAction, handleActions } from 'redux-actions';
import firebase from 'firebase/app';
import "firebase/storage";
import {useState} from "react";
const FUNDING_SAVE= 'FUNDING_SAVE';


export const funding_save=createAction(FUNDING_SAVE);


export const firebase_funding_save = newForm => {
  //const firestore = firebase.firestore();
  
  return (dispatch, getState, { getFirebase, getFirestore }) => {
      // make async call to database
      const firestore = getFirestore();
      const user=firebase.auth().currentUser.email;
      firestore
        .collection("fundings").add({
            ...newForm,
            user_uid:firebase.auth().currentUser.uid,
            user_email:firebase.auth().currentUser.email,
            artistSelect: newForm.artistSelect,
            fundingType: newForm.fundingType,
            fundingTitle: newForm.fundingTitle,
            fundingStartDate: newForm.fundingStartDate,
            fundingEndDate: newForm.fundingEndDate,
            fundingStartTime: newForm.fundingStartTime,
            fundingEndTime: newForm.fundingEndTime,
            fundingPeriodLimit: newForm.fundingPeriodLimit,
            thumbnailImage: newForm.url,
            detailText: newForm.detailText,
            itemTitle: newForm.itemTitle,
            itemPrice: newForm.itemPrice,
            itemLimitBox: newForm.itemLimitBox,
            itemRemain: newForm.itemRemain,
            itemLimit: newForm.itemLimit,
            shippingMethod: newForm.shippingMethod,
            shippingFee: newForm.shippingFee,
            shippingDetail: newForm.shippingDetail,
            createTime: firebase.firestore.Timestamp.now(),
            content: newForm.content

        }).then(() => {
            dispatch({type: 'CREATEFORM_SUCCESS' , newForm});
        }).catch((err) => {
            dispatch( {type: "CREATEFORM_ERROR", err})
        })
        //.doc()
        /*.set({
            
        })*/
  };

};

/*
const initialState = {
    auth: null,
    user_data: []
};
export default handleActions({
    [FUNDING_SAVE]: (state,action)=>{
        return {...state }
    }
},initialState);
*/

