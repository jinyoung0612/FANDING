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
import 'tui-grid/dist/tui-grid.css';
import Grid from '@toast-ui/react-grid';
import TuiGrid from 'tui-grid';

TuiGrid.setLanguage('ko');
//TuiGrid.applyTheme('striped');
var array = [];


  const columns = [
    {name: 'email', header: '참여자 이메일'},
    {name: 'name', header: '참여자 이름'},
    {name: 'account', header:'참여자 계좌'},
    {name:'deposit_time', header:'입금 시간'},
    {name:'deposit_price', header:'입금 금액'},
    {name: 'check_deposit', header:'입금 확인'}
  ];


const FundingState = (props)=>{

    // const viewerRef = React.createRef();

    const doc_id=props.match.params.id;
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(loadParticipants(doc_id))
    },[dispatch]);

    const participants =props.user_data;
   

    // const{participants}=useSelector((state)=>({
    //     participants:props.user_data
    // }));
    

    if(participants.length!==0){

        return(
            <div>
                {  participants.map((participant,i)=>(
                    array.push(
                        {
                            'email': participant.email, 
                            'name': participant.name,
                            'account': participant.bank,
                            'deposit_date': participant.date,
                            'deposit_time':participant.time,
                            'deposit_price':participant.price,
                            'check_deposit':participant.ischecked
                        }
                    )
                ))}
                <Grid
                                data={array}
                                columns={columns}
                                rowHeight={25}
                                bodyHeight={100}
                                heightResizable={true}
                                rowHeaders={['rowNum']}
                            />
                            
            </div>

            
        )

    }
    else{
        return(
            <div>참여자가 없습니다.</div>
        )
    }

};

{/* return(
                        <>
                            <StateDetail participant={participant} key={i}/> */}

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
