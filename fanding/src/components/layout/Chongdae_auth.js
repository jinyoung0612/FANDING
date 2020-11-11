import React, {Component} from 'react';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";
import { storage } from 'firebase';
import { $CombinedState } from 'redux';

class Chongdae_auth extends Component{

    render()
    {
        return(
          <Card body>
                <CardTitle>본인 인증</CardTitle>
                <CardText>펀딩을 생성하려면 본인 인증이 필요합니다.</CardText>
                <Link to="/account_auth">
                  <Button color="warning" onClick={chongdae_auth} >본인 인증</Button>
                </Link>
          </Card>  
        );
    }
}

function chongdae_auth(){
  const chongdaeVerify = window.open(
    "https://testapi.openbanking.or.kr/oauth/2.0/authorize?"
    +"response_type=code&"
    +"client_id=qhsl7X3L59LPtU6QfdZNv2d4jYYKKFiY8K2iw2NI&"
    +"redirect_uri=http://localhost:3000/account_auth&"
    +"scope=login inquiry transfer&"
    +"state=202002CAPSTONEPROJECTTEAM002A2B2"
    +"&auth_type=0&lang=kor"
  )

  fetch('http://localhost:3000/api/token',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      access_token: this.state.access_token,
    }),
  });
};



export default Chongdae_auth;