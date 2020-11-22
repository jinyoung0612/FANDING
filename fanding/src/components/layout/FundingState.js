import React, {useEffect, useState} from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card,Input, Button,Form } from 'reactstrap';
import {connect, useDispatch, useSelector} from "react-redux";
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import {firestoreConnect, useFirestoreConnect, isLoaded} from "react-redux-firebase";
import firebase from "firebase/app"
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import {loadParticipants} from "../../store/actions/userActions";
import 'tui-grid/dist/tui-grid.css';
import Grid from '@toast-ui/react-grid';
import TuiGrid from 'tui-grid';
import axios from 'axios';
import {check_deposit} from "../../store/actions/userActions"

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


    const doc_id=props.match.params.id;
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(loadParticipants(doc_id))
    },[dispatch]);

    const participants =props.user_data;    
    const transactionLists = props.transactionLists;
    console.log("transactionLists: ",transactionLists);


    if(!isLoaded(transactionLists)){
        console.log("transactionLists 로드 안됨")
        return(
            <div>페이지 오류</div>
        )
    }
    else{
        if(transactionLists[0]!==null){
            
                   if(participants.length!==0){
                    check(transactionLists, participants);
                    
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
                                        'check_deposit':participant.isChecked
                                        //'check_deposit':participants_state[participant.uid]
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
            //}
        }
    } 
};

const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth,
        user_data:state.auth.user_data,
        transactionLists: state.firestore.ordered.transactionLists,
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props=>{
        const user_email = props.auth.email == null ? 'none': props.auth.email;
      console.log('user email: ', user_email);
  
      return[
        {
          collection: 'transactionLists',
          where: [['chongdae_email', '==', user_email]],
        }
      ];
    })
)(FundingState);

async function check(transactionLists, participants){
    if(transactionLists!==null){
        
        const access_token =  transactionLists[0].access_token;
        const fintech_use_num = transactionLists[0].fintech_use_num;
        
        axios.post('/api/account/transaction/check',{
          access_token : access_token,
          fintech_use_num : fintech_use_num,
          participants: participants,
        })
        .then((res)=>{
          if(res.data){
            console.log(res.data);
            const pState = res.data;
            for(var i = 0; i< participants.length ; i++){
              const uid = participants[i].uid;
              console.log('participants['+i+'].uid: ', participants[i].uid);
              if(pState[uid]==='true'){
                check_deposit(participants[i]);
              }
            }
          }
          else{
            console.log('실패실패실패실패');
          }  
        })
        .catch(function(error){
          console.log(error);
        })
    }
  }



