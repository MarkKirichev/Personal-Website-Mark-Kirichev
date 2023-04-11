import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent';
import VisitedCountriesTable from './VisitedCountriesTable';
import Login from "./Login";
import Footer from "./Footer";

const App = () => {
    useEffect(() => {
        let timeout;
        const resetTimeout = () => {
            clearTimeout(timeout);
            timeout = setTimeout(logout, 15 * 60 * 1000); // 15 minutes
        };

        const logout = () => {
            localStorage.removeItem("access_token");
            window.location.reload();
        };

        window.addEventListener("mousemove", resetTimeout);
        window.addEventListener("keydown", resetTimeout);
        window.addEventListener("mousedown", resetTimeout);

        resetTimeout();

        return () => {
            clearTimeout(timeout);
            window.removeEventListener("mousemove", resetTimeout);
            window.removeEventListener("keydown", resetTimeout);
            window.removeEventListener("mousedown", resetTimeout);
        };
    }, []);

    return (
        <div>
            <Login />
            <Footer />
        </div>
    );
};

export default App;
