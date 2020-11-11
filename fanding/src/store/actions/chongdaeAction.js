import firebase from 'firebase/app';
import 'firebase/storage';
import {createAction} from 'redux-actions';

const CHONGDAE_SAVE = 'CHONGDAE_SAVE';

export const chongdae_save = createAction(CHONGDAE_SAVE);

export const verifyChongdae = (newChongdae) => {
    return (dispatch, getFirestore) => {
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;

        firestore.collection("chongdaes").add({
            user_uid: user.uid,
            user_email: user.email,
            access_token: newChongdae.access_token,
            refresh_token: newChongdae.refresh_token,
            user_seq_no: newChongdae.user_seq_no,
        }).then(()=>{
            dispatch({type: "VERIFYCHONGDAE_SUCCESS",newChongdae});
        }).catch((err) => {
            dispatch({type: "VERIFYCHONGDAE_ERROR", err});
        })
    };
};

