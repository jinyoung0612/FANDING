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
            itemImage: newRecruitForm.url,
            detailText: newRecruitForm.detailText,
            itemPrice: newRecruitForm.itemPrice,
            itemRemain: newRecruitForm.itemRemain,
            shippingMethod: newRecruitForm.shippingMethod,
            content: newRecruitForm.content,
            isSelected:false
          })
  };

};

export const company_application_save = newApply =>{
    const firestore = firebase.firestore();

    return (dispatch, getState) => {
        firestore
            .collection("applications")
            .doc()
            .set({
                company_uid:firebase.auth().currentUser.uid,
                company_email:firebase.auth().currentUser.email,
                company_name:newApply.company_name,
                price: newApply.price,
                minimum: newApply.minimum,
                time: newApply.time,
                others: newApply.others,
                recruit_id: newApply.recruit_id,


            })
    };

}

export const company_select = Company =>{

    console.log("company_select Action: ",Company.select_email)
    const firestore = firebase.firestore();

    return (dispatch, getState) => {
        firestore
            .collection("users")
            .doc(Company.chongdae)
            .update({
                selectedCompany:Company.select_email
            })
            .then(()=>{
                console.log("성공")
            })
            .catch((err)=>{
                console.log(err)
            })

        firestore
            .collection("recruitCompanies")
            .doc(Company.recruit_id)
            .update({
                isSelected:true
            })
            .then((data)=>{
                console.log("성공")
            })
            .catch((err)=>{
                console.log(err)
            })

    };

}

const initialState = {
    auth: null,
    user_data: []
};
export default handleActions({
    [RECRUIT_SAVE]: (state,action)=>{
        return {...state }
    }
},initialState);


