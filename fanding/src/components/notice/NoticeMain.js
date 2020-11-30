import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';

import { withStyles } from '@material-ui/core/styles';

import MySnackbar from './MySnackbar';
import NoticeList from './NoticeList';

import {firebase_notice_list} from '../../store/actions/noticeAction';

const styles = theme => ({
    root: { 
      flexGrow: 1,
      zIndex: 1,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      width: '100%',
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
      height: '92vh',    
    },
});

function PrivateRoute ({component: Component, uid, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => uid !==null
          ? <Component {...props} />
          : <Redirect to={{pathname: '/signIn', state: {from: props.location}}} />}
      />
    )
}

function PublicRoute ({component: Component, uid, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => uid === null
          ? <Component {...props} />
          : <Redirect to='/notice' />}
      />
    )
}

class NoticeMain extends Component {

    componentDidMount () {
        this.props.firebase_notice_list();           
    }
    
    render() {
      const { classes, uid } = this.props;
      return (
          <Router>
            <div className={classes.root}>
              <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                  <PrivateRoute uid={uid} exact path="/notice" component={NoticeList}/>
                  <PrivateRoute uid={uid} path="/notice/list" component={NoticeList}/>

                  <PublicRoute uid={uid} component={NoMatch}/>
                </Switch>
              </main>
              <MySnackbar />
            </div>
          </Router>
      );
    }
  }
  
  const NoMatch = ({ location }) => (
    <div>
      <h3>
        No match url for <code>{location.pathname}</code>
      </h3>
    </div>
  );
  
  NoticeMain.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  let mapStateToProps = (state) => {
      return {
        uid: state.firebase.auth.uid,
        notices: state.notice.notices,
        selectedNotice: state.notice.selectedNotice
      };
  }
  
  const mapDispatchToProps = dispatch => ({
    firebase_notice_list: () =>  dispatch(firebase_notice_list()),
  })
  
  export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles)(NoticeMain));
  