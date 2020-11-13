import React, {Component,useState} from 'react';
import { Button, Form, Input, Label } from 'reactstrap';
import { Link } from "react-router-dom";
import {connect,useSelector} from 'react-redux';
import {useFirestoreConnect} from 'react-redux-firebase';
import firebase from 'firebase/app';
import ReactHtmlParser from 'react-html-parser';
import { storage } from 'firebase';
import axios from 'axios';
import {verifyChongdae} from '../../store/actions/chongdaeAction';

var accessTokenResult = {};

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
        this.handleChange = this.handleChange.bind(this);
      }

    componentDidMount(){
      
      getToken2();
    
    }
    
      handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value,
        });
      };
    
      handleSubmit = (e) => {
        e.preventDefault();
    
        console.log(this.state.access_token);
        this.props.verifyChongdae(this.state)
        /*
        if(this.state.access_token!=null){
          var msg = "이미 본인인증이 완료되었습니다."
          alert(msg);
        }*/
      };

      
    render()
    {
        return(
          <div>
            <h5>본인 인증</h5>
            <Form onSubmit = {this.handleSubmit}>
              <h5>사용자 정보</h5>
              <Label>Access Token</Label>
              <Input type="text" id="access_token" 
              placeholder={this.state.access_token} onChange={this.handleChange}/>
              <Label>Refresh Token</Label>
              <Input type="text" id="refresh_token" 
              placeholder={this.state.refresh_token} onChange={this.handleChange} />
              <Label>User Number</Label>
              <Input type="text" id="user_seq_no" 
              placeholder={this.state.user_seq_no} onChange={this.handleChange} />
              <Button id='verifyButton' >인증 완료</Button>
            </Form>
            
          </div>
        )
    }
}

const mapStateToProps = (state) => {
  return{
      authError: state.auth.authError,
      auth: state.firebase.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      verifyChongdae: (creds) => dispatch(verifyChongdae(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Account_auth);

function token(){
  console.log(window.location.href);
  if(getQueryStringObjectToken()){
    var authCode = getQueryStringObjectToken()
    axios.post('/api/token',{
      code: authCode
    })
    .catch(function(error){
      console.log(error);
    })
    
    //window.location.href = "http://localhost:3000/";
  }
  else{
    alert("본인인증에 실패했습니다. 다시 인증하세요.")
    //window.location.href = "http://localhost:3000/chongdae";
  }
}

async function getToken(){
  fetch('/api/returnToken')
  .then(res=>res.json())
  .then(data=>{
    console.log(data);
    this.setState({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      user_seq_no: data.user_seq_no
    })
  });
}

function getToken2(){
  return async ()=>{
    //const data = await token();
    //console.log(data);
    token();
    axios.get('/api/returnToken')
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      this.setState({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        user_seq_no: data.user_seq_no
      })
    });
  }
}


function getQueryStringObjectToken(){
  var a = window.location.href.split('&');
  if(a=="") return {};
  var p = a[0].split('=',2);
  //console.log(p[1]);
  return p[1];
}

//export default Account_auth;