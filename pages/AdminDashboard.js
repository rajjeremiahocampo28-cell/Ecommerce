import React, { useState, useEffect } from "react";

export default function AdminDashboard({ products, setProducts }) {
  const [newProduct, setNewProduct] = useState({ name: "", price: "", img: "" });
  const [editingProduct, setEditingProduct] = useState(null);

  // Initialize default products if empty
  useEffect(() => {
    if (products.length === 0) {
      setProducts([
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
      ]);
    }
  }, [products, setProducts]);

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.img) return;
    const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    setProducts([...products, { ...newProduct, id: newId }]);
    setNewProduct({ name: "", price: "", img: "" });
  };

  const handleDeleteProduct = (id) => setProducts(products.filter((p) => p.id !== id));
  const handleEditProduct = (product) => setEditingProduct(product);
  const handleSaveEdit = () => {
    setProducts(products.map((p) => (p.id === editingProduct.id ? editingProduct : p)));
    setEditingProduct(null);
  };

  // Common styles
  const inputStyle = {
    width: "250px",
    padding: "8px",
    margin: "5px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const buttonStyle = {
    margin: "5px",
    padding: "6px 12px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#4caf50",
    color: "white",
  };

  const deleteButtonStyle = { ...buttonStyle, backgroundColor: "#f44336" };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin! Manage products below.</p>

      {/* Add New Product */}
      <div style={{ marginBottom: "30px" }}>
        <h2>Add New Product</h2>
        <input
          style={inputStyle}
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          style={inputStyle}
          type="text"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          style={inputStyle}
          type="text"
          placeholder="Image URL"
          value={newProduct.img}
          onChange={(e) => setNewProduct({ ...newProduct, img: e.target.value })}
        />
        <button style={buttonStyle} onClick={handleAddProduct}>
          Add Product
        </button>
      </div>

      {/* Existing Products */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          width: "100%",
          maxWidth: "900px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              width: "200px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {editingProduct && editingProduct.id === product.id ? (
              <>
                <input
                  style={inputStyle}
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, name: e.target.value })
                  }
                />
                <input
                  style={inputStyle}
                  type="text"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, price: e.target.value })
                  }
                />
                <input
                  style={inputStyle}
                  type="text"
                  value={editingProduct.img}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, img: e.target.value })
                  }
                />
                <button style={buttonStyle} onClick={handleSaveEdit}>
                  Save
                </button>
              </>
            ) : (
              <>
                <img
                  src={product.img}
                  alt={product.name}
                  width="120"
                  style={{ marginBottom: "10px" }}
                />
                <p>{product.name}</p>
                <p>${product.price}</p>
                <div>
                  <button style={buttonStyle} onClick={() => handleEditProduct(product)}>
                    Edit
                  </button>
                  <button
                    style={deleteButtonStyle}
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}