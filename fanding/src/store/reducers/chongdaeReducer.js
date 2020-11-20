const initState = {
    createError: null
  }
  const chongdaeReducer = (state = initState, action) => {
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
      /*
      case 'GET_TRANSACTION_LIST_ERROR':
        console.log('get transaction list error');
        return {
          ...state,
          createError: 'get transaction list failed'
        }
  
      case 'GET_TRANSACTION_LIST_SUCCESS':
        console.log('get transaction list success');
        return {
          ...state,
          createError: null
        }  
  */
      default:
        return state
    }
  };
  
  export default chongdaeReducer ;