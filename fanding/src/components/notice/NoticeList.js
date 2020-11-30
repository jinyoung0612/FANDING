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
        const {classes, notices} = this.props;
        console.log("in noticelist notices: ",notices);
        const {DialogOpen} = this.state;

        return(
            <div className={classes.root}>
            <Typography variant="title" gutterBottom align="center">
              <br/>
              <h3>공지사항</h3>
            </Typography>
            <List className={classes.list}>
              {
                  notices.map((row, index) => (
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
                ))
              }
            </List>
            <FloatingButton handleClick={this.handleDialogOpen}/>
            <NoticeForm DialogOpen={DialogOpen} handleDialogClose={this.handleDialogClose}/>
          </div> 
        )
    }
}

NoticeList.propTypes = {
    classes: PropTypes.object.isRequired,
};
  

let mapStateToProps = (state) => {
    console.log(state);
    return {
        notices: state.notice.notices,
        selectedNotice: state.notice.selectedNotice
    };
}

export default connect(mapStateToProps)(withStyles(styles)(NoticeList));