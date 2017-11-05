import { combineReducers } from 'redux';

import board from './boardReducer';
import player from './playerReducer';
import { routerReducer as router } from 'react-router-redux';

export default combineReducers({
  board,
  player,
  router,
});
