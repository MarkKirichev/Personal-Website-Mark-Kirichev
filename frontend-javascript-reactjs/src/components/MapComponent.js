import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';

const MapComponent = ({ flights, mapRegion }) => {
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

export default MapComponent;
