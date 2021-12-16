import React, { useState } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import "./styles.scss";

const SingleLocationMap = ({ name, address, google, coordinates }) => {
  const [marker, setMarker] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  return coordinates ? (
    <div className="map">
      <Map
        google={google}
        zoom={14}
        style={{
          position: "absolute",
        }}
        initialCenter={{ lat: coordinates[0], lng: coordinates[1] }}
      >
        <Marker
          onClick={(e, marker) => {
            setShowInfo(true);
            setMarker(marker);
          }}
        />
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
  apiKey: "AIzaSyC5gRVM1Nrp6P2Ur3W7q3G9LGEkEamJMWY",
})(SingleLocationMap);
