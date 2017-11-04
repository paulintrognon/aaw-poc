import { createNewPlayer, fetchPlayerFromToken, fetchPlayerBoard, moveOwnPlayer, attack } from '../services/api';
import socketService from '../services/socket';
import cookieService from '../services/cookies';

export function createNewPlayerAction(name) {
  return (dispatch) => {
    createNewPlayer(name)
      .then(res => {
        dispatch({ type: 'PLAYER_FETCH_FULFILLED', payload: res.data.player });
        dispatch({ type: 'BOARD_FETCH_FULFILLED', payload: res.data.board });
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
        dispatch({ type: 'PLAYER_FETCH_FULFILLED', payload: res.data.player });
        dispatch({ type: 'BOARD_FETCH_FULFILLED', payload: res.data.board });
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
        dispatch({ type: 'PLAYER_FETCH_FULFILLED', payload: res.data.player });
        dispatch({ type: 'BOARD_FETCH_FULFILLED', payload: res.data.board });
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

export function soldierIsAttacking(soldierId) {
  return (dispatch) => {
    dispatch({type: 'SOLDIER_IS_ATTACKING', payload: soldierId});
    setTimeout(() => {
      dispatch({type: 'SOLDIER_IS_STILL', payload: soldierId});
    }, 2000);
  };
}

export function attackAction(enemyId) {
  return (dispatch) => {
    attack(enemyId)
      .then(res => {
        setTimeout(() => {
          dispatch(damagesTaken(enemyId, res.data.damages))
        }, 1000);
      });
  };
}

export function damagesTaken(playerId, damages) {
  return (dispatch) => {
    dispatch({ type: 'SOLDIER_TAKING_DAMAGES_START', payload: { playerId, damages }});
    setTimeout(() => {
      dispatch({ type: 'SOLDIER_TAKING_DAMAGES_STOP', payload: playerId });
    }, 2000);
  }
}

export function ownPlayerDiedAction(playerId) {
  cookieService.clearCookie('aaw_token');
  alert('Sorry, you died :(');
  return { type: 'OWN_PLAYER_DIED' };
}
