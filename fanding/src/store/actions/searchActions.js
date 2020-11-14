import firebase from "firebase";
import {compose} from "redux";
import {connect} from "react-redux";
//
// export const loadMain = (artist) => {
//
//     console.log("action Artist",artist);
//     return (dispatch, getState) => {
//         const firestore = firebase.firestore();
//
//         let rows=[];
//
//         firestore
//             .collection("fundings")
//             .where("artistSelect","==",artist)
//             .get()
//             .then(function (querySnapshot) {
//                 querySnapshot.forEach(function (doc) {
//                     let data= {};
//                     data=doc.data();
//                     data["id"]=doc.id;
//                     rows.push(data)
//
//                 })
//
//             })
//             .then(()=> {
//                 console.log(rows)
//                 dispatch({type:"loadMainPage",payload: {
//                         user_data:rows
//                     }})
//             });
//
//
//     };
// };

export const loadMain = (artist) => {

    console.log("action Artist",artist.length);

    return (dispatch, getState) => {
        const firestore = firebase.firestore();

        let rows=[];

        for(var i=0; i<artist.length; i++){
            console.log(artist[i].value)
            firestore
                .collection("fundings")
                .where("artistSelect","==",artist[i].value)
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
                    console.log(rows)
                    // if(i===artist.length-1){
                    //     console.log("실행")
                    //     dispatch({type:"loadMainPage2",payload: {
                    //             user_data:rows
                    //         }})
                    // }

                    dispatch({type:"loadMainPage2",payload: {
                            user_data2:rows
                        }})
                });
        }


    };
};






