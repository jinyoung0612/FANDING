import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, CardImg, CardBody,
    CardSubtitle } from 'reactstrap';
import { Link } from 'react-router-dom';

const FundingContents = ({funding})=>{


    // if(funding.createTime){
    //     var date= new Date(funding.createTime.seconds*1000);
    //     console.log(date)
    //     console.log(funding.thumbnailImage)
    //
    // }
    // const data= find(funding);

    // console.log("Funding Contents:",funding);
    return(

        <div>
            <Link to={'funding_detail/'+funding.id} funding={funding}>
            <Card sm="6">
                <CardImg src={funding.thumbnailImage}top width="100" alt="Card image cap" />
                <CardBody>
                    <CardTitle>[{funding.artistSelect}] {funding.fundingTitle}</CardTitle>
                    <CardSubtitle> {funding.fundingStartDate} {funding.fundingStartTime} ~ {funding.fundingEndTime} {funding.fundingEndTime}</CardSubtitle>
                    {/*<CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>*/}
                    {/*<Button>Button</Button>*/}
                </CardBody>
            </Card>
            </Link>
        </div>
    )
}

export default FundingContents;

