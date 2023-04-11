import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FlightInformation = () => {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        axios.get('/flights')
            .then(res => {
                setFlights(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    const addFlight = (flight) => {
        // Add flight data to the server
    };

    const updateFlight = (flight) => {
        // Update flight data on the server
    };

    const deleteFlight = (flightId) => {
        // Delete flight data from the server
    };

    return (
        <div>
            <h1>Flight Information</h1>
            <table>
                {/* Render flight information in a table */}
            </table>
            {/* Add input elements for adding, editing, and deleting flight records */}
        </div>
    );
};

export default FlightInformation;
