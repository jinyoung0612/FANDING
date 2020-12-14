import React, { Component } from "react";
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';
import CollectFundingList from './CollectFundingList';

class PopOrdered extends Component {
    constructor({someProp}){
        super()
        this.state = {someProp}
    }
    render()
    {   
        console.log("Pop Ordered");
        const { fundings } = this.props;
        console.log(fundings);

        if(!isLoaded(fundings))
        {
         return (<div>Loading...</div>)
        }
        

        return(
            <div onClick={this.props.onClick}>
            <CollectFundingList fundings={fundings} />
            </div>
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
          orderBy: ['like', 'desc'],
        } 
    ])
)(PopOrdered);