const initState = {
    createError: null
  }
  const noticeReducer = (state = initState, action) => {
    switch(action.type){
      case 'Error_notice_list':
        console.log('notice list error');
        return {
          ...state,
          createError: 'Notice list failed'
        }
  
      case 'Success_notice_list':
        console.log('notice list success');
        return {
          ...state,
          createError: null
        }

        case 'Error_notice_remove':
            console.log('notice remove error');
            return {
              ...state,
              createError: 'Notice list failed'
            }
      
          case 'Success_notice_remove':
            console.log('notice remove success');
            return {
              ...state,
              createError: null
            }
  
      default:
        return state
    }
  };
  
  export default noticeReducer;