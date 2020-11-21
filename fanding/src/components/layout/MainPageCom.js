import React, { useState, Component, PureComponent } from "react";
import {CardDeck, Media} from 'reactstrap';
import main_image from './fanding_main_image.png';
import {firestoreConnect, useFirestoreConnect} from 'react-redux-firebase';
import { compose } from 'redux';
import {firebase } from 'firebase';
import {firebaseConnect, isLoaded, isEmpty} from "react-redux-firebase";
import {connect, useSelector} from "react-redux";
import SelectedArtist from "./SelectedArtist";
import FundingContents from "./FundingContents";
import {Link} from "react-router-dom";
import FundingSummary from "./funding/reward/RewardFundingSummary";
import CollectFundingSummary from "./funding/collect/CollectFundingSummary";

const MainPageCom =()=> {



    const fundings=useSelector((state)=>state.firestore.ordered.fundings);
    // console.log(fundings);


    return(
        <div>
            <CardDeck style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', margin:'10px'}}>
            {
                fundings.map((funding,i)=>{
                    return(
                        <FundingContents funding={funding} key={i}></FundingContents>
                    )
                })


            }
            </CardDeck>
        </div>

        // <CardDeck style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', margin:'10px'}}>
        //     {
        //         fundings.map((funding,i)=>{
        //             if(funding.fundingType==="reward"){
        //                 return(
        //                     <Link to={'reward_funding/' + funding.id}>
        //                         <FundingSummary funding={funding} key={funding.id} />
        //                     </Link>
        //                 )
        //             }
        //             else {
        //                 return(
        //                     <Link to={'collect_funding/' + funding.id}>
        //                         <CollectFundingSummary funding={funding} key={funding.id} />
        //                     </Link>
        //                 )
        //             }
        //
        //         })
        //
        //
        //     }
        // </CardDeck>
    )

}

// store의 state 값을 props로 연결해줌
const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth,

    }
};
export default connect(
    mapStateToProps
)(MainPageCom);



