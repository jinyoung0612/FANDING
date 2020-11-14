const initState = {
    createError: null
  }
  const verifyReducer = (state = initState, action) => {
    switch(action.type){
      case 'CREATECHONGDAE_ERROR':
        console.log('create chongdae error');
        return {
          ...state,
          createError: 'Create chongdae failed'
        }
  
      case 'CREATECHONGDAE_SUCCESS':
        console.log('create chongdae success');
        return {
          ...state,
          createError: null
        }
  
      default:
        return state
    }
  };
  
  export default verifyReducer;