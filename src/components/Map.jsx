import React, { useState , useEffect } from "react";
import ReactMapGL, { Marker , Popup} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapComponent = ({latitude, longitude}) => {
  const [showPopup , setShowPopup] = useState(false);
  const [address , setAddress] = useState("");
  const [viewport, setViewport] = useState({
    width : "100vw",
    height : "100vh",
    latitude: latitude,//28.6448,
    longitude: longitude,//77.216,
    zoom: 8,  
  });

  useEffect(() => {
    if (showPopup) {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          // console.log(data);
          const address = data.features[0].place_name;
          // console.log(address);
          setAddress(address);
        });
    }
  }, [showPopup , longitude , latitude]);

  return (
    <div style={{ width: "80vw", height: "50vh" }}>
      <ReactMapGL
        {...viewport}
        mapboxAccessToken= {process.env.REACT_APP_MAPBOX_TOKEN}
        width="100%"
        height="100%"
        transitionDuration="200"
        mapStyle="mapbox://styles/abc69/clgjol8vl007e01mjha819vr9"
        onViewportChange={(newViewport) => setViewport(newViewport)}
      >
        {showPopup ? (
        <Popup
          latitude = {latitude}
          longitude = {longitude}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setShowPopup(false)}
          anchor="bottom"
        >
          <div> Address : {address}</div>
        </Popup>
      ) : ""}
        <Marker
          latitude={latitude}
          longitude={longitude}
            offsetLeft={-3.5 * viewport.zoom}
            offsetTop={-7 * viewport.zoom}
        >
              <img
          onClick ={ (e) => {
            e.preventDefault();
            setShowPopup(true)}}
          style={{ height: 50, width: 50 }}
          src="https://play-lh.googleusercontent.com/5WifOWRs00-sCNxCvFNJ22d4xg_NQkAODjmOKuCQqe57SjmDw8S6VOSLkqo6fs4zqis"
          alt = "Marker"
        />
        </Marker>
      </ReactMapGL>
    </div>
  );
        };
export default MapComponent;

// import 'mapbox-gl/dist/mapbox-gl.css';

// import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

// mapboxgl.accessToken = 'pk.eyJ1IjoiYWJjNjkiLCJhIjoiY2xnaTFodzZkMHI5MzNlcGg1a3N5cm5hcSJ9.SPylTKEJGxTTNdd0PW0m7A';
// const map = new mapboxgl.Map({
//     container: 'map', // container ID
//     style: 'mapbox://styles/mapbox/streets-v12', // style URL
//     center: [-74.5, 40], // starting position [lng, lat]
//     zoom: 9, // starting zoom
// });
