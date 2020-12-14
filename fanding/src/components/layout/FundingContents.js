import React from 'react';
import { Card, CardTitle,  CardImg, CardBody,
    CardSubtitle, CardDeck } from 'reactstrap';
import { Link } from 'react-router-dom';
let imgStyle = {
    maxHeight: '200px',
    maxWidth: '200px'
  }
const FundingContents = ({funding})=>{

    return(
        <CardDeck style={{display: 'flex', flexDirection: 'row',
            justifyContent: 'left', margin:'10px'}}>
            <Link className="inactive" activeClassName="active" to={'funding_detail/'+funding.id} funding={funding}>
                <Card className="col-sm-12 col-12 align-items-sm-stretch card-bigger border-custom"
                      body style={{width:'18em',flex: '1', height:'20em', margin: '8px', paddingTop:'10px',
                    paddingBottom:'10px', paddingLeft:'10px', paddingRight:'10px'}} >
                    <CardImg src={funding.thumbnailImage}top width="100" alt="Card image cap" style={{height:"194px"}}/>
                    <CardBody>
                        <CardTitle>[{funding.artistSelect}] {funding.fundingTitle}</CardTitle>
                        <CardSubtitle> {funding.fundingStartDate} {funding.fundingStartTime} ~ {funding.fundingEndDate} {funding.fundingEndTime}</CardSubtitle>
                        {/*<CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>*/}
                        {/*<Button>Button</Button>*/}
                    </CardBody>
                </Card>
            </Link>
        </CardDeck>

    )
}

export default FundingContents;

