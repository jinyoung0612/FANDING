import React from 'react';

import 'tui-grid/dist/tui-grid.css';
import Grid from '@toast-ui/react-grid';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const data = [
    {id: 1, name: 'Editor'},
    {id: 2, name: 'Grid'},
    {id: 3, name: 'Chart'}
  ];
  
  const columns = [
    {name: 'id', header: 'ID'},
    {name: 'name', header: 'Name'}
  ];
  
  const FundingStateDetail = () => (
    <Grid
      data={data}
      columns={columns}
      rowHeight={25}
      bodyHeight={100}
      heightResizable={true}
      rowHeaders={['rowNum']}
    />
  
  );


  const mapStateToProps = (state, ownProps) => {
    console.log(state);
    const id = ownProps.match.params.id;
    const fundings = state.firestore.data.fundings;
    const funding = fundings ? fundings[id] : null
    return {
      funding: funding,
      auth: state.firebase.auth
    }
  }



export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => [{
        collection: 'fundings', doc: props.match.params.id
    }])
)(FundingStateDetail);
