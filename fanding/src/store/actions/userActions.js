import firebase from "firebase";

export const loadFundings = (uid) => {
    return (dispatch, getState) => {
        const firestore = firebase.firestore();
        // const user=firebase.auth().currentUser.uid;
        // console.log(user)
        // const user="LcveT8eRo9Z0dEwzJGQXl76KtPs1";
        let rows= [];

        firestore
            .collection("fundings")
            .where("user_uid","==",uid)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {

                    rows.push(doc.data())

                })

            })
            .then(()=> {
                dispatch({type:"setMyFunding",payload: {
                        user_data:rows
                    }})
            });


    };
};


// import { createAction, handleActions } from 'redux-actions';
// import firebase from "firebase/app";
//
// const MyFunding_READ = 'MyFunding_READ';
// // const setMyFunding = 'setMyFunding';
//
// export const MyFunding_read=createAction(MyFunding_READ);
// export const setMyFunding=createAction('setMyFunding');
//
//
// // export const my_funding_info = () =>{
// //     console.log("호출됨");
// //     const firestore = firebase.firestore();
// //     const user=firebase.auth().currentUser.uid;
// //
// //     console.log("user: ",user);
// //     return (dispatch)=>{
// //         var rows=[];
// //         firestore
// //             .collection("fundings")
// //             .get()
// //             .then(function (querySnapshot) {
// //                 querySnapshot.forEach(function (doc) {
// //                     // console.log(doc.data());
// //                     if(doc.data().user_uid==user){
// //                         console.log(doc.data());
// //                         rows.push(doc.data());
// //
// //                     }
// //                 })
// //             })
// //             .then(dispatch(
// //                 {
// //                     type:MyFunding_read,
// //                     payload:rows,
// //                 }
// //             ))
// //     }
// // };
// function firebase_fetchMyFunding(uid){
//     console.log("fetch")
//     const firestore = firebase.firestore();
//     // const user=firebase.auth().currentUser.uid;
//     console.log(uid)
//     // const user="LcveT8eRo9Z0dEwzJGQXl76KtPs1";
//     let rows= [];
//     firestore
//         .collection("fundings")
//         .where("user_uid","==",uid)
//         .get()
//         .then(function (querySnapshot) {
//             querySnapshot.forEach(function (doc) {
//
//             rows.push(doc.data())
//             })
//
//         });
//     console.log(rows)
//
//     return rows;
// }
//
// export function firebase_setMyFunding(user_data){
//
//     return{
//         type : setMyFunding,
//         payload:{
//             user_data
//         }
//
//     }
// }
//
// function loadTasks(uid){
//     console.log("호출됨")
//     return async (dispatch)=>{
//         const user_data= await firebase_fetchMyFunding(uid);
//         dispatch({type:"setMyFunding",payload:user_data})
//     }
// }
// const initialState = {
//     auth: null,
//     user_data: [],
// };
// export default handleActions({
//     // [MyFunding_read]: (state,action)=>{
//     //     return {...state, user_data:action.payload};
//     // }
//     [setMyFunding]:(state,action)=>{
//         console.log("호출")
//         const {user_data}=action.payload.user_data;
//         return{
//             ...state,
//             user_data
//         }
//     }
//
// },initialState);
//


