import React, { useState } from 'react';
import RecommendationSection from '../components/RecommendationSection';
import './Home.css';

const Home = () => {
  const [showRecommendations, setShowRecommendations] = useState(false);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Find Your Perfect Stay</h1>
          <p>Discover amazing accommodations around the world</p>
          <div className="search-box">
            <input type="text" placeholder="Where do you want to go?" />
            <input type="date" placeholder="Check-in" />
            <input type="date" placeholder="Check-out" />
            <button>Search</button>
          </div>
        </div>
      </section>

      {/* Recommendation Button */}
      <div className="recommendation-button-container">
        <button 
          className="recommendation-button"
          onClick={() => setShowRecommendations(!showRecommendations)}
        >
          {showRecommendations ? 'Hide Recommendations' : 'Show Recommended Stays'}
        </button>
      </div>

      {/* Recommendation Section */}
      {showRecommendations && <RecommendationSection />}
    </div>
  );
};

export default Home; 