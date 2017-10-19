import { combineReducers } from 'redux';

import game from './gameReducer';
import { routerReducer as router } from 'react-router-redux';

export default combineReducers({
  game,
  router,
});
