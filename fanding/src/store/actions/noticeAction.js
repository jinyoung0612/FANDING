import {createAction, handleActions } from 'redux-actions';
import firebase from "firebase/app";
import dateFormat from 'dateformat';

//action type
const NOTICE_SAVE = 'SAVE';
const NOTICE_REMOVE = 'REMOVE';
const NOTICE_READ = 'READ';
const NOTICE_LIST = 'LIST';

export const notice_save = createAction(NOTICE_SAVE);
export const notice_remove = createAction(NOTICE_REMOVE);
export const notice_read = createAction(NOTICE_READ);
export const notice_list = createAction(NOTICE_LIST);

export const firebase_notice_list = () => {
    return (dispatch) => {
        const firestore = firebase.firestore();

        return 
        firestore
        .collection('notices')
        .orderBy('ntcdate','desc')
        .get()
        .then((snapshot) => {
            var rows = [];
            snapshot.forEach((doc)=>{
                var childData = doc.data();
                childData.ntcdate = dateFormat(childData.ntcdate, "yyyy-mm-dd");
                rows.push(childData);
            });
            dispatch(notice_list(rows));
        });
    }
}

export const firebase_notice_remove = ( ntcno = {} ) => {
    return (dispatch) => {
        console.log("notcie Action / notice no : ", ntcno);
        const firestore = firebase.firestore();
        return firestore
        .collection('notices')
        .doc(ntcno)
        .delete()
        .then(()=>{
            dispatch(notice_remove(ntcno));
        });
    }
}

export const firebase_notice_save = ( data = {} ) => {
    return (dispatch) => {
        const firestore = firebase.firestore();

        if(!data.ntcno){
            var doc = firestore.collection('notices').doc();
            data.ntcno = doc.id;
            data.ntcdate = Date.now();
            return doc.set(data).then(()=>{
                data.ntcdate = dateFormat(data.ntcdate,"yyyy-mm-dd");
                dispatch(notice_save(data));
            })
        }else{
            return 
            firestore.collection('notices')
            .doc(data.ntcno)
            .update(data)
            .then(()=>{
                dispatch(notice_save(data));
            })
        }
    }
};

const initialState = {
    notices : [],
    selectedNotice: {}
};

export default handleActions({
    [NOTICE_LIST]: (state, {payload: data}) => {
        return {notices: data, selectedNotice: {}};
    },
    [NOTICE_SAVE]: (state, {payload: data}) => {
        let notices = state.notices;
        let index = notices.findIndex(row=>row.ntcno === data.ntcno);
        if(index===-1){
            let newNotices = [{date: new Date(), ...data}];
            return {notices: newNotices.concat(notices), selectedNotice: {}};
        }else{
            return {
                notices: notices.map(row => data.ntcno === row.ntcno ? {...data}: row),
                selectedNotice: {} 
            };
        }
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
        return {
            notices: notices,
            selectedNotice: notices.find(row => row.ntcno === ntcno)
        };
    }
}, initialState);