import React, { useState } from 'react';
import { connect } from 'react-redux';

import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';

import { weatherFetchRefresh } from '../../store/actions/weather/weatherActions';
import { deleteCity } from '../../store/actions/weather/weatherActionCreators';

const CitiesListItem = ({ city, weatherFetchRefresh, deleteCity }) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleClickButtonRefresh = e => {
    e.preventDefault();
    weatherFetchRefresh(city.id);
  };

  const handleClickButtonDelete = e => {
    e.preventDefault();
    setShowAlert(true);
  };

  const handleClickButtonDeleteYes = e => {
    e.preventDefault();
    let strResult;

    if (localStorage.getItem('listOfCities').includes(`,${city.id},`)) {
      strResult = localStorage.getItem('listOfCities').replace(`,${city.id}`, '');
    } else {
      strResult = localStorage.getItem('listOfCities').replace(new RegExp('(,|)' + city.id + '(,|)', 'g'), '');
    }

    localStorage.setItem('listOfCities', strResult);
    setShowAlert(false);
    deleteCity(city.id);
  };

  const handleClickButtonDeleteNo = e => {
    e.preventDefault();
    setShowAlert(false);
  };

  return (
    <ListGroup.Item action as="li">
      <Card>
        <Card.Img
          className="img"
          variant="left"
          src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
        />
        <Card.Body>
          <Card.Title>
            {city.name}, {city.sys.country}
          </Card.Title>
          <Card.Text>
            Average temperature -
            <Badge pill variant="primary">
              {city.main.temp}
            </Badge>
            . Temperature from {city.main.temp_min} to {city.main.temp_max} °С, wind - {city.wind.speed} m/s. clouds -{' '}
            {city.clouds.all} %
          </Card.Text>
          <ButtonToolbar className="justify-content-between" aria-label="Toolbar with Button groups">
            <Button variant="primary" onClick={handleClickButtonRefresh}>
              Refresh
            </Button>
            {showAlert ? (
              <div className="alert-overlay" onClick={e => e.preventDefault()}>
                <Alert variant="light" className="alert--fixed">
                  <Alert.Heading>Do you want to delete this city?</Alert.Heading>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <Button size="lg" onClick={handleClickButtonDeleteNo} variant="outline-primary">
                      No
                    </Button>
                    <Button size="lg" onClick={handleClickButtonDeleteYes} variant="outline-danger">
                      Yes
                    </Button>
                  </div>
                </Alert>
              </div>
            ) : (
              <Button variant="danger" onClick={handleClickButtonDelete}>
                Delete
              </Button>
            )}
          </ButtonToolbar>
        </Card.Body>
      </Card>
    </ListGroup.Item>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    weatherFetchRefresh: cityID => dispatch(weatherFetchRefresh(cityID)),
    deleteCity: cityID => dispatch(deleteCity(cityID))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CitiesListItem);
