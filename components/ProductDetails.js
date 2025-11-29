import React from "react";
import { useParams, Link } from "react-router-dom";
import productsData from "../data/products.json";
import "../components/ProductsDetails.css";
import Footer from "./Footer";

// Local images
import Item1 from "../components/items/item1.jpg";
import Item2 from "../components/items/item2.jpg";
import Item3 from "../components/items/item3.jpg";
import Item4 from "../components/items/item4.jpg";

const ProductDetails = () => {
  const { id } = useParams();
  const product = productsData.find((p) => p.id === parseInt(id));

  const imageMap = {
    1: Item1,
    2: Item2,
    3: Item3,
    4: Item4,
  };

  if (!product)
    return (
      <div className="details-container not-found">
        <h2>Product not found</h2>
        {/* ✅ Back button even if product not found */}
        <Link to="/products" className="back-btn">
          ← Back to Products
        </Link>
      </div>
    );

  return (
    <>
      <div className="details-container">
        <div className="details-card">
          <div className="details-image">
            <img src={imageMap[product.id]} alt={product.name} />
          </div>

          <div className="details-info">
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">${product.price.toLocaleString()}</p>
            <p className="product-description">{product.description}</p>

            {/* ✅ Put the Back button here */}
            <Link to="/products" className="back-btn">
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;
