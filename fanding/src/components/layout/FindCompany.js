import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { Button, NavLink, Col, Form, FormGroup, Label, Input, 
    Card, CardBody, CardTitle, CardSubtitle, CardImg, CardText,
    FormText, CustomInput } from 'reactstrap';
import { connect } from 'react-redux';

const FindCompany = (props) => {

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

export default FindCompany; 