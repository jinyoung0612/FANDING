import React, { Component } from "react";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import FundingList from './CollectFundingList';

class CollectFunding extends Component {
    render(){
        const { fundings } = this.props;

        return(
            <FundingList fundings={fundings} />
        )
    }
}
const mapStateToProps = (state) => {
    console.log(state);
    return {
        fundings: state.firestore.ordered.fundings
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([//data sync
        { collection: 'fundings',
        where: ['fundingType', '==', 'collect'],
        } 
    ])
)(CollectFunding);