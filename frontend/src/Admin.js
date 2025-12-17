import { useEffect, useState } from "react";

function Admin() {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const addProduct = () => {
    fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        price,
        image: "https://via.placeholder.com/200",
        description: "Admin added product"
      })
    })
      .then(res => res.json())
      .then(p => setProducts([...products, p]));
  };

  const deleteProduct = (id) => {
    fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE"
    }).then(() =>
      setProducts(products.filter(p => p._id !== id))
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      <input
        placeholder="Product Name"
        className="border p-2 mr-2"
        onChange={e => setTitle(e.target.value)}
      />
      <input
        placeholder="Price"
        className="border p-2 mr-2"
        onChange={e => setPrice(e.target.value)}
      />
      <button
        onClick={addProduct}
        className="bg-green-600 text-white px-4 py-2"
      >
        Add Product
      </button>

      <div className="mt-6">
        {products.map(p => (
          <div key={p._id} className="flex justify-between border p-2 mb-2">
            <span>{p.title} - ₹{p.price}</span>
            <button
              onClick={() => deleteProduct(p._id)}
              className="text-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
