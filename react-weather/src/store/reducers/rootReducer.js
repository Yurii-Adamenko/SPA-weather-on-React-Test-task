import { combineReducers } from 'redux';

import { weatherReducer } from './weather/weatherReducer';

export const rootReducer = combineReducers({
  weatherReducer
  // More reducers can be added
});