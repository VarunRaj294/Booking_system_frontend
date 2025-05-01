import React, { useState, useEffect } from 'react';
import './RecommendationSection.css';
import axios from 'axios';
import PropertyCard from '../pages/PropertyCard';
import { FaSearch, FaFilter } from 'react-icons/fa';

const RecommendationSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [locations, setLocations] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Fetch locations from the admin's database
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/location/fetch/all');
        if (response.data && response.data.locations) {
          setLocations(response.data.locations);
        } else {
          setError('Invalid locations data received');
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
        setError('Failed to fetch locations. Please try again later.');
      }
    };

    // Fetch properties from the backend
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/property/fetch/all?status=Active');
        if (response.data && response.data.properties) {
          console.log(response.data.properties);
          setProperties(response.data.properties);
        } else {
          setError('Invalid properties data received');
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError('Failed to fetch properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
    fetchProperties();
  }, []);

  // Filter properties based on selected category and location
  const filteredProperties = properties.filter(property => {
    const categoryMatch = selectedCategory === 'all' || (property.type && property.type.toLowerCase() === selectedCategory);
    const locationMatch = selectedLocation === 'all' || 
      (property.location && property.location.name && property.location.name.toLowerCase() === selectedLocation);
    return categoryMatch && locationMatch;
  });

  // Get unique property types from the fetched properties
  const types = [...new Set(properties.map(property => property.type).filter(Boolean))];

  return (
    <section className="recommendation-section">
      <div className="section-header">
        <div className="header-content">
          <h2>Recommended Accommodations</h2>
          <p>Discover your perfect stay with our curated selection</p>
        </div>
        <button 
          className="filter-toggle-btn"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <div className={`filters ${showFilters ? 'show' : ''}`}>
        <div className="filters-container">
          <div className="filter-group">
            <label htmlFor="category">
              <FaSearch className="filter-icon" />
              Type
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Types</option>
              {types.map(type => (
                <option key={type} value={type.toLowerCase()}>{type}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="location">
              <FaSearch className="filter-icon" />
              Location
            </label>
            <select
              id="location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              disabled={loading}
              className="filter-select"
            >
              <option value="all">All Locations</option>
              {loading ? (
                <option value="">Loading locations...</option>
              ) : error ? (
                <option value="">Error loading locations</option>
              ) : (
                locations.map(location => (
                  <option key={location.id} value={location.name.toLowerCase()}>{location.name}</option>
                ))
              )}
            </select>
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="accommodation-grid">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading properties...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p className="error-message">{error}</p>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="no-results">
            <p>No properties found matching your criteria.</p>
            <button 
              className="reset-filters-btn"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedLocation('all');
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredProperties.map(property => (
            <PropertyCard item={property} key={property.id} />
          ))
        )}
      </div>
    </section>
  );
};

export default RecommendationSection; 