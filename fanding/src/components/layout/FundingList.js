import React from "react";
import FundingContents from "./FundingContents";
import {CardDeck} from "reactstrap";
const FundingList=({fundings})=>{
    console.log(fundings)
    return(
        <CardDeck style={{display: 'flex', flexDirection: 'row', 
                    justifyContent: 'left', margin:'10px'}}>
            {fundings.map(funding=>{
                // console.log(funding)
                return(
                    <FundingContents funding={funding} key={funding.id}/>
                )
            })}
        </CardDeck>
    )
}
export default FundingList;