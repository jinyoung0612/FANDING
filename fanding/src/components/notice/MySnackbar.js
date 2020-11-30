import React from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';

import SnackbarContent from "./MySnackbarContent";
import {show_snackbar} from '../../store/actions/noticeAction';

class MySnackbar extends React.Component {
  handleClose = () => {
    this.props.dispatch(show_snackbar({ message: '', snackbarOpen: false }) );
  };
          
  render() {
    const { snackbarOpen, message } = this.props;

    return (
          <Snackbar anchorOrigin={{vertical: 'top',horizontal: 'center',}}
              open={snackbarOpen}
              autoHideDuration={2000}
              onClose={this.handleClose}>
                  <SnackbarContent
                      onClose={this.handleClose}
                      variant="success"
                      message={message}
                  />
          </Snackbar>        
    );
  }
}

let mapStateToProps = (state) => {
    return {
        snackbarOpen: state.snackbarOpen,
        message: state.message
    };
}

export default connect(mapStateToProps)(MySnackbar);