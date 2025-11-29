import React from "react";
import "./App.css";

function Product({ addToCart }) {
  const watches = [
    {
      id: 1,
      name: "Santos de Cartier",
      price: 9500,
      img: "https://swissiceco.com/cdn/shop/files/Photoroom_20250304_124632.jpg?v=1741122170",
    },
    {
      id: 2,
      name: "Rolex Daytona",
      price: 12000,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW-NMYL2MGM4RuK4XDkA2HpoOLN7doaO43Jw&s",
    },
    {
      id: 3,
      name: "Patek Philippe Nautilus",
      price: 25000,
      img: "https://i.pinimg.com/236x/7b/9a/49/7b9a49ce1c03a1b1171cb8188d30abc2.jpg",
    },
    {
      id: 4,
      name: "Audemars Piguet Royal Oak",
      price: 6000,
      img: "https://assets.theluxuryhut.com/cms/admin/upload/1676017017ap-watch-authenticity.jpg",
    },
  ];

  return (
    <div className="product-section">
      <h2 className="section-title">🕒 Available Watches</h2>
      <div className="product-grid">
        {watches.map((watch) => (
          <div className="product-card" key={watch.id}>
            <img src={watch.img} alt={watch.name} className="product-image" />
            <h3 className="product-name">{watch.name}</h3>
            <p className="product-price">${watch.price.toLocaleString()}</p>
            <button className="add-btn" onClick={() => addToCart(watch)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;