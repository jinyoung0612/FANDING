import React from "react";
import FundingContents from "./FundingContents";
const FundingList=({fundings})=>{
    console.log(fundings)
    return(
        <div>
            {fundings.map(funding=>{
                // console.log(funding)
                return(
                    <FundingContents funding={funding} key={funding.id}/>
                )
            })}
        </div>
    )
}
export default FundingList;