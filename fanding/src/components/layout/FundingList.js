import React from 'react';
//import { Card, CardImg, CardTitle, CardSubtitle, CardText, CardBody } from 'reactstrap';
import FundingSummary from './FundingSummary';

const FundingList = ({fundings}) => {
    return(
        <div>
            { fundings && fundings.map(funding => {
                return (
                    <FundingSummary funding={funding} key={funding.id} />
                )
            })}

        </div>
    )
}

export default FundingList;