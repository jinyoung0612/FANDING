import React from 'react';
import { Card, CardTitle, CardText, Row, Col, CardImg, CardBody,
    CardSubtitle, CardDeck } from 'reactstrap';
import { Link } from 'react-router-dom';
let imgStyle = {
    maxHeight: '200px',
    maxWidth: '200px'
  }
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
            <Link className="inactive" activeClassName="active" to={'funding_detail/'+funding.id} funding={funding}>
            <Card body style={{width:'15em',flex: '1', backgroundColor: "#ebebeb", height:'20em', maxwidth:'20em', margin: '5px'}} >
                <CardImg src={funding.thumbnailImage} top width="100" alt="Card image cap" style={imgStyle}/>
                <CardBody>
                    <CardTitle>[{funding.artistSelect}] {funding.fundingTitle}</CardTitle>
                    <CardSubtitle> {funding.fundingStartDate} {funding.fundingStartTime} ~ {funding.fundingEndDate} {funding.fundingEndTime}</CardSubtitle>
                    {/*<CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>*/}
                    {/*<Button>Button</Button>*/}
                </CardBody>
            </Card>
            </Link>
        </div>
    )
}

export default FundingContents;

