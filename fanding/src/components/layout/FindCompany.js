import React, {Component} from 'react';
import { Button, NavLink, Card, CardBody, CardTitle, CardSubtitle, CardImg, CardText} from 'reactstrap';
import { connect, useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import firebase from 'firebase';

const FindCompany = (props) => {

    useFirestoreConnect([{
        collection: 'chongdaes',
        where: [
            ['user_email','==',firebase.auth().currentUser.email]
        ]
    }]);

    const chongdae =useSelector((state)=>state.firestore.ordered.chongdae);
    console.log(chongdae);

    if(isLoaded(chongdae)){
    return (
        <div>
        <NavLink href="/find_company_form"><Button className="pull-right" outline color="primary">업체모집 폼 생성</Button></NavLink>

        
        <Card sm="6">
            <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
            <CardBody>
            <CardTitle>Fuding title1</CardTitle>
            <CardSubtitle> subtitle</CardSubtitle>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            {/*<Button>Button</Button>*/}
            </CardBody>
        </Card>
        <Card sm="6">
            <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
            <CardBody>
            <CardTitle>Fuding title2</CardTitle>
            <CardSubtitle> subtitle</CardSubtitle>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            {/*<Button>Button</Button>*/}
            </CardBody>
        </Card>
        <Card sm="6">
            <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
            <CardBody>
            <CardTitle>Fuding title3</CardTitle>
            <CardSubtitle> subtitle</CardSubtitle>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            {/*<Button>Button</Button>*/}
            </CardBody>
        </Card>
        </div>
    )    
  }  
}


export default FindCompany; 