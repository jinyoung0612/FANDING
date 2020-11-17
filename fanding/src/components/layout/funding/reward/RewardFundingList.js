import React from 'react';
//import { Card, CardImg, CardTitle, CardSubtitle, CardText, CardBody } from 'reactstrap';

import { Link } from 'react-router-dom';
import RewardFundingSummary from './RewardFundingSummary';
const FundingList = ({fundings}) => {
//     const rows=[...Array(Math.ceil(fundings.length/4))];
//    //chunk the products into the array of rows
//     const itemRows = rows.map((row, idx)=>
//     fundings.slice(idx*4, idx*4+4));
//     //map the rows as div.row
//     const content = itemRows.map((row, idx)=>
//     <div className="row" key={idx}>
//         {row.map(funding =>
//             <article key={funding} className="col-md-3">
//                 {funding}
//             </article>)}
//     </div>)

console.log(fundings);



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