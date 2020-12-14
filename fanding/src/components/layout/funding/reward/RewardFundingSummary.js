import React from 'react';
import { Card, CardImg, CardTitle, CardSubtitle, CardText, CardBody, Row, Col } from 'reactstrap';
let imgStyle = {
    maxHeight: '200px',
    maxWidth: '200px'
  }

const FundingSummary = ({funding}) => {
    return(


        <Card className="col-sm-12 col-12 align-items-sm-stretch card-bigger border-custom"
            body style={{width:'18em',flex: '1', height:'20em', margin: '8px',
            paddingTop:'10px', paddingBottom:'10px', paddingLeft:'10px', paddingRight:'10px'}} >
            
            <CardImg top width="100%" src={funding.url} style={{height:"194px"}} alt="Card image cap" />
            <CardBody>
            {/*<CardTitle>{funding.fundingTitle}</CardTitle>*/}
                <CardTitle>[{funding.artistSelect}] {funding.fundingTitle}</CardTitle>
                <CardSubtitle> {funding.fundingStartDate} {funding.fundingStartTime} ~ {funding.fundingEndDate} {funding.fundingEndTime}</CardSubtitle>
            <CardText></CardText>
            </CardBody>

        </Card>


        
    )
}
// 
export default FundingSummary;

