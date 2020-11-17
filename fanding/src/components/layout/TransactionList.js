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
                          
                        }
                        else{
                          console.log('account list 불러오기 실패');
                        }  
                      })
                      .catch(function(error){
                        console.log(error);
                      })
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
  