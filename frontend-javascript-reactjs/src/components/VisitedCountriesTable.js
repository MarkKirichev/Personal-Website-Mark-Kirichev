import React from 'react';
import './VisitedCountriesTable.scss';

const VisitedCountriesTable = ({ visitedCountries }) => {
    return (
        <div className="visited-countries-table">
            <table>
                <thead>
                <tr>
                    <th>Country</th>
                    <th>Visits</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(visitedCountries).map(([countryCode, countryData]) => (
                    <tr key={countryCode}>
                        <td>{countryData.name}</td>
                        <td>{countryData.visits}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default VisitedCountriesTable;
