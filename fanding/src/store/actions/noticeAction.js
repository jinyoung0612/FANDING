import {createAction, handleActions } from 'redux-actions';
import firebase from "firebase/app";
import dateFormat from 'dateformat';

//action type
const NOTICE_SAVE = 'SAVE';
const NOTICE_REMOVE = 'REMOVE';
const NOTICE_READ = 'READ';
const NOTICE_LIST = 'LIST';
const NOTICE_ADDS = 'ADDS';
const SNACKBAR = 'SNACKBAR';

export const notice_save = createAction(NOTICE_SAVE);
export const notice_remove = createAction(NOTICE_REMOVE, ntcno=>ntcno);
export const notice_read = createAction(NOTICE_READ);
export const notice_list = createAction(NOTICE_LIST);
export const notice_adds = createAction(NOTICE_ADDS);
export const show_snackbar = createAction(SNACKBAR);

export const firebase_notice_list = () => {
    return (dispatch) => {
        const firestore = firebase.firestore();

        return firestore
        .collection('notices')
        .orderBy('ntcdate','desc')
        .onSnapshot(function(snapshot){
            var newlist = [];
            snapshot.docChanges().forEach(function(change){
                var row = change.doc.data();
                if (change.type === "added"){
                    newlist.push(row);
                }else if(change.type==="modified"){
                    dispatch(notice_save(row));
                }else if (change.type === "removed"){
                    dispatch(notice_remove(row.ntcno));
                }
            });
            if(newlist.length>0)
                dispatch(notice_adds(newlist));
        })
    }
}

export const firebase_notice_delete = ( ntcno = {} ) => {
    const firestore = firebase.firestore();

    return firestore.collection('notices').doc(ntcno).delete();
}

export const firebase_notice_save = ( data = {} ) => {
    return (dispatch) => {
        console.log("in noticeACTION DATA: ", data);
        const firestore = firebase.firestore();
        if(!data.ntcno){
            const type = data.type;
            console.log("in noticeAction type: ", data.type);

            if(type === 'chongdae'){
                firestore.collection("users").doc(data.email).get()
                .then(doc => {
                    const user = doc.data();
                    var newdoc = firestore.collection('notices').doc();
                    data.ntcwriter = user.nickname;
                    data.ntcno = newdoc.id;
                    data.ntcdate = Date.now();
                    newdoc.set(data);
                });
            }
            else if(type === 'company'){
                firestore.collection("companies").doc(data.email).get()
                .then(doc => {
                    const company = doc.data();
                    var newdoc = firestore.collection('notices').doc();
                    data.ntcwriter = company.name;
                    data.ntcno = newdoc.id;
                    data.ntcdate = Date.now();
                    newdoc.set(data);
                });
            }
        }else{
            firestore.collection('notices')
            .doc(data.ntcno)
            .update(data)
        }
    }
};

const initialState = {
    notices : [],
    selectedNotice: {},
    snackbarOpen: false,
    message: '', 
};

export default handleActions({
    [SNACKBAR]: (state, { payload: data }) => {
        return {...state, snackbarOpen: data.snackbarOpen, message: data.message };
    },
    [NOTICE_LIST]: (state, {payload: data}) => {
        return {...state, notices: data, selectedNotice: {}};
    },
    [NOTICE_SAVE]: (state, {payload: data}) => {
        let notices = state.notices;
        let index = notices.findIndex(row=>row.ntcno === data.ntcno);
        if(index===-1){
            let newNotices = [{date: new Date(), ...data}];
            return {...state, notices: newNotices.concat(notices), selectedNotice: {}};
        }else{
            notices[index]=data;
            return {
                ...state,notices: notices,selectedNotice: {} 
            };
        }
    },
    [NOTICE_ADDS]: (state, {payload: data}) => {
        let notices = state.notices;
        return {...state, notices: data.concat(notices), selectedNotice: {}};
    },
    [NOTICE_REMOVE]: (state, {payload: ntcno}) => {
        let notices = state.notices;
        return {
            notices : notices.filter(row => row.ntcno !== ntcno),
            selectedNotice: {}
        };
    },
    [NOTICE_READ]: (state, {payload: ntcno}) => {
        let notices = state.notices;
        let selectedNotice = notices.find(row => row.ntcno === ntcno);
        if(!selectedNotice) 
            selectedNotice = {ntcno: null, ntctitle:'', ntccontents: ''};
        return {
            ...state,
            selectedNotice: selectedNotice
        };
    }
}, initialState);