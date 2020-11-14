import React, {Component} from 'react';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";
import { firebase } from 'firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
//import { connect } from '../../server/routes';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

class Chongdae_auth extends Component{

    render()
    {
      const {auth, chongdaes} = this.props;
      console.log('auth', auth);
      console.log('chongdaes', chongdaes);
      //

      if(!isLoaded(auth)){
        return <div>Loading...</div>
      }

      if(this.props.auth.uid){
        if(!isLoaded(chongdaes)){
          return <div>Loading...</div>
        }
        else{
          if(chongdaes[0]!=null){
            console.log('chongdae_access_token:',chongdaes[0].access_token);
            const access_token = chongdaes[0].access_token;
            const user_seq_no = chongdaes[0].user_seq_no;
            
            axios.post('/api/account/list',{
              access_token : access_token,
              user_seq_no : user_seq_no
            })
            .then((res)=>{
              if(res.data.rsp_code){
                const errCode = res.data.rsp_code
                console.log(`arror: ${errCode}`)
              }
              else{
                const result = res.data
                console.log(`account list result: ${result}`)
              }  
            })

            //console.log('account_list result:',result);

            return(
              <Card body>
                    <CardTitle>본인 인증</CardTitle>
                    <CardText>이미 본인인증이 완료되었습니다.</CardText>
              </Card>  
            );
          }
          else{
            return(
              <Card body>
                    <CardTitle>본인 인증</CardTitle>
                    <CardText>펀딩을 생성하려면 본인 인증이 필요합니다.</CardText>
                    <Button id="verButton" color="warning" 
                    href="https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code&client_id=qhsl7X3L59LPtU6QfdZNv2d4jYYKKFiY8K2iw2NI&redirect_uri=http://localhost:3000/account_auth&scope=login inquiry transfer&state=12345678901234567890123456789012&auth_type=0&lang=kor" >본인 인증</Button>
                    {/*<Link to="/account_auth">
                      <Button id="verButton" color="warning" onClick={chongdae_auth} >본인 인증</Button>
            </Link>*/}
              </Card>  
            );
          }
        }//else
      }   
    }
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
)(Chongdae_auth);
