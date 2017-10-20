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

    case 'BOARD_FETCH_FULFILLED':
      return {
        ...state,
        board: {
          ...state.board,
          fetched: true,
          board: action.payload,
        },
      };

    case 'MOVE_OWN_PLAYER_FULFILLED':
      return {
        ...state,
        player: {
          ...state.player,
          player: action.payload.player,
        },
        board: {
          ...state.player,
          fetched: true,
          board: action.payload.board,
        },
      };

    default:
      return state;
  }
}
