import authReducer from "./authReducer";
import formReducer from "./formReducer";
import paymentReducer from "./paymentReducer";
import chongdaeReducer from "./chongdaeReducer";
import adminReducer from "./adminReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  payment: paymentReducer,
  chongdae: chongdaeReducer,
  admin: adminReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
