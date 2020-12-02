import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import { withStyles,List, ListItem, ListItemText, 
  Avatar, ListItemSecondaryAction, Typography, Divider, Button } from '@material-ui/core';
import PhotoIcon from '@material-ui/icons/PermIdentity';
import {SupervisorAccount, MoneyOff ,LocalShipping, Build, DoneOutline} from '@material-ui/icons';

import {notice_read, firebase_progress_save} from '../../store/actions/noticeAction';
import FloatingButton from './FloatingButton';
import { compose } from 'redux';
import {firestoreConnect, isLoaded} from "react-redux-firebase";

//test
import NoticeForm from './NoticeForm';
import { Col } from 'reactstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const styles = theme => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      marginBottom: theme.spacing(2)
    },
    list: {
      overflow: 'auto',
      maxHeight: 500,
    },
    ListItemSecondaryAction: {
      maxWidth: '20%'
    },
    button: {
      margin: theme.spacing(3),
      width: '20%',
      float: "right"
    },
    large: {
      width: theme.spacing(8),
      height: theme.spacing(8),
      color: '#ffffff',
      backgroundColor: '#6496ff'
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

    handleSelectProgress = (e) => {
      const location = window.location.href.split('/');
      const funding_id = location[5];
      let data = {
        funding_id: funding_id,
        state: e.value,
        existence: false
      }
    
      if(this.props.progress){
        this.props.progress.map((row, index) => (
          row.funding_id === funding_id
          ?
            data.existence = true
          :
            data.existence = false
        ));
      }
      
      this.props.dispatch(firebase_progress_save(data));
    }
    options = [
      {value:'펀딩진행', label:'펀딩진행'},
      {value:'입금마감', label:'입금마감'},
      {value:'상품제작', label:'상품제작'},
      {value:'상품배송', label:'상품배송'},
      {value:'펀딩종료', label:'펀딩종료'}
    ];
    animatedComponents = makeAnimated();

    render(){
        const {classes, notices, auth, funding, progressDB} = this.props;
        console.log("in noticelist notices: ",notices);
        
        console.log("in noticelist funding: ",funding);
        console.log("in noticelist progress: ",progressDB);
        
        const {DialogOpen} = this.state;

        if(!isLoaded(auth) || !isLoaded(funding) || !isLoaded(progressDB)) {
          return (
              <div>
                  Loading...
              </div>
          )
        }
        else{
          console.log("in noticelist funding[0].id: ",funding[0].id);
          console.log("in noticelist funding[0].selectedCom: ",funding[0].selectedCom);
          console.log("in noticelist funding[0].user_email: ",funding[0].user_email);
          var qualification = '';
          const funding_id = funding[0].id;
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

          var step = '';
          if(progressDB.length > 0){
            console.log("in noticelist progress[0].state: ",progressDB[0].state);
            step = progressDB[0].state;
          }else{
            step = '펀딩진행';
          }

          return(
              <div>
                <Typography variant="h6" className={classes.title}>{funding[0].fundingTitle}</Typography>
              <div className={classes.root} >
              <div>
              <Typography variant="title" gutterBottom align="center">
                <br/> 
                <h3><strong>진행 상황</strong></h3>
              </Typography>
              {qualification === 'chongdae' || qualification === 'company'
              ?
              <Select
                    className={classes.button}
                    id="progressSelect" components={this.animatedComponents} 
                    options={this.options} 
                    menuPortalTarget={document.body} 
                    style={{menuPortal:base=>({...base,zIndex:9999})}} 
                    onChange={this.handleSelectProgress}/>
              :
              <div></div>
              }
              <br/>
              {step === '입금마감' 
              ?
              <ListItem>
                <Col align="center"><Avatar ><SupervisorAccount/></Avatar><ListItemText secondary="펀딩 진행" /></Col>
                <p>ㆍㆍㆍ</p>
                <Col align="center"><Avatar className={classes.large}><MoneyOff/></Avatar><ListItemText secondary="입금 마감" /></Col>
                <p>ㆍㆍㆍ</p>
                <Col align="center"><Avatar ><Build/></Avatar><ListItemText secondary="상품 제작" /></Col>
                <p>ㆍㆍㆍ</p>
                <Col align="center"><Avatar ><LocalShipping/></Avatar><ListItemText secondary="상품 배송" /></Col>
                <p>ㆍㆍㆍ</p>
                <Col align="center"><Avatar ><DoneOutline/></Avatar><ListItemText secondary="펀딩 종료" /></Col>
              </ListItem>
              :step === '상품제작'
              ?
              <ListItem>
                <Col align="center"><Avatar ><SupervisorAccount/></Avatar><ListItemText secondary="펀딩 진행" /></Col>
                <p>ㆍㆍㆍ</p>
                <Col align="center"><Avatar ><MoneyOff/></Avatar><ListItemText secondary="입금 마감" /></Col>
                <p>ㆍㆍㆍ</p>
                <Col align="center"><Avatar className={classes.large}><Build/></Avatar><ListItemText secondary="상품 제작" /></Col>
                <p>ㆍㆍㆍ</p>
                <Col align="center"><Avatar ><LocalShipping/></Avatar><ListItemText secondary="상품 배송" /></Col>
                <p>ㆍㆍㆍ</p>
                <Col align="center"><Avatar ><DoneOutline/></Avatar><ListItemText secondary="펀딩 종료" /></Col>
              </ListItem>
              :step === '상품배송'
              ?
              <ListItem>
                <Col align="center"><Avatar ><SupervisorAccount/></Avatar><ListItemText secondary="펀딩 진행" /></Col>
                <p>ㆍㆍㆍ</p>
                <Col align="center"><Avatar ><MoneyOff/></Avatar><ListItemText secondary="입금 마감" /></Col>
                <p>ㆍㆍㆍ</p>
                <Col align="center"><Avatar ><Build/></Avatar><ListItemText secondary="상품 제작" /></Col>
                <p>ㆍㆍㆍ</p>
                <Col align="center"><Avatar className={classes.large}><LocalShipping/></Avatar><ListItemText secondary="상품 배송" /></Col>
                <p>ㆍㆍㆍ</p>
                <Col align="center"><Avatar ><DoneOutline/></Avatar><ListItemText secondary="펀딩 종료" /></Col>
              </ListItem>
              :step === '펀딩종료'
              ?
              <ListItem>
                <Col align="center"><Avatar ><SupervisorAccount/></Avatar><ListItemText secondary="펀딩 진행" /></Col>
                <p>ㆍㆍㆍ</p>
                <Col align="center"><Avatar ><MoneyOff/></Avatar><ListItemText secondary="입금 마감" /></Col>
                <p>ㆍㆍㆍ</p>
                <Col align="center"><Avatar ><Build/></Avatar><ListItemText secondary="상품 제작" /></Col>
                <p>ㆍㆍㆍ</p>
                <Col align="center"><Avatar ><LocalShipping/></Avatar><ListItemText secondary="상품 배송" /></Col>
                <p>ㆍㆍㆍ</p>
                <Col align="center"><Avatar className={classes.large}><DoneOutline/></Avatar><ListItemText secondary="펀딩 종료" /></Col>
              </ListItem>
              :
              <ListItem>
                <Col align="center"><Avatar className={classes.large}><SupervisorAccount/></Avatar><ListItemText secondary="펀딩 진행" /></Col>
                <p>ㆍㆍㆍ</p>
                <Col align="center"><Avatar ><MoneyOff/></Avatar><ListItemText secondary="입금 마감" /></Col>
                <p>ㆍㆍㆍ</p>
                <Col align="center"><Avatar ><Build/></Avatar><ListItemText secondary="상품 제작" /></Col>
                <p>ㆍㆍㆍ</p>
                <Col align="center"><Avatar ><LocalShipping/></Avatar><ListItemText secondary="상품 배송" /></Col>
                <p>ㆍㆍㆍ</p>
                <Col align="center"><Avatar ><DoneOutline/></Avatar><ListItemText secondary="펀딩 종료" /></Col>
              </ListItem>
        }
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
                      <ListItem></ListItem>
                  </div>
                  ))
                }
              </List>
              
              <FloatingButton qualification={qualification} handleClick={this.handleDialogOpen}/>
              <NoticeForm qualification={qualification} DialogOpen={DialogOpen} FundingID = {funding_id} handleDialogClose={this.handleDialogClose}/>
              </div>
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
        progress: state.notice.progress,
        funding: state.firestore.ordered.fundings,
        progressDB : state.firestore.ordered.progress
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
      },
      {
        collection: 'progress',
        doc: funding_id,
      }
    ]
  })
)(withStyles(styles)(NoticeList));

