import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import Geocode from "react-geocode";
import "./styles.scss";

const getCoordinatesPromise = async (address) => {
  Geocode.setApiKey("AIzaSyBnWkSHaVlnJG66r99YmHqdylrX95eFELs");

  return await Geocode.fromAddress(address).then(
    (response) => {
      return Promise.resolve(response.results[0].geometry.location);
    },
    (error) => {
      console.error(error);
    }
  );
};

const SingleLocationMap = ({ name, address, google }) => {
  console.log(address);
  const [coordinates, setCoordinates] = useState(null);
  const [marker, setMarker] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const getCoordinates = async () => {
      console.log(address);
      const result = await getCoordinatesPromise(address);
      console.log(result);
      setCoordinates(result);
    };
    getCoordinates();
  }, [address]);

  return coordinates ? (
    <div className="map">
      <Map
        google={google}
        zoom={14}
        style={{
          position: "absolute",
        }}
        initialCenter={coordinates}
      >
        <Marker onClick={({ marker }) => setMarker(marker)} />
        <InfoWindow
          visible={showInfo}
          marker={marker}
          onClose={() => setShowInfo(false)}
        >
          <>
            <div>{name}</div>
            <div>{address}</div>
          </>
        </InfoWindow>
      </Map>
    </div>
  ) : null;
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBnWkSHaVlnJG66r99YmHqdylrX95eFELs",
})(SingleLocationMap);
