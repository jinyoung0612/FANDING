import React, {Component} from 'react';
import { Card, Button, CardTitle, CardText, Row, Col, Container } from 'reactstrap';
import { Link } from "react-router-dom";
import { firebase } from 'firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import SideBar from './SideBar';
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

            if(access_token!='error'&&access_token!=null){
              return(
                <Card body>
                  <Row>
                  <Col sm="6">
                    <Card body>
                      <CardTitle>본인 인증</CardTitle>
                      <CardText>이미 본인인증이 완료되었습니다.</CardText>
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
              <section class="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
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
                    <p>펀딩을 생성하려면 본인 인증이 필요합니다.</p>
                </div>
                </Col>
                <Col sm="4">
                    <Button block style={{marginTop:'90px'}} id="verButton" color="warning" 
                    href="https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code&client_id=qhsl7X3L59LPtU6QfdZNv2d4jYYKKFiY8K2iw2NI&redirect_uri=http://localhost:3000/account_auth&scope=login inquiry transfer&state=12345678901234567890123456789012&auth_type=0&lang=kor" >본인 인증</Button>
                </Col>
             

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
