
// import firebase from 'firebase/app';
const initState = {
  createError: null,
  user_data:[]
}
const formReducer = (state = initState, action) => {
  switch(action.type){
    case 'CREATEFORM_ERROR':
      console.log('create form error');
      return {
        ...state,
        createError: 'Create form failed'
      };

    case 'CREATEFORM_SUCCESS':
      console.log('create form success');
      return {
        ...state,
        createError: null
      };
    case 'PARTICIPATE_ERROR':
      console.log("participate error");
      return{
        ...state
      }
    case 'PARTICIPATE_SUCCESS':
      console.log("participate success");
      return{
        ...state
      }
    case 'ProgressUpdate_SUCCESS':
      console.log("ProgressUpdate_SUCCESS");
      return{
        ...state
      }
    case "ProgressUpdate_ERROR":
      console.log("ProgressUpdate_ERROR");
      return{
        ...state
      }

    case "CLOSE_SUCCESS":
      console.log("CLOSE_SUCCESS");
      return{
        ...state
      }

    case "CLOSE_ERROR":
      console.log("CLOSE_ERROR");
      return{
        ...state
      }

    default:
      return state
  }
};

export default formReducer;