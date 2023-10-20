export const githubReducer = (state, action) => {
  const {type} = action;
  switch (type) {
    case 'GET_USERS': 
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case 'SET_LOADING': 
      return {
        ...state,
        loading: true
      };
    case 'CLEAR_USERS': 
      return {
        ...state,
        users: []
      };
    default:
      return state;
  }
}