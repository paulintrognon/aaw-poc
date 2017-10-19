import { createNewPlayer, fetchPlayerBoard } from '../services/api';

export function createNewPlayerAction(name) {
  return (dispatch) => {
    createNewPlayer(name)
      .then(res => {
        dispatch({type: 'NEW_PLAYER_FETCH_FULFILLED', payload: res.data.player});
        document.cookie = `aaw_token=${res.data.token}`;
        dispatch(fetchBoardAction())
      }, err => {
        dispatch({type: 'NEW_PLAYER_FETCH_ERROR', payload: err.response.data});
      });
  }
}

export function fetchBoardAction() {
  return (dispatch) => {
    fetchPlayerBoard()
      .then(res => {
        dispatch({type: 'BOARD_FETCH_FULFILLED', payload: res.data.board});
      });
  }
}
