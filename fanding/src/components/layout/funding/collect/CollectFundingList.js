import React from 'react';
//import { Card, CardImg, CardTitle, CardSubtitle, CardText, CardBody } from 'reactstrap';
import FundingSummary from './CollectFundingSummary';
import { Link } from 'react-router-dom';

const CollectFundingList = ({fundings}) => {
    return(
        <div>
            { fundings && fundings.map(funding => {
                return (
                    <Link to={'reward_funding/' + funding.id}>
                        <FundingSummary funding={funding} key={funding.id} />
                    </Link>
                )
            })}

        </div>
    )
}

export default CollectFundingList;