import React, { useState, Component } from "react";
import {Media} from 'reactstrap';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { MainPageFundingList } from "./MainPageFundingList";

const MainPageMid = ({users_data}) => {
    return(
        <div>
            {
            /* fundings && fundings.map(funding => {
                return (
                    <Link to={'reward_funding/' + funding.id}>
                        <FundingSummary funding={funding} key={funding.id} />
                    </Link>
                )
                
                })*/}

        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        fundings: state.firestore.ordered.fundings,
        auth: state.firebase.auth,
        authError: state.auth.authError,
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([//data sync
        { collection: 'fundings',
          where: this.state.props.users.artist1,
        } 
    ])
)(MainPageMid);
//db 수정해야함!
//artist1, 2, 3로 바꿔야함!