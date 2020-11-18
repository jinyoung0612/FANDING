import React, { Component } from "react";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
//import Dropdown from './Dropdown';
import { compose } from 'redux';
import CollectFundingList from './CollectFundingList';

class DefaultOrdered extends Component {
    constructor({someProp}){
        super()
        this.state = {someProp}
    }
    // componentWillReceiveProps({someProp}) {
    //     this.setState({...this.state,someProp})
    // }
    
    render()
    {   console.log("default Ordered");
        const { fundings } = this.props;
        
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
        } 
    ])
)(DefaultOrdered);