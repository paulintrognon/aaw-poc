import _ from 'lodash';

export default reducer;

const initialState = {
  fetched: false,
  fetching: false,
  board: null,
  playerInformationBox: {
    show: false,
    playerId: null,
  },
};

function reducer(state = initialState, action) {
  const newState = _.cloneDeep(state);
  switch (action.type) {
    case 'PLAYER_FETCH_START':
      return {
        ...state,
        fetched: false,
        fetching: false,
      };

    case 'BOARD_FETCH_FULFILLED':
      return {
        ...state,
        fetched: true,
        fetching: false,
        board: action.payload,
      };

    case 'MOVE_OWN_PLAYER_FULFILLED':
      return {
        ...state,
        fetched: true,
        board: action.payload.board,
      };

    case 'TOGGLE_PLAYER_INFORMATION_BOX':
      const playerInformationBox = {
        show: state.playerInformationBox.playerId === action.payload.playerId ? !state.playerInformationBox.show : true,
        playerId: action.payload.playerId,
      };
      return {
        ...state,
        playerInformationBox: playerInformationBox,
        board: newState.board,
      };

    case 'SOLDIER_IS_ATTACKING':
      newState.board.forEach(row => {
        row.forEach(square => {
          if(square.player && square.player.id === action.payload) {
            square.player.animation = 'attacking';
          }
        });
      });
      return newState;

    case 'SOLDIER_IS_STILL':
      newState.board.forEach((row, i) => {
        row.forEach((square, j) => {
          if(square.player && square.player.id === action.payload) {
            square.player.animation = 'still';
          }
        });
      });
      return newState;

    case 'SOLDIER_TAKING_DAMAGES_START':
      newState.board.forEach((row, i) => {
        row.forEach((square, j) => {
          if(square.player && square.player.id === action.payload.playerId) {
            square.player.takingDamages = action.payload.damages;
          }
        });
      });
      return newState;

    case 'SOLDIER_TAKING_DAMAGES_STOP':
      newState.board.forEach((row, i) => {
        row.forEach((square, j) => {
          if(square.player && square.player.id === action.payload) {
            delete square.player.takingDamages;
          }
        });
      });
      return newState;

    default:
      return state;
  }
}
