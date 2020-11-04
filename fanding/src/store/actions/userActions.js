import { createAction, handleActions } from 'redux-actions';
import firebase from "firebase/app";

const MyFunding_READ = 'MyFunding_READ';
// const setMyFunding = 'setMyFunding';

export const MyFunding_read=createAction(MyFunding_READ);
export const setMyFunding=createAction('setMyFunding');


// export const my_funding_info = () =>{
//     console.log("호출됨");
//     const firestore = firebase.firestore();
//     const user=firebase.auth().currentUser.uid;
//
//     console.log("user: ",user);
//     return (dispatch)=>{
//         var rows=[];
//         firestore
//             .collection("fundings")
//             .get()
//             .then(function (querySnapshot) {
//                 querySnapshot.forEach(function (doc) {
//                     // console.log(doc.data());
//                     if(doc.data().user_uid==user){
//                         console.log(doc.data());
//                         rows.push(doc.data());
//
//                     }
//                 })
//             })
//             .then(dispatch(
//                 {
//                     type:MyFunding_read,
//                     payload:rows,
//                 }
//             ))
//     }
// };
export function firebase_fetchMyFunding(){
    const firestore = firebase.firestore();
    const user=firebase.auth().currentUser.uid;
    let rows=[];
    firestore
        .collection("fundings")
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // console.log(doc.data());
                if(doc.data().user_uid==user){
                    // console.log(doc.data().user_email);
                    rows.push(doc.data().user_email);

                }
            })
        });

    return rows;
}

export function firebase_setMyFunding(user_data){

    return{
        type : 'setMyFunding',
        payload:{
            user_data
        }

    }
}

export function loadTasks(){
    console.log("호출됨")
    // return async (dispatch)=>{
    //     const user_data= await firebase_fetchMyFunding();
    //     dispatch(firebase_setMyFunding(user_data))
    // }
    return (dispatch)=>{
        const user_data=firebase_fetchMyFunding();
        dispatch(firebase_setMyFunding(user_data))
    }
}
const initialState = {
    auth: null,
    user_data: [],
};
export default handleActions({
    // [MyFunding_read]: (state,action)=>{
    //     return {...state, user_data:action.payload};
    // }
    [setMyFunding]:(state,action)=>{
        const {user_data}=action.payload;
        return{
            ...state,
            user_data
        }
    }

},initialState);