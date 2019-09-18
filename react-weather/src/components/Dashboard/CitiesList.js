import React from "react";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

import CitiesListItem from "./CitiesListItem";

const CitiesList = ({ cities }) => {
  return (
    <ListGroup as="ul">
      {cities
        ? cities.list.map(city => (
            <Link key={city.id} to={{pathname: `/city/${city.id}`}}>
              <CitiesListItem city={city} />
            </Link>
          ))
        : null}
    </ListGroup>
  );
};

export default CitiesList;
