import React from 'react';
import { CardDeck} from 'reactstrap';

import { Link } from 'react-router-dom';
import RewardFundingSummary from './RewardFundingSummary';
const FundingList = ({fundings}) => {


console.log(fundings);


    return(
        <CardDeck style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', 
                    margin:'10px', flexFlow:'row wrap', alignItems:'center'}}>
        
            { fundings && fundings.map(funding => {
                return (
                        
                        
                            <Link className="inactive" activeClassName="active" to={'funding_detail/' + funding.id}>
                                <RewardFundingSummary funding={funding} key={funding.id} />
                            </Link>
                        
                        
                )
            })}
        </CardDeck>


    )
}

export default FundingList;