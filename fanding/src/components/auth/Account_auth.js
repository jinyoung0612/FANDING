import React, {Component,useState} from 'react';
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";
import {connect,useSelector} from 'react-redux';
import {useFirestoreConnect} from 'react-redux-firebase';
import firebase from 'firebase/app';
import ReactHtmlParser from 'react-html-parser';
import { storage } from 'firebase';

const ChongdaeInfo = (props) => {
    const doc_id = props.match.params.id;
    console.log(doc_id)
    useFirestoreConnect([{
        collection: 'chongdaes',
        doc: doc_id
    }]);

    const chongdae = useSelector(({firestore:{data}})=>data.chongdaes && data.chongdaes[doc_id]);
    console(chongdae);

    const user = firebase.auth().currentUser;
    if(chongdae && user){

    }
}

class Account_auth extends Component{

    constructor(props) {
        super(props);
        this.state = {
          access_token: '',
          refresh_token: '',
          user_seq_no: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChane = (e) => {
        this.setState({
          [e.target.id]: e.target.value,
        });
      };
    
      handleSubmit = (e) => {
        e.preventDefault();
    
        console.log(this.state.access_token);
        if(this.state.access_token!=null){
          var msg = "이미 본인인증이 완료되었습니다."
          alert(msg);
        }
      };

      
    render()
    {
        return(
            <body>
              {/*  <div id="access_token"><%=data.access_token%></div>
                <div id="refresh_token"><%=data.refresh_token%></div>
        <div id="user_seq_no"><%=data.user_seq_no%></div>*/}
            
            <h5>본인 인증</h5>
            <button id='verifyButton'>인증 완료</button>
            </body>
        )
    }
}

export default Account_auth;