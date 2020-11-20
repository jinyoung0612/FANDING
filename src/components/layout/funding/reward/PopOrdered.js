import React, { Component } from "react";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
//import Dropdown from './Dropdown';
import { compose } from 'redux';
import FundingList from './RewardFundingList';

class PopOrdered extends Component {

    render()
    {
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
          where: ['fundingType', '==', 'reward'],
          orderedBy: ['fundingRate', 'desc'],
        } 
    ])
)(PopOrdered);