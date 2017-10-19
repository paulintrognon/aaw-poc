import { createNewPlayer } from '../services/api';

export function createNewPlayerAction(name) {
  return (dispatch) => {
    createNewPlayer(name)
      .then(res => {
        dispatch({type: 'NEW_PLAYER_FETCH_FULFILLED', payload: res.data.player});
      }, err => {
        dispatch({type: 'NEW_PLAYER_FETCH_ERROR', payload: err});
      });
  }
}
