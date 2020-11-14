import firebase from 'firebase/app';
import 'firebase/storage';
import {createAction} from 'redux-actions';

export const addAdmin = ((newAdmin) => {
    return (dispatch, getFirestore) => {
        const firestore = getFirestore();

        firestore.collection("admin").add({
            access_token: newAdmin.access_token,
            client_use_code: newAdmin.client_use_code
        }).then(()=>{
            dispatch({type: "ADDADMIN_SUCCESS",newAdmin});
        }).catch((err) => {
            dispatch({type: "ADDADMIN_ERROR", err});
        })
    }
})