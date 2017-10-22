import { createNewPlayer, fetchPlayerFromToken, fetchPlayerBoard, moveOwnPlayer } from '../services/api';
import socketService from '../services/socket';
import cookieService from '../services/cookies';

export function createNewPlayerAction(name) {
  return (dispatch) => {
    createNewPlayer(name)
      .then(res => {
        dispatch({ type: 'PLAYER_FETCH_FULFILLED', payload: res.data });
        cookieService.setCookie('aaw_token', res.data.token);
        socketService.open(res.data.player);
      }, err => {
        dispatch({type: 'PLAYER_FETCH_ERROR', payload: err.response.data});
      });
  };
}

export function loadExistingPlayer() {
  return (dispatch) => {
    fetchPlayerFromToken()
      .then(res => {
        dispatch({ type: 'PLAYER_FETCH_FULFILLED', payload: res.data });
        socketService.open(res.data.player);
      }, err => {
        if (err.response.data.name === 'player-not-found') {
          cookieService.clearCookie('aaw_token');
        } else {
          dispatch({type: 'PLAYER_FETCH_ERROR', payload: err.response.data});
        }
      });
  };
}

export function refreshPlayer() {
  return (dispatch) => {
    fetchPlayerFromToken()
      .then(res => {
        dispatch({ type: 'PLAYER_FETCH_FULFILLED', payload: res.data });
      }, err => {
        if (err.response.data.name === 'player-not-found') {
          cookieService.clearCookie('aaw_token');
        } else {
          dispatch({type: 'PLAYER_FETCH_ERROR', payload: err.response.data});
        }
      });
  };
}

export function fetchBoardAction() {
  return (dispatch) => {
    fetchPlayerBoard()
      .then(res => {
        dispatch({type: 'BOARD_FETCH_FULFILLED', payload: res.data.board});
      });
  };
}

export function moveOwnPlayerAction(coordinates) {
  return (dispatch) => {
    moveOwnPlayer(coordinates)
      .then(res => {
        dispatch({type: 'MOVE_OWN_PLAYER_FULFILLED', payload: res.data});
      });
  };
}
