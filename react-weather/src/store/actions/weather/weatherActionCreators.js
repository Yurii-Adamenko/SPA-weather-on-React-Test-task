import * as types from '../actionTypes';

export const requestStart = () => {
  return {
    type: types.WEATHER_REQUEST_START
  };
};

export const requestSuccess = data => {
  return {
    type: types.WEATHER_REQUEST_SUCCESS,
    payload: data
  };
};

export const requestSuccessRefresh = data => {
  return {
    type: types.WEATHER_REQUEST_REFRESH,
    payload: data
  };
};

export const requestError = error => {
  return {
    type: types.WEATHER_REQUEST_ERROR,
    payload: error
  };
};

export const deleteCity = data => {
  return {
    type: types.DELETE_CITY,
    payload: data
  };
};