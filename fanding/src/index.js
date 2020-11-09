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

/*
const store = createStore(rootReducer, 
  compose(
    applyMiddleware(thunk,logger)));
*/
const store = createStore(rootReducer, 
  compose(
    applyMiddleware(thunk.withExtraArgument( { getFirebase, getFirestore })),
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




