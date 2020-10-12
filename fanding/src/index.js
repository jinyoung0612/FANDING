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

// // Firebase
import firebase from 'firebase/app';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import fbconfig from './config/fbConfig';

//reactstrap
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

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




