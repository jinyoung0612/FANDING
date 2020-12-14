import React, { useState, Component, PureComponent } from "react";
import {CardDeck} from 'reactstrap';
import {connect, useSelector} from "react-redux";
import FundingContents from "./FundingContents";


const MainPageCom =()=> {



    const fundings=useSelector((state)=>state.firestore.ordered.fundings);
    // console.log(fundings);


    return(

        <div>
            <CardDeck style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', 
                    margin:'10px', flexFlow:'row wrap', alignItems:'center'}}>
            {
                fundings.map((funding,i)=>{
                    return(
                        <FundingContents funding={funding} key={i}></FundingContents>
                    )
                })


            }

            </CardDeck>
        </div>


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



