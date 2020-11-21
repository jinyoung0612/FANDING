import React, { useState, Component, PureComponent } from "react";
import {CardDeck} from 'reactstrap';
import main_image from './fanding_main_image.png';
import {firestoreConnect, useFirestoreConnect} from 'react-redux-firebase';
import { compose } from 'redux';
import {firebase } from 'firebase';
import {firebaseConnect, isLoaded, isEmpty} from "react-redux-firebase";
import {connect, useSelector} from "react-redux";
import SelectedArtist from "./SelectedArtist";
import FundingContents from "./FundingContents";

const MainPageCom =()=> {



    const fundings=useSelector((state)=>state.firestore.ordered.fundings);
    // console.log(fundings);


    return(
        <CardDeck style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', margin:'10px'}}> 
            {
                fundings.map((funding,i)=>{
                    return(
                        <FundingContents funding={funding} key={i}></FundingContents>
                    )
                })


            }
        </CardDeck>
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



