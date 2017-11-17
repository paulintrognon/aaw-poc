export default reducer;

const initialState = {
  fetching: false,
  list: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SCORE_BOARD_FETCHING':
      return {
        ...state,
        fetching: true,
      };

    case 'SCORE_BOARD_FETCHED':
      return {
        ...state,
        fetching: false,
        list: action.payload,
      };

    default:
      return state;
  }
}
