import React from 'react';
import firebase from "firebase/app";

const FundingContents = ({funding})=>{
    console.log(funding)
    if(funding.createTime){
        var date= new Date(funding.createTime.seconds*1000);
        console.log(date)}
    return(
        <div>{funding.fundingTitle}</div>
    )
}

export default FundingContents;