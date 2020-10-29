import React, {Component, useState} from 'react';
import { Link } from "react-router-dom";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

const MyAccount = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  //리스트 만들기
  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            내 정보 관리
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            총대 인증
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            생성한 펀딩 관리
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => { toggle('4'); }}
          >
            참여한 펀딩 관리
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <h4>Tab 1 Contents</h4>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="6">
              <Card body>
                <CardTitle>본인 인증</CardTitle>
                <CardText>펀딩을 생성하려면 본인 인증이 필요합니다.</CardText>
                <Button color="warning" onClick={Identify_auth}>본인 인증</Button>
              </Card>
            </Col>
            <Col sm="6">
              <Card body>
                <CardTitle>계좌 인증</CardTitle>
                <CardText>펀딩을 생성하려면 계좌 인증이 필요합니다. </CardText>
                <Button color="warning">계좌 인증</Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}

function Identify_auth(){
  const userIdentifyAuth = window.open(
    "https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code&client_id=qhsl7X3L59LPtU6QfdZNv2d4jYYKKFiY8K2iw2NI&redirect_uri=http://localhost:3000/account_auth&scope=login inquiry transfer&state=12345678901234567890123456789012&auth_type=0&lang=kor"
  )
};

export default MyAccount;
