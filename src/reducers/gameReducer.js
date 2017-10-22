export default reducer;

const initialState = {
  player: {
    fetched: false,
    player: null,
  },
  board: {
    fetched: false,
    board: null,
  },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'PLAYER_FETCH_FULFILLED':
      return {
        ...state,
        player: {
          ...state.player,
          fetched: true,
          player: action.payload.player,
        },
        board: {
          ...state.board,
          fetched: true,
          board: action.payload.board,
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
          ...state.board,
          fetched: true,
          board: action.payload.board,
        },
      };

    default:
      return state;
  }
}
