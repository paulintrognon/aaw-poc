export default reducer;

const initialState = {
  player: {
    fetched: false,
    player: null,
  },
  board: {
    fetched: false,
    board: null,
    playerInformationBox: {
      show: false,
      playerId: null,
    },
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

    case 'TOGGLE_PLAYER_INFORMATION_BOX':
      const playerInformationBox = {
        show: state.board.playerInformationBox.playerId === action.payload.playerId ? !state.board.playerInformationBox.show : true,
        playerId: action.payload.playerId,
      };
      return {
        ...state,
        board: {
          ...state.board,
          playerInformationBox: playerInformationBox,
        }
      };

    default:
      return state;
  }
}
