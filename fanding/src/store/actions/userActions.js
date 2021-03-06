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
                zoneCode: zoneCode,
                fullAddress:fullAddress,
                detailAddress:newForm.detailAddress,
                isChecked: '미확인',


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
                        participants:rows
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
                                if(querySnapshot.docs.length!==0){
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
    console.log("user_uid: ",user.fid);
    let firestore = firebase.firestore();
    let participationRef = firestore.collection('participation');
    let query = participationRef
                    .where("fid","==", user.fid)
                    .where("uid","==",user.uid)
                    .get()
                    .then(snapshot => {
                        if (snapshot.empty) {
                          console.log('No matching documents.');
                          return;
                        }
                    
                        snapshot.forEach(doc => {
                          console.log(doc.id, '=>', doc.data());
                          
                          participationRef.doc(doc.id).update({isChecked:'확인'});
                        });
                      })
                      .catch(err => {
                        console.log('Error getting documents', err);
                      });
    //return query;
}


export const check_deposit2 = (user) => {
    console.log("user_uid: ",user.fid);

    return (dispatch, getState) => {
        const firestore = firebase.firestore();

        firestore
        .collection("participation")
        .where("fid","==", user.fid)
        .where("uid","==",user.uid)
        .get()
        .then(function(querySnapshot){
            console.log("제발");
            if(querySnapshot.docs.length!==0){
                querySnapshot.forEach(function (doc) {
                    console.log(doc.data());
                })
            }
        })
        .then(()=>{
            console.log("참여자 입금확인 성공")
            dispatch({type:"SUCCESS_UPDATE_ISCHEKED",user})
        })
        .catch((err)=>{
            console.log("참여자 입금확인 실패",err)
        })
    }
}

export const modify_mypage = (data) =>{

    console.log("modify_mypage")
    // console.log(inputs, profile, fullAddress, zoneCode)
    return (dispatch, getState) => {
        const firestore = firebase.firestore();

            firestore
                .collection("users")
                .doc(firebase.auth().currentUser.email)
                .update(
                    data
                )
                .then(() => {
                    dispatch({ type: "CHANGE_SUCCESS" });
                })
                .catch((err) => {
                    dispatch({ type: "CHANGE_ERROR", err });
                });


    }
}

export const add_cart=(fid,like)=>{
    return (dispatch, getState) => {
        const firestore = firebase.firestore();
        firestore
            .collection("fundings")
            .doc(fid)
            .update(
                {
                    like:like+1
                }
            )
            .then(() => {
                console.log("Increment Like")
            })
            .catch((err) => {
               console.log("err",err)
            });
        firestore
            .collection("users")
            .doc(firebase.auth().currentUser.email)
            .update(
                {
                    like:firebase.firestore.FieldValue.arrayUnion(fid)
                }
            )
            .then(() => {
                console.log("Add Cart")
            })
            .catch((err) => {
                console.log("err",err)
            });

    }
}
export const remove_cart=(fid,like)=>{
    return (dispatch, getState) => {
        const firestore = firebase.firestore();
        firestore
            .collection("fundings")
            .doc(fid)
            .update(
                {
                    like:like-1
                }
            )
            .then(() => {
                console.log("Decrement Like")
            })
            .catch((err) => {
                console.log("err",err)
            });

        firestore
            .collection("users")
            .doc(firebase.auth().currentUser.email)
            .update(
                {
                    like:firebase.firestore.FieldValue.arrayRemove(fid)
                }
            )
            .then(() => {
                console.log("Remove Cart")
            })
            .catch((err) => {
                console.log("err",err)
            });

    }
}

export const modify_participation = (pid,data) => {
    // console.log(fid)

    return (dispatch, getState) => {
        // make async call to database
        const firestore = firebase.firestore();

        firestore
            .collection("participation")
            .doc(pid)
            .update(
                data
            )
            .then(() => {
                console.log("modify success");
            })
            .catch((err) => {
                console.log("modify error",err);
        })


    };

};


