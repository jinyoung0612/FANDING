import React, {Component} from 'react';
import { Form, Input, Card, Button, CardTitle, CardText, Row, Col, Container } from 'reactstrap';
import { Link } from "react-router-dom";
import { firebase } from 'firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import {verifyChongdae, getTransactionList} from '../../store/actions/chongdaeAction';
import SideBar from './SideBar';

class Chongdae_auth extends Component{

    constructor(props){
      super(props);

      this.state = {
        access_token: '',
        fintech_use_num: '',
        user_name: '',
        bank_name: '',
        //transaction_list: ''
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
      this.props.getTransactionList(this.state);
      alert("계좌확인이 완료되었습니다.");
      if(this.state){
        this.props.history.push("/");
      }
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
            this.state.access_token = access_token;

            let currentComponent = this;
            getUserMe(chongdaes,currentComponent);

            if(access_token!=='error'&&access_token!=null){
              return(
                <section class="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q"
                style={{paddingTop:'25px'}}>
                  <Container>
                <Card body>
                  <Row>
                  <Col sm="3">
                    <SideBar />
                  </Col>
                  <Col sm="4">
                    <Card body>
                      <CardTitle class="jb-x-large"><h3><strong>본인 인증 step3</strong></h3> </CardTitle>
                      <CardText>본인인증이 완료되었습니다. 계좌 정보 최종 확인을 위한 단계로 하단의 '최종 확인' 버튼을 클릭해주세요.</CardText>
                      <CardText style={{color:'red'}}>※최종 확인 버튼은 한번만 누르면 됩니다!!※</CardText>
                      <Form onSubmit = {this.handleSubmit}>
                        <Input type="hidden" id="access_token" placeholder={this.state.access_token} onChange={this.handleChange}/>
                        <Input type="hidden" id="fintech_use_num" placeholder={this.state.fintech_use_num} onChange={this.handleChange}/>
                        <Input type="hidden" id="user_name" placeholder={this.state.user_name} onChange={this.handleChange}/>
                        <Input type="hidden" id="bank_name" placeholder={this.state.bank_name} onChange={this.handleChange}/>
                        <Button>최종 확인</Button>
                      </Form>
                    </Card>
                  </Col>
                </Row>
                
                </Card>
                </Container>  
                </section>
              );
            }
          }
          else{
            return(
              <section class="gallery5 mbr-gallery cid-sgtDmxvlJH" style={{paddingTop:'25px'}} id="gallery5-q">
                {/* <div class="mbr-section-head pb-10"></div> */}
                        
                        
            

              <Container>
              
              <Row>
                <Col sm="3">
                <SideBar />
                </Col>
                <Col sm="4">
                <div style={{paddingTop:'90px'}}>
                <h4 class="mbr-section-title mbr-fonts-style align-center mb-10 display-2 "><strong>본인 인증</strong></h4>
                
                    {/* <CardTitle>본인 인증</CardTitle> */}

                    <p>펀딩생성 및 업체 모집을 하려면 본인 인증이 필요합니다.</p>
                    
                    <Button block id="verButton" color="success" 
                    //href="https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code&client_id=qhsl7X3L59LPtU6QfdZNv2d4jYYKKFiY8K2iw2NI&redirect_uri=http://localhost:3000/account_auth&scope=login inquiry transfer&state=12345678901234567890123456789012&auth_type=0&lang=kor" 
                    href="https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code&client_id=qhsl7X3L59LPtU6QfdZNv2d4jYYKKFiY8K2iw2NI&redirect_uri=http://118.67.131.132:3000/account_auth&scope=login inquiry transfer&state=12345678901234567890123456789012&auth_type=0&lang=kor" 
                    >본인 인증</Button>
                </div>
                </Col>
                {/* <Col sm="4">

                <div style={{paddingTop:'90px'}}>
                <h4 class="mbr-section-title mbr-fonts-style align-center mb-10 display-2 "><strong>팬 인증</strong></h4>

                    <p>펀딩생성 및 업체 모집을 하려면 팬 인증이 필요합니다.</p>
                    
                </div>
                <Button block id="verButton" color="success" 
                    href='/fan_auth'>팬 인증</Button>
                </Col> */}
                
                    
                
              </Row>
              
              
               
              </Container>
              </section>
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
  console.log(dispatch);
  return {
      getTransactionList: (creds) => dispatch(getTransactionList(creds))
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
  connect(null,mapDispatchToProps)
)(Chongdae_auth);

async function getUserMe(chongdaes, currentComponent){
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
                        
        currentComponent.setState({
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

}