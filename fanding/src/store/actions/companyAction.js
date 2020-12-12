import firebase from "firebase";

export const loadAppliedFundings = (doc_ids) => {
    return (dispatch, getState) => {
        const firestore = firebase.firestore();
        // const user=firebase.auth().currentUser.uid;
        // console.log(user)
        // const user="LcveT8eRo9Z0dEwzJGQXl76KtPs1";
        let data= {};
        let rows=[];
        firestore
            .collection("recruitCompanies")
            .where(firebase.firestore.FieldPath.documentId(), "in", doc_ids)
            // .where(firebase.firestore.FieldPath.documentId, "array-contains", applications)
            // .whereArrayContains(firebase.firestore.FieldPath.documentId, applications)
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
            // .then((snapshot) => {
            //     const documents = snapshot.docs.map(doc=>doc.data());
            //     console.log(documents);
            // })
            .then(()=> {
                dispatch({type:"setMyAppliedFunding",payload: {
                        user_data:rows
                }})
            });


    };
};