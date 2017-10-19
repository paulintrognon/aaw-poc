export default reducer;

const initialState = {
  player: {
    created: false,
    player: null,
  },
  board: {
    fetched: false,
    player: null,
  },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'NEW_PLAYER_FETCH_FULFILLED':
      return {
        ...state,
        player: {
          ...state.player,
          created: true,
          player: action.payload,
        },
      };

    default:
      return state;
  }
}