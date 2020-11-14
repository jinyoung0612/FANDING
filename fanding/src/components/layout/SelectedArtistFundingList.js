import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import RewardFundingSummary from './funding/reward/RewardFundingSummary';
import CollectFundingSummary from './funding/collect/CollectFundingSummary';
const SelectedArtistFundingList = ({fundings}) => {
    return(
        <div>
            { fundings && fundings.map(funding => {
                if(funding.fundingType === "reward")
                {
                    return (
                    <Link to={'reward_funding/' + funding.id}>
                        <RewardFundingSummary funding={funding} key={funding.id} />
                    </Link>
                    )
                }
                else{
                    return (
                        <Link to={'collect_funding/' + funding.id}>
                            <CollectFundingSummary funding={funding} key={funding.id} />
                        </Link>
                    )
                }
                
            })}

        </div>
    )
}

export default SelectedArtistFundingList;