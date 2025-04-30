import React from 'react';
import PGListings from '../components/PGListings';
import './PGListingsPage.css';

const PGListingsPage = () => {
  return (
    <div className="pg-listings-page">
      <div className="page-header">
        <h1>Find Your Perfect PG</h1>
        <p>Browse through our curated list of PGs across different locations</p>
      </div>
      <PGListings />
    </div>
  );
};

export default PGListingsPage; 