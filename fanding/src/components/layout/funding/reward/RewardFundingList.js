import React from 'react';
import { CardDeck, Col, Container, Row } from 'reactstrap';

import { Link } from 'react-router-dom';
import RewardFundingSummary from './RewardFundingSummary';
const FundingList = ({fundings}) => {


console.log(fundings);


    return(
        <CardDeck style={{display: 'flex', flexDirection: 'row', 
                    justifyContent: 'left', margin:'10px'}}>
        
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