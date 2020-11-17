const initState = {
    createError: null
  }
  const adminReducer = (state = initState, action) => {
    switch(action.type){
      case 'ADDADMIN_ERROR':
        console.log('add admin error');
        return {
          ...state,
          createError: 'Add Admin failed'
        }
  
      case 'ADDADMIN_SUCCESS':
        console.log('add admin success');
        return {
          ...state,
          createError: null
        }
  
      default:
        return state
    }
  };
  
  export default adminReducer;