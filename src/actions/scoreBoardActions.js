import { fetchScoreBoard } from '../services/api';

export function fetchScoreBoardAction() {
  return (dispatch) => {
    dispatch({ type: 'SCORE_BOARD_FETCHING' });
    fetchScoreBoard()
      .then(res => {
        dispatch({ type: 'SCORE_BOARD_FETCHED', payload: res.data.scoreBoard });
      });
  };
}
