import React from "react";
import FundingContents from "./FundingContents";
const FundingList=({fundings})=>{
    return(
        <div>
            {fundings.map(funding=>{
                console.log(funding)
                return(
                    <FundingContents funding={funding} key={funding.createTime}/>
                )
            })}
        </div>
    )
}
export default FundingList;