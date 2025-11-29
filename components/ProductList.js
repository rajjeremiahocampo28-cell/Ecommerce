import React from "react";
import { Link } from "react-router-dom";
import "../components/ProductsList.css";
import productsData from "../data/products.json";
import Footer from "./Footer";

// Local images
import Item1 from "../components/items/item1.jpg";
import Item2 from "../components/items/item2.jpg";
import Item3 from "../components/items/item3.jpg";
import Item4 from "../components/items/item4.jpg";

const ProductList = () => {
  const imageMap = {
    1: Item1,
    2: Item2,
    3: Item3,
    4: Item4,
  };

  return (
    <div className="product-page">
      <h2 className="product-title">Products</h2>

      {/* ✅ Place the Link here */}
      <div className="product-grid">
        {productsData.map((product) => (
          <Link
            to={`/products/${product.id}`}   // ✅ Correct path (plural)
            key={product.id}
            className="product-card-link"
          >
            <div className="product-card">
              <img
                src={imageMap[product.id]}
                alt={product.name}
                className="product-img"
              />
              <h3 className="brand-name">{product.name}</h3>
            </div>
          </Link>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default ProductList;
