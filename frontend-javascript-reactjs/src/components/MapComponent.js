import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, GeoJSON } from 'react-leaflet';
import { MarkerClusterGroup } from 'leaflet.markercluster';

import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/leaflet.markercluster';

import './MapComponent.scss';

import countriesData from './countries.geo.json';


const MapComponent = ({ flights, mapRegion, visitedCountries }) => {
    const [center, setCenter] = useState([51.505, -0.09]);
    const [zoom, setZoom] = useState(2);

    useEffect(() => {
        if (mapRegion === 'europe') {
            setCenter([50, 10]);
            setZoom(4);
        } else if (mapRegion === 'us') {
            setCenter([37.7749, -122.4194]);
            setZoom(4);
        } else if (mapRegion === 'americas') {
            setCenter([40, -95]);
            setZoom(3);
        } else {
            setCenter([51.505, -0.09]);
            setZoom(2);
        }
    }, [mapRegion]);

    const renderFlightPaths = () => {
        return flights.map((flight, index) => {
            const departureCoords = [
                flight.departure_airport.latitude,
                flight.departure_airport.longitude,
            ];
            const arrivalCoords = [
                flight.arrival_airport.latitude,
                flight.arrival_airport.longitude,
            ];
            const pathCoordinates = [departureCoords, arrivalCoords];
            return (
                <Polyline
                    key={index}
                    positions={pathCoordinates}
                    color={'blue'}
                    weight={3}
                    opacity={0.7}
                />
            );
        });
    };

    const renderAirportMarkers = () => {
        return flights.map((flight, index) => {
            const departureCoords = [
                flight.departure_airport.latitude,
                flight.departure_airport.longitude,
            ];
            const arrivalCoords = [
                flight.arrival_airport.latitude,
                flight.arrival_airport.longitude,
            ];
            return (
                <React.Fragment key={index}>
                    <Marker position={departureCoords}>
                        <Popup>{flight.departure_airport.name}</Popup>
                    </Marker>
                    <Marker position={arrivalCoords}>
                        <Popup>{flight.arrival_airport.name}</Popup>
                    </Marker>
                </React.Fragment>
            );
        });
    };

    return (
        <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {renderFlightPaths()}
            {renderAirportMarkers()}
        </MapContainer>
    );
};


/*

  // ... previous state variables

  const [selectedCountry, setSelectedCountry] = useState(null);

  const onEachCountry = (country, layer) => {
    const countryCode = country.properties.ISO_A2;
    layer.options.fillColor = visitedCountries[countryCode]?.color;
    layer.options.className = 'country-hover';
    layer.on({
      mouseover: () => {
        setSelectedCountry(country.properties.NAME);
      },
      mouseout: () => {
        setSelectedCountry(null);
      },
    });
  };

  const renderCountryName = () => {
    if (selectedCountry) {
      return (
        <div className="country-name" style={{ fontFamily: 'Funky Font' }}>
          {selectedCountry}
        </div>
      );
    }
    return null;
  };

  // ... previous render functions

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        key="countries"
        data={countriesData}
        style={{ weight: 1, color: 'black' }}
        onEachFeature={onEachCountry}
      />
      {renderFlightPaths()}
      <MarkerClusterGroup>
        {renderAirportMarkers()}
      </MarkerClusterGroup>
      {renderCountryName()}
    </MapContainer>
  );
};

 */



export default MapComponent;
