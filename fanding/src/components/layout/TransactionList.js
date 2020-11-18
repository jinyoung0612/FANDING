import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

class TransactionList extends Component{

    render(){
        const {auth, chongdaes} = this.props;
        console.log('auth', auth);
        console.log('chongdaes', chongdaes);
        const finNum = '';

        if(!isLoaded(auth)){
            return <div> Loading... </div>
        }
        if(this.props.auth.uid){
            if(!isLoaded(chongdaes)){
                return <div>Loading...</div> 
            }else{
                if(chongdaes[0]!=null){
                  
                    console.log('chongdae_access_token: ',chongdaes[0].access_token);
                    const access_token = chongdaes[0].access_token;
                    const user_seq_no = chongdaes[0].user_seq_no;
                    const finNum = chongdaes[0].fintech_use_num;
                    /*
                    // 본인인증한 user 이름, 계좌 정보 가져오기
                    axios.post('/api/user/me',{
                        access_token : access_token,
                        user_seq_no : user_seq_no
                      })
                      .then((res)=>{
                        if(res.data.user_name){
                          const userName = res.data.user_name;
                          console.log('user name: ',userName);
                          const result = res.data.res_list[0];
                          console.log('account list: ',result);
                          finNum = result.fintech_use_num;
                          console.log('user/me에서 핀테크이용번호: ',finNum);
                        }
                        else{
                          console.log('account list 불러오기 실패');
                        }  
                      })
                      .catch(function(error){
                        console.log(error);
                      })*/
                    if(finNum!=null){
                      // 거래내역 가져오기
                      console.log("핀테크이용번호: ",finNum);
                      axios.post('api/account/transaction',{
                        access_token : access_token,
                        fintech_use_num: finNum
                      })
                      .then((res)=>{
                        const tranList = res.data;
                        console.log("거래내역 결과:", tranList);
                      })
                    }  
                }
            }//else
        }//uid if
    }//render
}

const mapStateToProps = (state) => {
    console.log('mapStateToProps', state);
    return {
      uid : state.firebase.auth.uid,
      chongdaes : state.firestore.ordered.chongdaes,
      auth : state.firebase.auth,
      authError : state.auth.authError,
    }
  }
  
  export default compose(
    connect(mapStateToProps),
    firestoreConnect(props=> {
      const user_email = props.auth.email == null ? 'none': props.auth.email;
      console.log('user email: ', user_email);
  
      return[
        {
          collection: 'chongdaes',
          where: [['user_email', '==', user_email]]
        }
      ]
    })
  )(TransactionList);
  
  async function getFinNum(chongdaes){
    console.log('chongdae_access_token: ',chongdaes[0].access_token);
    const access_token = chongdaes[0].access_token;
    const user_seq_no = chongdaes[0].user_seq_no;

    // 본인인증한 user 이름, 계좌 정보 가져오기
    axios.post('/api/user/me',{
      access_token : access_token,
      user_seq_no : user_seq_no
    })
    .then((res)=>{
      if(res.data.user_name){
        const userName = res.data.user_name;
        console.log('user name: ',userName);
        const result = res.data.res_list[0];
        console.log('account list: ',result);
        const finNum = result.fintech_use_num;
        const accountHolderName = result.account_holder_name;
        const bankName = result.bank_name;

        const userMeResult = {
          user_name : userName,
          fintech_use_num : finNum,
          account_holder_name : accountHolderName,
          bank_name : bankName
        }

        console.log('getFinNum 속 userMeResult',userMeResult);
        
        return finNum;
      }
      else{
        console.log('account list 불러오기 실패');
      }  
    })
    .catch(function(error){
      console.log(error);
    })

  }