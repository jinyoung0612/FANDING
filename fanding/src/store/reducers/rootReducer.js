import authReducer from "./authReducer";
import formReducer from "./formReducer";
import paymentReducer from "./paymentReducer";
import verifyReducer from "./chongdaeReducer";
import adminReducer from "./adminReducer";
import noticeReducer from "../actions/noticeAction"
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  payment: paymentReducer,
  verify: verifyReducer,
  admin: adminReducer,
  notice: noticeReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
