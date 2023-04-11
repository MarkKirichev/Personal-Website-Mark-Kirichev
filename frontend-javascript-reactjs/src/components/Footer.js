import React from "react";

const Footer = () => {
    const isAuthenticated = !!localStorage.getItem("access_token");

    return (
        <footer>
            {isAuthenticated && <input type="radio" checked disabled />}
            <p>Some footer content here</p>
        </footer>
    );
};

export default Footer;
