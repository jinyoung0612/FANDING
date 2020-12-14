import React from 'react';
import { Card, CardImg, CardTitle, CardText, CardBody } from 'reactstrap';
let imgStyle = {
    maxHeight: '128px',
    maxWidth: '128px'
  }
const RecruitFundingSummary = ({recruitCompany}) => {
    return(
        <Card className="col-sm-12 col-12 align-items-sm-stretch card-bigger border-custom"
        body style={{width:'18em',flex: '1', height:'20em', margin: '8px',
        paddingTop:'10px', paddingBottom:'10px', paddingLeft:'10px', paddingRight:'10px'}} >
            <CardImg top width="100%" src={recruitCompany.itemImage} style={{height:'194px'}} alt="Card image cap" />
            <CardBody>
            <CardTitle>{recruitCompany.itemTitle}</CardTitle>
            <CardText><p>원하는 가격: {recruitCompany.itemPrice}</p></CardText>
            </CardBody>
        </Card>
    )
}

export default RecruitFundingSummary;