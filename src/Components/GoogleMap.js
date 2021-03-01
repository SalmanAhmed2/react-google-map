import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import RoomIcon from "@material-ui/icons/Room";
import data from "./data.json";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import { BrowserRouter as Router, Link } from "react-router-dom";
const Marker = ({ marker }) => <div>{marker}</div>;

const center = {
  lat: 24.8872,
  lng: 67.0769,
};

function MapContainer() {
  let [value, setValue] = useState("");
  let [latLng, setLatLng] = useState(center);

  const handleSubmit = (event) => {
    const address = event.target.innerHTML;
    geocodeByAddress(address)
      .then((result) => getLatLng(result[0]))
      .then((latLng) => {
        console.log(latLng);
        setLatLng(latLng);
      })
      .catch((error) => console.log("Error", error));
  };

  return (
    <Router>
      <div style={{ height: "100vh", width: "20%" }}>
        <table>
          <h1>Locations</h1>
          {data.map((item) => (
            <>
              <tr>
                <Link onClick={handleSubmit}>{item.label}</Link>
              </tr>
              <hr />
            </>
          ))}
        </table>
      </div>
      <div style={{ height: "100vh", width: "80%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyD2EUbN8GTw0joJ629a5RiZlauA7S65-8M" }}
          center={latLng}
          zoom={1}
        >
          {data.map((latLng) => (
            <Marker
              lat={latLng.lat}
              lng={latLng.lng}
              marker={<RoomIcon fontSize="large" />

              }
            />
          ))}
          {}
        </GoogleMapReact>
      </div>
    </Router>
  );
}
export default MapContainer;
