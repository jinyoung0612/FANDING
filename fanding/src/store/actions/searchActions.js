import firebase from "firebase";

export const loadMain = (artist) => {

    // console.log("action Artist",artist);

    return (dispatch, getState) => {
        const firestore = firebase.firestore();

        let rows=[];

        for(var i=0; i<artist.length; i++){
            // console.log(artist[i].value)
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
                    // console.log(rows);

                    dispatch({type:"loadMainPage",payload: {
                            user_data:rows
                        }})
                });
        }


    };
};






