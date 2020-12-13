import React, {Component} from 'react';
import {connect, useSelector} from 'react-redux';
import {useFirestoreConnect} from "react-redux-firebase";
import firebase from 'firebase';
import {loadFundings} from "../../store/actions/userActions";
import FundingList from "./FundingList";
import ParticipationList from "./ParticipationList";
import FundingContents from "./FundingContents";
import {CardDeck, Container, Row, Col} from 'reactstrap';
import SideBar from './SideBar';
const MyParticipation =(props)=> {

    const uid= props.auth.uid == null ? "none" : props.auth.uid

    useFirestoreConnect([{
        collection: 'participation',
        where:[
            ["uid","==",uid]
        ]
    }]);

    const participations=useSelector((state)=>state.firestore.ordered.participation);
    console.log(participations);


return(
    <>
    <section class="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
        
    <Container> 
        <Row>
            <Col sm={3}>
            <SideBar/>
            </Col>
            <Col>

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
        </Col>
    </Row>
    </Container>
    </section>
    </>
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
