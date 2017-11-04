export default reducer;

const initialState = {
  fetched: false,
  fetching: false,
  player: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'PLAYER_FETCH_START':
      return {
        ...state,
        fetched: false,
        fetching: true,
      };

    case 'PLAYER_FETCH_FULFILLED':
      return {
        ...state,
        fetched: true,
        fetching: false,
        player: action.payload,
      };

    case 'MOVE_OWN_PLAYER_FULFILLED':
      return {
        ...state,
        player: action.payload.player,
      };

    default:
      return state;
  }
}