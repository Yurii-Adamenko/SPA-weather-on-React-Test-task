import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import CitiesList from './CitiesList';
import { weatherFetch } from '../../store/actions/weather/weatherActions';

import cityListJson from '../../configs/city.list.json';

const Dashboard = ({ initialCities, weatherFetch, dataCities }) => {
  const [listCitiesID, setListCitiesID] = useState('');
  const [listCitiesResultSearchInput, setListCitiesResultSearchInput] = useState([]);
  const [valueInputSearch, setValueInputSearch] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('listOfCities')) {
      setListCitiesID(initialCities);
      localStorage.setItem('listOfCities', listCitiesID);
    } else {
      if (localStorage.getItem('listOfCities') !== listCitiesID && listCitiesID) {
        localStorage.setItem('listOfCities', listCitiesID);
      }
    }

    weatherFetch(localStorage.getItem('listOfCities'));
  }, [listCitiesID]);

  const handleCityChange = e => {
    let resultCities = cityListJson.filter(obj => obj.name === e.target.value);
    setValueInputSearch(e.target.value);
    setListCitiesResultSearchInput(resultCities);
  };

  const handleClickCity = cityId => {
    let str = localStorage.getItem('listOfCities').replace(`${cityId},`, '');
    setListCitiesID(cityId + ',' + str);
  };

  return (
    <Container className="my-3">
      <Dropdown className="mb-3">
        <Dropdown.Toggle as={InputGroup} className="dropdown-toggle--no-after">
          <label htmlFor="searchCityInput">Search your city:</label>
          <FormControl
            className="w-100 rounded"
            id="searchCityInput"
            aria-describedby="searchCityInput"
            placeholder="Write your city..."
            onChange={handleCityChange}
            value={valueInputSearch}
          />
        </Dropdown.Toggle>
        <Dropdown.Menu className="w-100 dropdown-menu--cities">
          {listCitiesResultSearchInput.length > 0 ? (
            listCitiesResultSearchInput.map(city => (
              <Dropdown.Item key={city.id} eventKey={city.id} onClick={() => handleClickCity(city.id)}>
                {city.name}, {city.country} / Geo coords - [{city.coord.lat}, {city.coord.lon}]
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item disabled>Not results</Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
      <CitiesList cities={dataCities}></CitiesList>
    </Container>
  );
};

const mapStateToProps = state => ({
  loaderStatus: state.weatherReducer.isLoading,
  initialCities: state.weatherReducer.initialCities,
  dataCities: state.weatherReducer.dataCities
});

const mapDispatchToProps = dispatch => {
  return {
    weatherFetch: listOfCities => dispatch(weatherFetch(listOfCities))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
