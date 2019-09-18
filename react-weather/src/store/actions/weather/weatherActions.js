import axios from "axios";

import {
  requestStart,
  requestSuccess,
  requestSuccessRefresh,
  requestError
} from "./weatherActionCreators";

// da799194bd1b363aa217ec44aa947728 old
// ecb6cbb6944c2489dceecb71a86f6b38
export const API_KEY = "da799194bd1b363aa217ec44aa947728";

export const weatherFetch = listOfCities => dispatch => {
  dispatch(requestStart());
  axios
    .get(
      `http://api.openweathermap.org/data/2.5/group?id=${listOfCities}&units=metric&appid=${API_KEY}`
    )
    .then(response => {
      if (response.status < 200 && response.status > 300) {
        dispatch(requestError(response.error));
        throw new Error(response.status);
      }
      return response;
    })
    .then(response => dispatch(requestSuccess(response.data)));
};

export const weatherFetchRefresh = cityID => dispatch => {
  dispatch(requestStart());
  axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?id=${cityID}&units=metric&appid=${API_KEY}`
    )
    .then(response => {
      if (response.status < 200 && response.status > 300) {
        dispatch(requestError(response.error));
        throw new Error(response.status);
      }
      return response;
    })
    .then(response => dispatch(requestSuccessRefresh(response.data)));
};