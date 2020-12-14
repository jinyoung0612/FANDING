import React, {Component} from 'react';
import {connect, useSelector} from 'react-redux';
import {useFirestoreConnect} from "react-redux-firebase";
import ParticipationList from "./ParticipationList";
import {Container, Row, Col} from 'reactstrap';
import SideBar from './SideBar';
import TopNavbar from "./TopNavbar"
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
    <section class="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q" style={{paddingTop:'25px'}}>
        
    <Container> 
        <Row>
            <Col sm={3}>
                <TopNavbar />
            <SideBar/>
            </Col>
            <Col>

        {
            participations && participations.length!==0?
            participations.map(participation=>{
            // console.log(funding)
            return(
                <ParticipationList participation={participation} key={participation.id}/>
            )
        })
            : <div><h2 style={{paddingTop:'90px'}}>참여한 펀딩이 없습니다.</h2></div>
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
