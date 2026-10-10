
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { useProduct } from "../Hook/useProduct";
import "../styles/ProductDetails.scss";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { handleGetProductById, handleGetAllProducts } = useProduct();
  const products = useSelector((state) => state.product.products || []);

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [openSection, setOpenSection] = useState("delivery");
  const [pincode, setPincode] = useState("");
  const [deliveryMessage, setDeliveryMessage] = useState("");

  const sizes = ["28", "30", "32", "34", "36", "38"];

  useEffect(() => {
    let active = true;

    const fetchProduct = async () => {
      setProduct(null);

      try {
        const response = await handleGetProductById(productId);
        const data =
          response?.product ??
          response?.data?.product ??
          response?.data ??
          response;

        if (active) {
          setProduct(data);
          setSelectedImage(0);
          setSelectedSize("");
          setIsWishlisted(false);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
        if (active) setProduct(null);
      }
    };

    if (productId) fetchProduct();

    return () => {
      active = false;
    };
  }, [productId]);

  useEffect(() => {
    if (!products.length) handleGetAllProducts();
  }, []);

  const images = product?.images?.filter((image) => image?.url) || [];
  const price = product?.price?.amount ?? product?.price ?? 0;
  const productTitle = product?.title || "Product";

  const changeImage = (index) => {
    if (!images.length) return;
    setSelectedImage((index + images.length) % images.length);
  };

  const toggleSection = (section) => {
    setOpenSection((current) => (current === section ? "" : section));
  };

  const checkDelivery = () => {
    if (!/^[1-9]\d{5}$/.test(pincode)) {
      setDeliveryMessage("Please enter a valid 6-digit pincode.");
      return;
    }

    if (!selectedSize) {
      setDeliveryMessage("Please select your size to check delivery.");
      return;
    }

    setDeliveryMessage("Delivery availability will be confirmed at checkout.");
  };

  const shareProduct = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: productTitle,
          url: window.location.href,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        alert("Product link copied.");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Unable to share product:", error);
      }
    }
  };

  const addToCart = () => {
    if (!selectedSize) {
      alert("Please select a size first.");
      return;
    }

    // Connect your actual cart API or Redux action here.
    alert(`Size ${selectedSize} selected. Connect your cart API here.`);
  };

  const recommendedProducts = products
    .filter((item) => item._id !== product?._id)
    .slice(0, 4);

  if (!product) {
    return <div className="product-loading">Loading product...</div>;
  }

  return (
    <main className="product-details-page">
      <div className="product-layout">
        {/* Desktop: vertical image gallery */}
        <section className="desktop-gallery">
          {images.length ? (
            images.map((image, index) => (
              <div
                key={image._id || image.url || index}
                className={`desktop-gallery-image ${
                  selectedImage === index ? "active" : ""
                }`}
              >
                <button
                  type="button"
                  className="desktop-image-button"
                  onClick={() => changeImage(index)}
                  aria-label={`Select image ${index + 1}`}
                >
                  <img
                    src={image.url}
                    alt={`${productTitle} ${index + 1}`}
                  />
                </button>

                <button
                  type="button"
                  className={`gallery-heart ${
                    isWishlisted ? "wishlisted" : ""
                  }`}
                  onClick={() => setIsWishlisted((value) => !value)}
                  aria-label="Toggle wishlist"
                >
                  {isWishlisted ? "♥" : "♡"}
                </button>
              </div>
            ))
          ) : (
            <div className="no-product-image">No image available</div>
          )}
        </section>

        {/* Mobile: main image with clickable thumbnails */}
        <section className="mobile-gallery">
          <div className="mobile-image-toolbar">
            <button
              type="button"
              className="back-icon"
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              ‹
            </button>

            <div className="mobile-toolbar-actions">
              <button type="button" onClick={shareProduct} aria-label="Share">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 15V3m-5 5 5-5 5 5M5 12v9h14v-9" />
                </svg>
              </button>

              <button
                type="button"
                className={isWishlisted ? "wishlisted" : ""}
                onClick={() => setIsWishlisted((value) => !value)}
                aria-label="Toggle wishlist"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8-7.6a5.5 5.5 0 0 0 .8-8.8Z" />
                  {!isWishlisted && <path d="M19 15v6m-3-3h6" />}
                </svg>
              </button>

              <button
                type="button"
                onClick={() => navigate("/cart")}
                aria-label="Shopping bag"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 8h14l1 13H4L5 8Zm4 0V6a3 3 0 0 1 6 0v2" />
                </svg>
              </button>
            </div>
          </div>

          <div
            className="mobile-main-image"
            onClick={() => changeImage(selectedImage + 1)}
            role="button"
            tabIndex={0}
            aria-label="Tap to view next product image"
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                changeImage(selectedImage + 1);
              }
            }}
          >
            {images.length ? (
              <img
                src={images[selectedImage]?.url}
                alt={productTitle}
              />
            ) : (
              <div className="no-product-image">No image available</div>
            )}

            {images.length > 1 && (
              <span className="mobile-image-counter">
                {selectedImage + 1} / {images.length}
              </span>
            )}
          </div>

          {/* Horizontal thumbnail gallery below main image */}
          {images.length > 1 && (
            <div className="mobile-thumbnails">
              {images.map((image, index) => (
                <button
                  type="button"
                  key={image._id || image.url || index}
                  className={selectedImage === index ? "active" : ""}
                  onClick={() => changeImage(index)}
                  aria-label={`View image ${index + 1}`}
                >
                  <img
                    src={image.url}
                    alt={`${productTitle} ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Product information */}
        <section className="product-info">
          <div className="product-title-block">
            <h1>{productTitle}</h1>
            <strong>₹{Number(price).toLocaleString("en-IN")}</strong>
            <p className="mrp-note">*MRP Inclusive of all taxes</p>

            <div className="product-rating">
              <span className="rating-badge">4.3 ★</span>
              <span>47 Ratings and 7 Reviews</span>
            </div>
          </div>

          <div className="offers-row">
            <div className="offer-card">
              <span>TRYSNITCH5 ▢</span>
              <p>Enjoy 5% off on your first web order.</p>
            </div>

            <div className="offer-card">
              <span>NEW10 ▢</span>
              <p>Enjoy 10% off on your first order above ₹2499.</p>
            </div>
          </div>

          <div className="selected-color">
            <span>Selected Color</span>
            <span>·</span>
            <strong>Default</strong>
          </div>

          {/* Desktop thumbnail selection */}
          <div className="product-option-images">
            {images.map((image, index) => (
              <button
                type="button"
                key={image._id || image.url || index}
                className={selectedImage === index ? "active" : ""}
                onClick={() => changeImage(index)}
                aria-label={`Select image ${index + 1}`}
              >
                <img
                  src={image.url}
                  alt={`${productTitle} ${index + 1}`}
                />
              </button>
            ))}
          </div>

          <div className="size-heading">
            <p><span>↔</span> We recommend one size smaller</p>
            <button type="button" onClick={() => toggleSection("sizeGuide")}>
              SIZE GUIDE
            </button>
          </div>

          <div className="size-options">
            {sizes.map((size) => (
              <button
                type="button"
                key={size}
                className={selectedSize === size ? "active" : ""}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          {openSection === "sizeGuide" && (
            <div className="size-guide-panel">
              Select the size that best matches your measurements.
            </div>
          )}

          <div className="delivery-strip">
            FREE 1-2 day delivery on 5k+ pincodes
          </div>

          <button
            type="button"
            className="add-to-cart"
            onClick={addToCart}
          >
            ADD <span>＋</span>
          </button>

          <div className="delivery-section">
            <button
              type="button"
              className="accordion-heading"
              onClick={() => toggleSection("delivery")}
            >
              <span>DELIVERY</span>
              <span>{openSection === "delivery" ? "−" : "+"}</span>
            </button>

            {openSection === "delivery" && (
              <div className="accordion-content">
                <div className="pincode-form">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="Enter Pincode"
                    value={pincode}
                    onChange={(event) => {
                      setPincode(event.target.value.replace(/\D/g, ""));
                      setDeliveryMessage("");
                    }}
                  />
                  <button type="button" onClick={checkDelivery}>
                    CHECK
                  </button>
                </div>

                <p
                  className={
                    deliveryMessage ? "delivery-message" : "delivery-hint"
                  }
                >
                  {deliveryMessage ||
                    "Please select your size to check delivery date"}
                </p>
              </div>
            )}
          </div>

          {[
            ["description", "DESCRIPTION & FIT"],
            ["reviews", "REVIEWS"],
            ["returns", "RETURNS"],
          ].map(([key, label]) => (
            <div className="accordion-item" key={key}>
              <button
                type="button"
                className="accordion-heading"
                onClick={() => toggleSection(key)}
              >
                <span>{label}</span>
                <span>{openSection === key ? "−" : "+"}</span>
              </button>

              {openSection === key && (
                <div className="accordion-content">
                  {key === "description"
                    ? product.description || "No description available."
                    : key === "reviews"
                    ? "Customer reviews will appear here."
                    : "Return policy details will appear here."}
                </div>
              )}
            </div>
          ))}
        </section>
      </div>

      {recommendedProducts.length > 0 && (
        <section className="recommended-section">
          <h2>YOU MAY ALSO LIKE</h2>

          <div className="recommended-grid">
            {recommendedProducts.map((item) => (
              <button
                type="button"
                className="recommended-card"
                key={item._id}
                onClick={() => {
                  navigate(`/product/${item._id}`);
                  window.scrollTo(0, 0);
                }}
              >
                <div className="recommended-image">
                  {item.images?.[0]?.url && (
                    <img
                      src={item.images[0].url}
                      alt={item.title}
                      loading="lazy"
                    />
                  )}
                </div>

                <div className="recommended-details">
                  <h3>{item.title}</h3>
                  <strong>
                    ₹{Number(
                      item.price?.amount ?? item.price ?? 0
                    ).toLocaleString("en-IN")}
                  </strong>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductDetails;
