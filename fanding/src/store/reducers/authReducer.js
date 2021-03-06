// import firebase from 'firebase/app';
const initState = {
  authError: null,
  user_data:[],
  user_type:[],
  recruits:[],
  participants:[]

};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      console.log("login error");
      return {
        ...state,
        authError: "Login failed",
      };

    case "LOGIN_SUCCESS":
      console.log("login success");
      return {
        ...state,
        authError: null,
      };

    case "SIGNOUT_SUCCESS":
      console.log("signout success");
      return state;

    case "SIGNUP_SUCCESS":
      console.log("signup success");
      return {
        ...state,
        authError: null,
      };

    case "SIGNUP_ERROR":
      console.log("signup error");
      return {
        ...state,
        authError: action.err.message,
      };
    case "NOT_EMAIL_SPENT":
      console.log("not email spent");
      return {
        ...state,
        authError: action.err.message,
      };
    case "EMAIL_SPENT_SUCCESS":
      console.log("email spent success");
      return {
        ...state,
        authError: null,
      };
    case "setMyFunding":
      console.log("funding reducer");
      return{
        ...state,
        user_data:action.payload.user_data,
        doc_id:action.payload.doc_id
      };

    case "LoadParticipants":
      return{
        ...state,
        participants:action.payload.participants
      };

    case "loadMainPage":
      return{
        ...state,
        user_data:{...action.payload.user_data}
      };
    case "CheckUserType":
      return{
        ...state,
        user_type:{...action.payload.user_type}
      };
    case "loadMyRecruits":
      return{
        ...state,
        recruits:{...action.payload.recruits}
      }
    case "setMyAppliedFunding":
      console.log("setMyAppliedFunding reducer");
      return{
        ...state,
        user_data:action.payload.user_data,
        doc_id:action.payload.doc_id
      };  

    case "CHANGE_SUCCESS":
      return{
        ...state
      }

    case "CHANGE_ERROR":
      return{
        ...state
      }


    default:
      return state;
  }
};

export default authReducer;
