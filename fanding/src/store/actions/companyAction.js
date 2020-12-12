import firebase from "firebase";

export const loadAppliedFundings = (recruit_id) => {
    return (dispatch, getState) => {
        const firestore = firebase.firestore();
        // const user=firebase.auth().currentUser.uid;
        // console.log(user)
        // const user="LcveT8eRo9Z0dEwzJGQXl76KtPs1";
        let data= {};
        let rows=[];
        firestore
            .collection("recruitCompanies")
            .doc(recruit_id)
            // .where("user_uid","==",uid)
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
                dispatch({type:"setMyAppliedFunding",payload: {
                        user_data:rows
                }})
            });


    };
};