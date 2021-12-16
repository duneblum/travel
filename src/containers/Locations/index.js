import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import hotels from "../../../dist/hotels.json";
import restaurants from "../../../dist/restaurants.json";
import supermarkets from "../../../dist/supermarkets.json";
import { useHistory } from "react-router-dom";
import Geocode from "react-geocode";

const getCoordinatesPromise = async (address) => {
  Geocode.setApiKey("AIzaSyC5gRVM1Nrp6P2Ur3W7q3G9LGEkEamJMWY");

  return await Geocode.fromAddress(address).then(
    (response) => {
      return Promise.resolve(response.results[0].geometry.location);
    },
    (error) => {
      console.error(error);
    }
  );
};

const discernEntityType = (entity) => {
  if (entity.orders) {
    return "restaurant";
  } else if (entity.vibe) {
    return "hotel";
  }
  return "supermarket";
};

const getIconUrl = (entity) => {
  const entityType = discernEntityType(entity);
  if (entityType === "restaurant") {
    return "http://maps.google.com/mapfiles/ms/micons/snack_bar.png";
  } else if (entityType === "hotel") {
    return "http://maps.google.com/mapfiles/ms/micons/lodging.png";
  }
  return "http://maps.google.com/mapfiles/ms/micons/convienancestore.png";
};

const Locations = () => {
  const history = useHistory();
  const [marker, setMarker] = useState(null);
  const [entityToDisplayInfo, setEntityToDisplayInfo] = useState(null);

  // workaround for getting the link to work
  const onOpen = (entity) => {
    const content = (
      <>
        <div
          className="link"
          onClick={() => {
            console.log("abc");
            history.push(`/${discernEntityType(entity)}/${entity.id}`);
          }}
        >
          {entity.name}
        </div>
        <div>{entity.city}</div>
      </>
    );
    ReactDOM.render(
      React.Children.only(content),
      document.getElementById(entity.id)
    );
  };

  const listWithoutDuplicates = () => {
    const duplicateFreeList = [];
    restaurants.forEach((entity) => {
      if (!duplicateFreeList.find((entry) => entry.id === entity.id))
        duplicateFreeList.push(entity);
    });
    hotels.forEach((entity) => {
      if (!duplicateFreeList.find((entry) => entry.id === entity.id))
        duplicateFreeList.push(entity);
    });
    supermarkets.forEach((entity) => {
      if (!duplicateFreeList.find((entry) => entry.id === entity.id))
        duplicateFreeList.push(entity);
    });
    return duplicateFreeList;
  };

  return (
    <Map
      google={google}
      zoom={3}
      style={{
        position: "absolute",
        height: "90%",
      }}
    >
      {listWithoutDuplicates().map((entity, index) => {
        const coordinates = entity.coordinates.split(", ");
        return (
          <Marker
            position={{ lat: coordinates[0], lng: coordinates[1] }}
            key={index}
            onClick={(e, marker) => {
              setMarker(marker);
              setEntityToDisplayInfo(entity.id);
            }}
            icon={{
              url: getIconUrl(entity),
            }}
          />
        );
      })}
      {listWithoutDuplicates().map((entity) => (
        <InfoWindow
          visible={entityToDisplayInfo === entity.id}
          marker={marker}
          onClose={() => setEntityToDisplayInfo(null)}
          onOpen={() => onOpen(entity)}
          key={entity.id}
        >
          <div id={entity.id} />
        </InfoWindow>
      ))}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyC5gRVM1Nrp6P2Ur3W7q3G9LGEkEamJMWY",
})(Locations);
