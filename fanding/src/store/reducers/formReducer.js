
// import firebase from 'firebase/app';
const initState = {
  createError: null
}
const formReducer = (state = initState, action) => {
  switch(action.type){
    case 'CREATEFORM_ERROR':
      console.log('create form error');
      return {
        ...state,
        createError: 'Create form failed'
      }

    case 'CREATEFORM_SUCCESS':
      console.log('create form success');
      return {
        ...state,
        createError: null
      }

    default:
      return state
  }
};

export default formReducer;