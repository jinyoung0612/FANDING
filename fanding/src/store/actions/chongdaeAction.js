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


export const transactionList = (newTransactionList) => {
    return (dispatch) => {
        const firestore = firebase.firestore();
        const user = firebase.auth().currentUser;
        
        this.props.dispatch(loadFundings(this.props.auth.uid))
        const {user_data} = this.props;
        console.log(this.props);

        firestore
        .collection("transacionLists")
        .doc()
        .set({
            chongdae_uid: user.uid,
            chongdae_email: user.email,
            fintech_use_num: newTransactionList,
            user_name: newTransactionList.username,
            bank_name: newTransactionList.bank_name,
            funding_id: user_data.id
        })
    }
};

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
