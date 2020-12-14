import React from 'react';
import FundingSummary from './funding/reward/RewardFundingSummary';
import { Link } from 'react-router-dom';

const MainPageFundingList = ({props}) => {
    const doc_id=props.match.params.id;
    console.log(doc_id)
    
    
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

export default MainPageFundingList;