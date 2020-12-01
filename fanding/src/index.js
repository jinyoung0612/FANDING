import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// // Redux
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// // Firebase
import firebase from 'firebase/app';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import fbconfig from './config/fbConfig';
import { reduxFirestore, getFirestore } from 'redux-firestore';

//reactstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/web/assets/mobirise-icons2/mobirise2.css";
import "./assets/tether/tether.min.css";
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import "./assets/dropdown/css/style.css";
import "./assets/socicon/css/styles.css";
import "./assets/theme/css/style.css";
import "./assets/mobirise/css/mbr-additional.css";
// import './assets2/css/bootstrap.min.css'
// import './assets2/css/light-bootstrap-dashboard.css'
// import './assets2/css/dashboard.css'

    /*
const store = createStore(rootReducer, 
  compose(
    applyMiddleware(thunk,logger)));
*/
const store = createStore(rootReducer, 
  compose(
    applyMiddleware(thunk.withExtraArgument( { getFirebase, getFirestore }),logger),
    reduxFirestore(fbconfig),
    ) //enhancer
);


//export const store = createStore(rootReducer, compose(applyMiddleware(thunk,logger)));



const rrfProps = {
  firebase,
  config: fbconfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root'),
);
serviceWorker.unregister();




