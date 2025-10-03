import React, { useEffect, useState } from 'react';
import scraperData from '../../mock_data/scraper.json';
import './Home.css'; // We’ll add simple styling here

function Home() {
  const [homes, setHomes] = useState([]);
  useEffect(() => {
    setHomes(scraperData);
  }, []);

  return (
    <div className="home-container">
      <h2>Available Homes</h2>
      <div className="home-grid">
        {homes.map((home, idx) => (
          <div key={idx} className="home-card">
            <img src={home.image} alt={home.name} className="home-image" />
            <div className="home-info">
              <h3>{home.name}</h3>
              <p className="home-category">{home.category}</p>
              <p className="home-price">${home.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
