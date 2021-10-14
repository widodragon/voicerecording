const initialState = {
  numClick: 0,
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CLICK_TO_GLOBAL':
      return {
        ...state,
        isLoading: true,
        numClick: action.payload,
      };

    default:
      return state;
  }
};
export default rootReducer;
