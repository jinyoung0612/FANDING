import React, { Component } from "react";
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
//import Dropdown from './Dropdown';
import { compose } from 'redux';
import FundingList from './RewardFundingList';

class NewOrdered extends Component {
    constructor({someProp}){
        super()
        this.state = {someProp}
    }
    // componentWillReceiveProps({someProp}) {
    //     this.setState({...this.state,someProp})
    // }
    
    render()
    {   
        console.log("New Ordered");
        const { fundings } = this.props;
        console.log(fundings);

        if(!isLoaded(fundings))
        {
         return (<div>Loading...</div>)
        }
        

        return(
            <div onClick={this.props.onClick}>
            <FundingList fundings={fundings} />
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
        { 
        collection: 'fundings',
          where: ['fundingType', '==', 'reward'],
          orderBy: ['createTime', 'desc'],
          
        } 
    ])
)(NewOrdered);