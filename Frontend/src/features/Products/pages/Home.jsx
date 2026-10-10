import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useProduct } from "../Hook/useProduct";
import "../styles/Home.scss";
import { useNavigate } from "react-router";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = () => {
  const { handleGetAllProducts } = useProduct();
  const navigate = useNavigate();

  const products = useSelector((state) => state.product.products);
  console.log(products);

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  const categories = [
    "T-Shirts",
    "Shirts",
    "Jeans",
    "Cargo",
    "Jackets",
    "Hoodies",
    "Shorts",
    "Accessories",
  ];

  const heroProduct = products[0];

  return (
    <main className="home">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">SNITCH</div>

        <nav>
          <a href="/">Home</a>
          <a href="#men">Men</a>
          <a href="#women">Women</a>
          <a href="#new">New Arrivals</a>
          <a href="#sale">Sale</a>
        </nav>

        <div className="nav-actions">
          <div className="search">
            <span>⌕</span>
            <input type="text" placeholder="Search for products..." />
          </div>

          <button>♡</button>
          <button>🛒</button>
          <button>♙</button>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation
          pagination={{ clickable: true }}
          className="hero-swiper"
        >
          {products.slice(0, 5).map((product) => {
            const imageUrl = product.images?.[0]?.url;

            return (
              <SwiperSlide key={product._id}>
                <div className="hero-slide">
                  <div className="hero-content">
                    <p>NEW COLLECTION</p>

                    <h1>
                      STYLE
                      <br />
                      BEYOND
                      <br />
                      BASICS
                    </h1>

                    <span>Premium looks for the modern you.</span>

                    <button className="shop-btn">Shop Now →</button>
                  </div>

                  <div className="hero-image">
                    <img src={imageUrl} alt={product.title} />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>

      {/* Categories */}
      <section className="categories">
        {categories.map((category) => (
          <div className="category" key={category}>
            <div className="category-icon">
              {category === "T-Shirts" && "👕"}
              {category === "Shirts" && "👔"}
              {category === "Jeans" && "👖"}
              {category === "Cargo" && "🩳"}
              {category === "Jackets" && "🧥"}
              {category === "Hoodies" && "🧥"}
              {category === "Shorts" && "🩳"}
              {category === "Accessories" && "🧢"}
            </div>

            <span>{category}</span>
          </div>
        ))}
      </section>

      {/* Trending Products */}
      <section className="products-section">
        <div className="section-heading">
          <div>
            <h2>Trending Products</h2>
            <p>Most loved styles right now</p>
          </div>

          <button>View All →</button>
        </div>

        <div className="product-grid">
          {products.map((product) => {
            const imageUrl = product.images?.[0]?.url;

            return (
              <article
                className="product-card"
                key={product._id}
                onClick={() => {
                  navigate(`/product/${product._id}`);
                }}
              >
                <div className="product-image">
                  <img src={imageUrl} alt={product.title} />

                  <button className="wishlist">♡</button>
                </div>

                <div className="product-info">
                  <h3>{product.title}</h3>

                  <p>{product.description}</p>

                  <div className="product-bottom">
                    <strong>₹{product.price?.amount}</strong>

                    <button>🛒</button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Offer Banner */}
      <section className="offer" id="sale">
        <div className="offer-content">
          <p>LIMITED TIME</p>

          <h2>FLAT 40% OFF</h2>

          <span>On Selected Styles</span>

          <button className="shop-btn">Shop Now →</button>
        </div>

        {heroProduct && <img src={heroProduct.images?.[0]?.url} alt="Sale" />}
      </section>

      {/* New Arrivals */}
      <section className="products-section" id="new">
        <div className="section-heading">
          <div>
            <h2>New Arrivals</h2>
            <p>Fresh styles for a new you</p>
          </div>

          <button>View All →</button>
        </div>

        <div className="product-grid">
          {products.slice(4, 8).map((product) => {
            const imageUrl = product.images?.[0]?.url;

            return (
              <article
                className="product-card"
                key={product._id}
                onClick={() => {
                  navigate(`/product/${product._id}`);
                }}
              >
                <div className="product-image">
                  <img src={imageUrl} alt={product.title} />

                  <button className="wishlist">♡</button>
                </div>

                <div className="product-info">
                  <h3>{product.title}</h3>

                  <p>{product.description}</p>

                  <div className="product-bottom">
                    <strong>₹{product.price?.amount}</strong>

                    <button>🛒</button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-brand">
          <h2>SNITCH</h2>
          <p>Premium fashion for the modern generation.</p>
        </div>

        <div>
          <h4>Shop</h4>
          <a href="#men">Men</a>
          <a href="#women">Women</a>
          <a href="#new">New Arrivals</a>
          <a href="#sale">Sale</a>
        </div>

        <div>
          <h4>Help</h4>
          <a href="/">Contact Us</a>
          <a href="/">Shipping</a>
          <a href="/">Returns</a>
          <a href="/">FAQs</a>
        </div>

        <div>
          <h4>Follow Us</h4>
          <a href="/">Instagram</a>
          <a href="/">Facebook</a>
          <a href="/">YouTube</a>
        </div>
      </footer>

      <div className="copyright">© 2026 SNITCH. All rights reserved.</div>
    </main>
  );
};

export default Home;
