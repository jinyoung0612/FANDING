import firebase from "firebase";
import {isLoaded} from "react-redux-firebase";

export const loadFundings = (uid) => {
    return (dispatch, getState) => {
        const firestore = firebase.firestore();
        // const user=firebase.auth().currentUser.uid;
        // console.log(user)
        // const user="LcveT8eRo9Z0dEwzJGQXl76KtPs1";
        let data= {};
        let rows=[];
        firestore
            .collection("fundings")
            .where("user_uid","==",uid)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    let data= {};

                    data=doc.data();
                    data["id"]=doc.id;
                    rows.push(data)

                })

            })
            .then(()=> {
                dispatch({type:"setMyFunding",payload: {
                        user_data:rows
                }})
            });


    };
};

export const Participate_save = (newForm,fid,progress, fullAddress, zoneCode) => {
    // console.log(fid)

    return (dispatch, getState) => {
        // make async call to database
        const firestore = firebase.firestore();
        console.log(newForm);

        firestore
            .collection("participation")
            .doc()
            .set({
                name:newForm.name,
                price:newForm.price,
                date:newForm.date,
                time:newForm.time,
                bank:newForm.bank,
                accountNumber:newForm.accountNumber,
                accountName:newForm.accountName,
                email:newForm.email,
                fid:newForm.fid,
                uid:firebase.auth().currentUser.uid,
                isChecked: false,
                zoneCode: zoneCode,
                fullAddress:fullAddress,
                detailAddress:newForm.detailAddress


        }).then(() => {
            dispatch({type: 'PARTICIPATE_SUCCESS' , newForm});
        }).catch((err) => {
            dispatch( {type: "PARTICIPATE_ERROR", err})
        })

        firestore
            .collection("fundings")
            .doc(fid)
            .update({
                progress:progress+1
            })
            .then(()=>{
                console.log("성공")
                dispatch({type:'ProgressUpdate_SUCCESS',progress});
            })
            .catch((err)=>{
                console.log(err)
                dispatch({type:"ProgressUpdate_ERROR",err})
            })



    };

};

export const loadParticipants = (id) => {
    return (dispatch, getState) => {
        const firestore = firebase.firestore();
        // const user=firebase.auth().currentUser.uid;
        // console.log(user)
        // const user="LcveT8eRo9Z0dEwzJGQXl76KtPs1";
        let rows=[];
        firestore
            .collection("participation")
            .where("fid","==",id)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    let data= {};
                    data=doc.data();
                    data["id"]=doc.id;
                    rows.push(data)

                })

            })
            .then(()=> {
                dispatch({type:"LoadParticipants",payload: {
                        user_data:rows
                    }})
            });


    };
};

export const check_user_type=(email)=>{
    if(email!=null){
        return(dispatch,getState)=>{
            const firestore=firebase.firestore();
            // console.log(email)

            var type=[];
            firestore
                .collection("users")
                .where("user_email","==",email)
                .get()
                .then(function (querySnapshot) {
                    console.log(querySnapshot.docs.length)
                    if(querySnapshot.docs.length!=0){
                        querySnapshot.forEach(function (doc) {
                            // console.log("doc",doc.data())
                            type.push("users")
                            // console.log(type)

                        })
                    }
                    else{
                        firestore
                            .collection("companies")
                            .where("email","==",email)
                            .get()
                            .then(function (querySnapshot) {
                                if(querySnapshot.docs.length!=0){
                                    querySnapshot.forEach(function (doc) {
                                        console.log(doc.data());
                                        type.push("company")
                                        console.log(type)


                                    })
                                }

                            })
                            .then(()=>{
                                // console.log(type)
                                dispatch({type:"CheckUserType",payload: {
                                        user_type:type
                                    }})
                            })

                    }


                    })
                .then(()=>{
                    // console.log(type)
                    dispatch({type:"CheckUserType",payload: {
                            user_type:type
                        }})
                })

        }
    }
    else{
        return(dispatch,getState)=>{

        }

    }

}

export const check_deposit = (user) => {
    console.log("user_email: ",user.email);
    const firestore = firebase.firestore();

    return (dispatch, getState) => {
        firestore
        .collection("participation")
        .where("user_email","==", user.email)
        .get()
        .update({
            isChecked: true
        })
        .then(()=>{
            console.log("참여자 입금확인 성공")
        })
        .catch((err)=>{
            console.log("참여자 입금확인 실패",err)
        })
    }
}

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


