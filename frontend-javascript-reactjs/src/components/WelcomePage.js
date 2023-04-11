import React, { useEffect, useState } from 'react';
import { fastApi, akkaApi } from '../api';
import './WelcomePage.scss';

// personal media imports
import FunnyImage from '../assets/funny-image.png';
import Logo from '../logo/Logo';

const WelcomePage = () => {
    const [fastApiPerson, setFastApiPerson] = useState(null);
    const [akkaPerson, setAkkaPerson] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fastApiResponse = await fastApi.get('/hello');
                setFastApiPerson(fastApiResponse.data);

                const akkaApiResponse = await akkaApi.get('/hello');
                setAkkaPerson(akkaApiResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="welcome-page">
            <Logo />
            <h1 className="welcome-title">Welcome to My Personal Website</h1>
            <p className="welcome-text odd-line">
                This is a simple example of a welcome page with some basic information and creative animations.
            </p>
            <p className="welcome-text even-line">
                Every odd line gets displayed from left to right.
            </p>
            <p className="welcome-text odd-line">
                Every even line gets displayed from right to left.
            </p>
            {fastApiPerson && (
                <div className="person-info">
                    <h3>FastAPI Backend</h3>
                    <h2 className="person-name">{fastApiPerson.full_name}</h2>
                    <p className="person-dob">Date of Birth: {fastApiPerson.date_of_birth}</p>
                    <p className="person-nationality">Nationality: {fastApiPerson.nationality}</p>
                </div>
            )}
            {akkaPerson && (
                <div className="person-info">
                    <h3>Scala Akka Backend</h3>
                    <h2 className="person-name">{akkaPerson.fullName}</h2>
                    <p className="person-dob">Date of Birth: {akkaPerson.dateOfBirth}</p>
                    <p className="person-nationality">Nationality: {akkaPerson.nationality}</p>
                </div>
            )}

            <div className="funny-image-container">
                <img src={FunnyImage} alt="Funny" className="funny-image animate__animated animate__rotateIn animate__slower" />
            </div>

        </div>
    );
};

export default WelcomePage;
