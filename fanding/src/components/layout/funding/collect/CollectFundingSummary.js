import React from 'react';
import { Card, CardImg, CardTitle, CardSubtitle, CardText, CardBody } from 'reactstrap';
let imgStyle = {
    maxHeight: '128px',
    maxWidth: '128px'
  }
const CollectFundingSummary = ({funding}) => {
    return(
        <Card className="col-sm-12 col-12 align-items-sm-stretch card-bigger border-custom"
            body style={{width:'18em',flex: '1', height:'20em', margin: '8px',paddingTop:'10px',
            paddingBottom:'10px', paddingLeft:'10px', paddingRight:'10px'}} >
            <CardImg top width="100%" src={funding.url} style={{height:"194px"}} alt="Card image cap" />
            <CardBody>
            <CardTitle>{funding.fundingTitle}</CardTitle>
            <CardSubtitle>{funding.fundingType}</CardSubtitle>
            <CardText></CardText>
            {/*<Button>Button</Button>*/}
            </CardBody>
        </Card>
    )
}

export default CollectFundingSummary;