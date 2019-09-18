import update from "immutability-helper";

import * as types from "../../actions/actionTypes";

const initialState = {
  isLoading: false,
  initialCities: [2643743, 706483, 2968815],
  dataCities: null,
  errorMessage: null
};

export const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.WEATHER_REQUEST_START:
      return {
        ...state,
        isLoading: true
      };
    case types.WEATHER_REQUEST_SUCCESS:
      return {
        ...state,
        dataCities: action.payload,
        isLoading: false
      };
    case types.WEATHER_REQUEST_REFRESH:
      let indexCity;
      state.dataCities.list.map((city, index) => {
        if (city.id === action.payload.id) {
          indexCity = index;
        }
      });
      return {
        ...state,
        dataCities: update(state.dataCities, {
          list: { [indexCity]: { $set: action.payload } }
        }),
        isLoading: false
      };
    case types.WEATHER_REQUEST_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
        isLoading: false
      };
    case types.DELETE_CITY:
        let indexCityDelete;
        state.dataCities.list.map((city, index) => {
          if (city.id === action.payload) {
            indexCityDelete = index;
          }
        });
      return {
        ...state,
        dataCities: update(state.dataCities, {
          list: { $splice: [[indexCityDelete, 1]] }
        })
      };
    default:
      return state;
  }
};