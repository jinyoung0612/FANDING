import React from 'react';
//import { Card, CardImg, CardTitle, CardSubtitle, CardText, CardBody } from 'reactstrap';

import { Link } from 'react-router-dom';
import RewardFundingSummary from './RewardFundingSummary';
const FundingList = ({fundings}) => {
    return(
        <div>
            { fundings && fundings.map(funding => {
                return (
                    <Link to={'reward_funding/' + funding.id}>
                        <RewardFundingSummary funding={funding} key={funding.id} />
                    </Link>
                )
            })}

        </div>
    )
}

export default FundingList;