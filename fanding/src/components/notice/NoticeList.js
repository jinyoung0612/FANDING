import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import PhotoIcon from '@material-ui/icons/PermIdentity';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';

import {notice_read, notice_remove} from '../../store/actions/noticeAction';
import NoticeForm from './NoticeForm';
import FloatingButton from './FloatingButton';
import { compose } from 'redux';
import {firestoreConnect, isLoaded} from "react-redux-firebase";

const styles = theme => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    list: {
      overflow: 'auto',
      maxHeight: '70vh',
    },
    ListItemSecondaryAction: {
      maxWidth: '20%'
    },
    button: {
      right: '10px'
    },
    Image: {
      width: '40px',
      height: '40px',
    },
});


class NoticeList extends Component {

    state = {
        DialogOpen: false,
    };

    handleDialogOpen = () => {
        this.setState({DialogOpen: true});
        this.props.dispatch(notice_read(-1));
    };
    handleDialogClose = () => {
        this.setState({DialogOpen: false});
    };

    handleSelectNotice = (ntcno) => {
        this.setState({DialogOpen:true});
        this.props.dispatch(notice_read(ntcno));
    }

    render(){
        const location = window.location.href.split('/');
        const funding_id = location[5];
        console.log("funding_id: ",funding_id);

        const {classes, notices, selectedNotice, auth, funding} = this.props;
        console.log("in noticelist notices: ",notices);
        
        console.log("in noticelist funding: ",funding);
        
        const {DialogOpen} = this.state;

        if(!isLoaded(auth) || !isLoaded(funding)) {
          return (
              <div>
                  Loading...
              </div>
          )
        }
        else{
          console.log("in noticelist funding[0].selectedCom: ",funding[0].selectedCom);
          console.log("in noticelist funding[0].user_email: ",funding[0].user_email);
          let qualification = false;
          const chongdae_email = funding[0].user_email;
          const company = funding[0].selectedCom;

          if(company!==''){
            console.log("company.email: ",company.value);
            if(chongdae_email===auth.email || company.value ===auth.email){
              qualification = true;
            }
          }
          return(
              <div className={classes.root}>
              <Typography variant="title" gutterBottom align="center">
                <br/>
                <h3>공지사항</h3>
              </Typography>
              <List className={classes.list}>
                {
                    notices.map((row, index) => (
                  row.funding_id === funding_id?
                    <ListItem button key={index} onClick={()=>this.handleSelectNotice(row.ntcno)}>
                      <Avatar>
                      { 
                        <PhotoIcon/>
                      }
                      </Avatar>
                      <ListItemText primary={row.ntctitle} secondary={row.ntcwriter}/>
                      
                      <ListItemSecondaryAction className={classes.ListItemSecondaryAction}>
                      <ListItemText primary={dateFormat(row.ntcdate, "yyyy-mm-dd")}/>
                      </ListItemSecondaryAction>
                    </ListItem>
                  :
                  <div>
                  
                  </div>
                  ))
                }
              </List>
              
              <FloatingButton qualification={qualification} handleClick={this.handleDialogOpen}/>
              <NoticeForm DialogOpen={DialogOpen} FundingID = {funding_id} handleDialogClose={this.handleDialogClose}/>
            </div> 
          )
        } 
    }
}

NoticeList.propTypes = {
    classes: PropTypes.object.isRequired,
};
  

let mapStateToProps = (state) => {
    console.log(state);
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError,
        notices: state.notice.notices,
        selectedNotice: state.notice.selectedNotice,
        funding: state.firestore.ordered.fundings
    };
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    const location = window.location.href.split('/');
    const funding_id = location[5];
    console.log("funding_id: ",funding_id);
    
    return[
      {
        collection: 'fundings',
        doc: funding_id,
      }
    ]
  })
)(withStyles(styles)(NoticeList));

//export default connect(mapStateToPops)(withStyles(styles)(NoticeList));