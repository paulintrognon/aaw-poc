import { fetchScoreBoard } from '../services/api';

export function fetchScoreBoardAction() {
  return (dispatch) => {
    dispatch({ type: 'SCORE_BOARD_FETCHING' });
    fetchScoreBoard()
      .then(res => {
        dispatch(updateScoreBoardAction(res.data.scoreBoard));
      });
  };
}

export function updateScoreBoardAction(scoreBoard) {
  return { type: 'SCORE_BOARD_FETCHED', payload: scoreBoard };
}
