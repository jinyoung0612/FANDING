import firebase from 'firebase/app';
import 'firebase/storage';
import {createAction} from 'redux-actions';

const CHONGDAE_SAVE = 'CHONGDAE_SAVE';

export const chongdae_save = createAction(CHONGDAE_SAVE);

export const verifyChongdae = (newChongdae) => {
    return (dispatch, getFirestore) => {
        const firestore = firebase.firestore();
        const user = firebase.auth().currentUser;

        // console.log(newChongdae)
        firestore
        .collection("chongdaes")
        .doc()
        .set({
            user_uid: user.uid,
            user_email: user.email,
            access_token: newChongdae.access_token,
            refresh_token: newChongdae.refresh_token,
            user_seq_no: newChongdae.user_seq_no,
            account_num: newChongdae.account_num,
            bank_name: newChongdae.bank_name,
        }).then(()=>{
            dispatch({type: "VERIFYCHONGDAE_SUCCESS",newChongdae});
        }).catch((err) => {
            dispatch({type: "VERIFYCHONGDAE_ERROR", err});
        })
    };
};


export const getTransactionList = (newTransactionList) => {
    
    return (dispatch,getFirestore) => {
        const firestore = firebase.firestore();
        const user = firebase.auth().currentUser;
        console.log(newTransactionList);

        firestore
        .collection("transactionLists")
        .doc()
        .set({
            chongdae_uid: user.uid,
            chongdae_email: user.email,
            access_token: newTransactionList.access_token,
            fintech_use_num: newTransactionList.fintech_use_num,
            user_name: newTransactionList.user_name,
            bank_name: newTransactionList.bank_name,
        }).then(()=>{
            dispatch({type: "GET_TRANSACTION_LIST_SUCCESS",newTransactionList});
        }).catch((err) => {
            dispatch({type: "GET_TRANSACTION_LIST_ERROR", err});
        });
    };
};

