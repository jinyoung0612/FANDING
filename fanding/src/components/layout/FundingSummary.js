import React from 'react';
import { Card, CardImg, CardTitle, CardSubtitle, CardText, CardBody } from 'reactstrap';

const FundingSummary = ({funding}) => {
    return(
        <Card sm="6">
            <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
            <CardBody>
            <CardTitle>{funding.fundingTitle}</CardTitle>
            <CardSubtitle>{funding.fundingType}</CardSubtitle>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            {/*<Button>Button</Button>*/}
            </CardBody>
        </Card>
    )
}

export default FundingSummary;