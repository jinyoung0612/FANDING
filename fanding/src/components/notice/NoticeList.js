import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import { withStyles,List, ListItem, ListItemText, 
  Avatar, ListItemSecondaryAction, Typography, Divider, Button } from '@material-ui/core';
import PhotoIcon from '@material-ui/icons/PermIdentity';
import {SupervisorAccount, MoneyOff ,LocalShipping, Build, DoneOutline} from '@material-ui/icons';

import {notice_read, notice_remove} from '../../store/actions/noticeAction';
import NoticeForm from './NoticeForm';
import FloatingButton from './FloatingButton';
import { compose } from 'redux';
import {firestoreConnect, isLoaded} from "react-redux-firebase";

//test
import NoticeForm2 from './NoticeForm2';
import { Col, Row } from 'reactstrap';

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
      marginRight: '10px',
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
          var qualification = '';
          const chongdae_email = funding[0].user_email;
          const company = funding[0].selectedCom;

          if(chongdae_email===auth.email){
            qualification = 'chongdae';
          }
            
          if(company!==''){
            console.log("company.email: ",company.value);
            if(company.value ===auth.email){
              qualification = 'company';
            }
          }
          return(
              <div className={classes.root} >
              <div>
              <Typography variant="title" gutterBottom align="center">
                <br/> 
                <h3><strong>진행 상황</strong></h3>
              </Typography>
              <Button className={classes.button}>업데이트</Button>
              <br/>
              <ListItem>
                <Col align="center">
                  <Avatar ><SupervisorAccount/></Avatar>
                <ListItemText secondary="펀딩 진행" />
                </Col>
                <p>ㆍㆍㆍ</p>
                <Col align="center">
                  <Avatar ><MoneyOff/></Avatar>
                <ListItemText secondary="입금 마감" />
                </Col>
                <p>ㆍㆍㆍ</p>
                <Col align="center">
                  <Avatar ><Build/></Avatar>
                <ListItemText secondary="상품 제작" />
                </Col>
                <p>ㆍㆍㆍ</p>
                <Col align="center">
                  <Avatar ><LocalShipping/></Avatar>
                <ListItemText secondary="상품 배송" />
                </Col>
                <p>ㆍㆍㆍ</p>
                <Col align="center">
                  <Avatar ><DoneOutline/></Avatar>
                <ListItemText secondary="펀딩 종료" />
                </Col>
              </ListItem>
              <br/>
              
              <Divider />
              <Divider />
              <Divider />
              </div>
              
              <div>
              <Typography variant="title" gutterBottom align="center">
                <br/>
                <h3><strong>공지사항</strong></h3>
                <br/>
              </Typography>
              <Divider light />
              <List className={classes.list}>
                {
                    notices.map((row, index) => (
                  row.funding_id === funding_id?
                    <ListItem button divider key={index} onClick={()=>this.handleSelectNotice(row.ntcno)}>
                      <Avatar>
                        <PhotoIcon/>
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
              <NoticeForm2 qualification={qualification} DialogOpen={DialogOpen} FundingID = {funding_id} handleDialogClose={this.handleDialogClose}/>
              </div>
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