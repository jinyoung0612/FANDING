import React, {Component} from 'react';
import { Card, Button, CardTitle, CardText, Row, Col, Form, Input } from 'reactstrap';
import { Link } from "react-router-dom";
import { firebase } from 'firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import {verifyChongdae} from '../../store/actions/chongdaeAction';

class Chongdae_auth extends Component{

    constructor(props){
      super(props);

      this.state = {
        fintech_use_num: '',
        user_name: '',
        bank_name: ''
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
      this.setState({
        [e.target.id]: e.target.value,
      });
    };

    handleSubmit = (e) => {
      e.preventDefault();

      console.log(this.state.fintech_use_num);
      this.props.verifyChongdae(this.state);
      alert("계좌확인이 완료되었습니다.");
    }

    render()
    {
      const {auth, chongdaes} = this.props;
      console.log('auth', auth);
      console.log('chongdaes', chongdaes);
      
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
            
                    // 본인인증한 user 이름, 계좌 정보 가져오기
                axios.post('/api/user/me',{
                      access_token : access_token,
                      user_seq_no : user_seq_no
                    })
                    .then((res)=>{
                      if(res.data.user_name){
                        const result = res.data.res_list[0];
                        console.log('account list: ',result);
                        
                        this.setState({
                          fintech_use_num: result.fintech_use_num,
                          user_name: res.data.user_name,
                          bank_name: result.bank_name
                        });

                      }
                      else{
                        console.log('account list 불러오기 실패');
                      }  
                    })
                    .catch(function(error){
                      console.log(error);
                    })

            if(access_token!='error'&&access_token!=null){
              return(
                <Card body>
                  <Row>
                  <Col sm="6">
                    <Card body>
                      <CardTitle>본인 인증</CardTitle>
                      <CardText>이미 본인인증이 완료되었습니다.</CardText>
                      <Form onSubmit = {this.handleSubmit}>
                        <Input type="text" id="fintech_use_num" placeholder={this.state.fintech_use_num} onChange={this.handleChange}/>
                        <Input type="text" id="user_name" placeholder={this.state.user_name} onChange={this.handleChange}/>
                        <Input type="text" id="bank_name" placeholder={this.state.bank_name} onChange={this.handleChange}/>
                        <Button>계좌 확인</Button>
                      </Form>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <Card body>
                      <CardTitle>거래 내역 조회</CardTitle>
                      <CardText>본인 인증 시 등록한 계좌의 거래 내역 조회</CardText>
                      <Link to='/transaction_list'>
                      <Button color="warning">조회</Button>
                      </Link>
                    </Card>
                  </Col>
                </Row>
                </Card>  
                
              );
            }
          }
          else{
            return(
              <Card body>
                    <CardTitle>본인 인증</CardTitle>
                    <CardText>펀딩을 생성하려면 본인 인증이 필요합니다.</CardText>
                    <Button id="verButton" color="warning" 
                    href="https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code&client_id=qhsl7X3L59LPtU6QfdZNv2d4jYYKKFiY8K2iw2NI&redirect_uri=http://localhost:3000/account_auth&scope=login inquiry transfer&state=12345678901234567890123456789012&auth_type=0&lang=kor" >본인 인증</Button>
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
const mapDispatchToProps = (dispatch) => {
  return {
      verifyChongdae: (creds) => dispatch(verifyChongdae(creds))
  };
};

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
  }),
  connect(mapDispatchToProps)
)(Chongdae_auth);


