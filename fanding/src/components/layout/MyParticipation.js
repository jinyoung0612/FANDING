import React, {Component} from 'react';
import {connect, useSelector} from 'react-redux';
import {useFirestoreConnect} from "react-redux-firebase";
import firebase from 'firebase';
import {loadFundings} from "../../store/actions/userActions";
import FundingList from "./FundingList";
import ParticipationList from "./ParticipationList";
import FundingContents from "./FundingContents";

const MyParticipation =()=> {

    useFirestoreConnect([{
        collection: 'participation',
        where:[
            ["uid","==",firebase.auth().currentUser.uid]
        ]
    }]);

    const participations=useSelector((state)=>state.firestore.ordered.participation);
    console.log(participations);


return(
    <div>

        {
            participations ?
            participations.map(participation=>{
            // console.log(funding)
            return(
                <ParticipationList participation={participation} key={participation.id}/>
            )
        })
            : console.log("no")
        }
    </div>
)


}

// store의 state 값을 props로 연결해줌
const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth,
        fundings: state.firestore.ordered.fundings

    }
};
export default connect(
    mapStateToProps
)(MyParticipation);
