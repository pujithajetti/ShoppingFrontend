import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { auth } from '../firebase';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        navigate('/login');
      }
    });

    // ✅ Fetch with error handling
    fetch('https://shoppingbackend-lz5i.onrender.com')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => {
        setProducts(data.products);
        setFiltered(data.products);
      })
      .catch(error => {
        console.error('❌ Error fetching products:', error.message);
      });

    return () => unsubscribe();
  }, [navigate]);

  const handleAddToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  const filterByCategory = (category) => {
    const result = products.filter(p => p.category === category);
    setFiltered(result);
  };

  const showAll = () => setFiltered(products);

  const goToCartPage = () => {
    navigate('/cart', { state: { cart } });
  };

  return (
    <>
      <Navbar cartCount={cart.length} onCartClick={goToCartPage} />

      <div className="home-container">
        <div style={{ marginBottom: '20px' }}>
          <button className="category-button" onClick={showAll}>All</button>
          <button className="category-button" onClick={() => filterByCategory("men's clothing")}>Men's Clothing</button>
          <button className="category-button" onClick={() => filterByCategory("women's clothing")}>Women's Clothing</button>
          <button className="category-button" onClick={() => filterByCategory("electronics")}>Electronics</button>
          <button className="category-button" onClick={() => filterByCategory("jewelery")}>Jewelery</button>
          <button className="category-button" onClick={() => filterByCategory("furniture")}>furniture</button>
        </div>

        <div className="product-grid">
          {filtered.map((product) => (
            <div key={product.id} className="product-card">
              <h4>{product.title}</h4>
              <img src={product.image} alt={product.title} />
              <p><strong>${product.price}</strong></p>
              <p style={{ fontSize: '13px', flexGrow: 1 }}>{product.description.slice(0, 60)}...</p>
              <button className="add-button" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
