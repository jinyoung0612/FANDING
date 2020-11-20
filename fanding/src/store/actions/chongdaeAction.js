import firebase from 'firebase/app';
import 'firebase/storage';
import { connect } from 'react-redux';
import {createAction} from 'redux-actions';
import {loadFundings} from './userActions';

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

        /*
        this.props.dispatch(loadFundings(this.props.auth.uid))
        const {user_data} = this.props;
        console.log("chongdaeAction_getTran this.props:",this.props);
        console.log("chongdaeAction getTran user_data.id",user_data.id);
        */

        firestore
        .collection("transactionLists")
        .doc()
        .set({
            chongdae_uid: user.uid,
            chongdae_email: user.email,
            fintech_use_num: newTransactionList.fintech_use_num,
            user_name: newTransactionList.user_name,
            bank_name: newTransactionList.bank_name,
            //funding_id: user_data.id,
            //transaction_list: newTransactionList.transaction_list
        }).then(()=>{
            dispatch({type: "GET_TRANSACTION_LIST_SUCCESS",newTransactionList});
        }).catch((err) => {
            dispatch({type: "GET_TRANSACTION_LIST_ERROR", err});
        });
    };
};

/*
const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth,
        user_data: state.auth.user_data
    }
};
export default connect(
    mapStateToProps
);
*/
