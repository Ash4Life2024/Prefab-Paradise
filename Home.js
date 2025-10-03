import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import scraperData from '../../mock_data/scraper.json';
import CartSidebar from './CartSidebar';
import './Home.css';

function Home() {
  const [homes, setHomes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedHome, setSelectedHome] = useState(null);
  const [viewCart, setViewCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState([0, 500000]);
  const [sortOption, setSortOption] = useState('name-asc');
  const [viewFavorites, setViewFavorites] = useState(false);

  useEffect(() => {
    setHomes(scraperData);
    fetchFavorites();
  }, []);

  // 🔹 Fetch Favorites from Firebase
  const fetchFavorites = async () => {
    const favCollection = collection(db, 'favorites');
    const favSnapshot = await getDocs(favCollection);
    const favs = favSnapshot.docs.map(doc => doc.data().name);
    setFavorites(favs);
  };

  // 🔹 Toggle favorite and sync to Firebase
  const toggleFavorite = async (home) => {
    const favCollection = collection(db, 'favorites');
    if (favorites.includes(home.name)) {
      // Remove from favorites
      const snapshot = await getDocs(favCollection);
      const docToDelete = snapshot.docs.find(d => d.data().name === home.name);
      if (docToDelete) {
        await updateDoc(doc(db, 'favorites', docToDelete.id), { removed: true });
      }
      setFavorites(prev => prev.filter(name => name !== home.name));
    } else {
      await addDoc(favCollection, { name: home.name, category: home.category, price: home.price });
      setFavorites(prev => [...prev, home.name]);
    }
  };

  // 🔹 Add to cart & sync inquiry to Firebase
  const addToCart = async (home) => {
    if (!cart.find(item => item.name === home.name)) {
      setCart(prev => [...prev, home]);
      await addDoc(collection(db, 'inquiries'), { name: home.name, category: home.category, price: home.price, timestamp: new Date() });
      alert(`${home.name} added to cart / inquiry! 🚀`);
    } else {
      alert(`${home.name} is already in the cart!`);
    }
  };

  const displayedHomes = homes
    .filter(home => {
      if (viewFavorites && !favorites.includes(home.name)) return false;
      const matchesCategory = categoryFilter === 'All' || home.category === categoryFilter;
      const matchesPrice = home.price >= priceFilter[0] && home.price <= priceFilter[1];
      const matchesSearch = home.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesPrice && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOption === 'name-asc') return a.name.localeCompare(b.name);
      if (sortOption === 'name-desc') return b.name.localeCompare(a.name);
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      return 0;
    });

  return (
    <div className="home-container">
      <h2>Available Homes</h2>

      <button className="open-cart-btn" onClick={() => setViewCart(true)}>
        🛒 View Cart ({cart.length})
      </button>

      <div className="favorites-toggle">
        <label>
          <input
            type="checkbox"
            checked={viewFavorites}
            onChange={() => setViewFavorites(!viewFavorites)}
          />
          View Favorites Only
        </label>
      </div>

      <div className="filter-bar">
        <input type="text" placeholder="Search by name..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Luxury">Luxury</option>
          <option value="Eco">Eco</option>
          <option value="Tiny">Tiny</option>
          <option value="Family">Family</option>
        </select>
        <input type="number" placeholder="Min Price" value={priceFilter[0]} onChange={e => setPriceFilter([Number(e.target.value), priceFilter[1]])} />
        <input type="number" placeholder="Max Price" value={priceFilter[1]} onChange={e => setPriceFilter([priceFilter[0], Number(e.target.value)])} />
        <select value={sortOption} onChange={e => setSortOption(e.target.value)}>
          <option value="name-asc">Name ↑</option>
          <option value="name-desc">Name ↓</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
        </select>
      </div>

      <div className="home-grid">
        {displayedHomes.length ? displayedHomes.map((home, idx) => (
          <div key={idx} className="home-card" onClick={() => setSelectedHome(home)}>
            <img src={home.image} alt={home.name} className="home-image" />
            <div className="home-info">
              <h3>{home.name}</h3>
              <p className="home-category">{home.category}</p>
              <p className="home-price">${home.price.toLocaleString()}</p>
              <button
                className={`favorite-btn ${favorites.includes(home.name) ? 'favorited' : ''}`}
                onClick={e => { e.stopPropagation(); toggleFavorite(home); }}
              >
                {favorites.includes(home.name) ? '❤️ Favorited' : '🤍 Favorite'}
              </button>
            </div>
          </div>
        )) : <p style={{ gridColumn: '1/-1', textAlign: 'center' }}>No homes found.</p>}
      </div>

      {selectedHome && (
        <div className="modal-overlay" onClick={() => setSelectedHome(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedHome(null)}>×</button>
            <img src={selectedHome.image} alt={selectedHome.name} className="modal-image" />
            <h3>{selectedHome.name}</h3>
            <p>Category: {selectedHome.category}</p>
            <p>Price: ${selectedHome.price.toLocaleString()}</p>
            <button
              className={`favorite-btn ${favorites.includes(selectedHome.name) ? 'favorited' : ''}`}
              onClick={() => toggleFavorite(selectedHome)}
            >
              {favorites.includes(selectedHome.name) ? '❤️ Favorited' : '🤍 Favorite'}
            </button>
            <button className="add-to-cart-btn" onClick={() => addToCart(selectedHome)}>
              🛒 Add to Cart / Inquiry
            </button>
          </div>
        </div>
      )}

      {viewCart && <CartSidebar cart={cart} setCart={setCart} onClose={() => setViewCart(false)} />}
    </div>
  );
}

export default Home;
