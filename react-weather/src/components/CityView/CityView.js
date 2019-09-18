import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { history } from '../App';
import { weatherFetch } from '../../store/actions/weather/weatherActions';

import Container from 'react-bootstrap/Container';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

const CityView = ({ dataCities, weatherFetch }) => {
  const [city, setCity] = useState(null);

  useEffect(() => {
    var idCity = history.location.pathname.replace(/\/city\//g, '');

    if (dataCities) {
      dataCities.list.map(item => {
        if (item.id == idCity) {
          setCity(item);
        }
      });
    } else {
      weatherFetch(localStorage.getItem('listOfCities'));
    }
  });

  return (
    <Container className="my-3">
      {city ? (
        <>
          <Breadcrumb>
            <Link to="" className="breadcrumb-item">
              Home
            </Link>
            <Breadcrumb.Item active>{city.name}</Breadcrumb.Item>
          </Breadcrumb>
          <hr />
          <Card>
            <Card.Header>
              <h2>
                Weather in {city.name}, {city.sys.country}
              </h2>
            </Card.Header>
            <Card.Body>
              <Card.Title>
                <Card.Img
                  className="img"
                  variant="left"
                  src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                />
                {city.main.temp} °C, {city.weather[0].description}
              </Card.Title>
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <td>Wind</td>
                    <td>{city.wind.speed} m/s</td>
                  </tr>
                  <tr>
                    <td>Pressure</td>
                    <td>{city.main.pressure} hpa</td>
                  </tr>
                  <tr>
                    <td>Humidity</td>
                    <td>{city.main.humidity} %</td>
                  </tr>
                  <tr>
                    <td>Geo coords</td>
                    <td>
                      [{city.coord.lat}, {city.coord.lon}]
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </>
      ) : null}
    </Container>
  );
};

const mapStateToProps = state => ({
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
)(CityView);
