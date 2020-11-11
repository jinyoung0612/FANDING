import React, {useEffect, useState} from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, CardImg, CardBody,
    CardSubtitle,Form } from 'reactstrap';
import {connect, useDispatch, useSelector} from "react-redux";
import { Link } from 'react-router-dom';
import {useFirestoreConnect} from "react-redux-firebase";
import firebase from "firebase/app"
import ReactHtmlParser from 'react-html-parser';
import ModalPortal from "../../ModalPortal";
import MyModal from "../../MyModal";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer} from '@toast-ui/react-editor';
import {loadParticipants} from "../../store/actions/userActions";

function StateDetail({participant}){

    // console.log("StateDetail",participant);
    return(
        <div>
            <div>참여자 이메일: {participant.email}</div>
            <div>참여자 이름: {participant.name}</div>
            <div>참여자 계좌: {participant.bank} {participant.accountName} {participant.accountNumber}</div>
            <div>입금 시간: {participant.date} {participant.time}</div>
            <br/>
        </div>

    )
}
const FundingState = (props)=>{

    // const viewerRef = React.createRef();

    const doc_id=props.match.params.id;
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(loadParticipants(doc_id))
    },[dispatch]);

    const participants =props.user_data;
    //
    // const{participants}=useSelector((state)=>({
    //     participants:props.user_data
    // }));

    console.log(participants);

    if(participants.length!=0){

        return(
            <div>
                {  participants.map((participant,i)=>{
                    return(
                        <StateDetail participant={participant} key={i}/>
                    )
                })}
            </div>
        )

    }
    else{
        return(
            <div>참여자가 없습니다.</div>
        )
    }



};

// export default FundingDetails;

const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth,
        user_data:state.auth.user_data
    }
};

export default connect(
    mapStateToProps
)(FundingState);
