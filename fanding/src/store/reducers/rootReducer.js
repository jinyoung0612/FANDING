import authReducer from "./authReducer";
import formReducer from "./formReducer";
import paymentReducer from "./paymentReducer";
import verifyReducer from "./chongdaeReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  payment: paymentReducer,
  verify: verifyReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
