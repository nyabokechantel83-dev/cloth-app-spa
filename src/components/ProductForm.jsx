import { useState } from "react";
import { useShop } from "../context/ShopContext";

function ProductForm() {
  const { addProduct } = useShop();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    image: "",
    category: "",
    description: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newProduct = {
      id: Date.now(),
      title: formData.title,
      price: Number(formData.price),
      image: formData.image,
      category: formData.category,
      description: formData.description,
    };

    addProduct(newProduct);

    setFormData({
      title: "",
      price: "",
      image: "",
      category: "",
      description: "",
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Product</h2>

      <label>
        Product Name
      </label>

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Enter product name"
        required
      />

      <label>
        Price
      </label>

      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Enter price"
        required
      />

      <label>
        Image URL
      </label>

      <input
        type="text"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Enter image URL"
        required
      />

      <label>
        Category
      </label>

      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="e.g. Dresses"
        required
      />

      <label>
        Description
      </label>

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Enter product description"
        required
      />

      <button type="submit">
        Add Product
      </button>
    </form>
  );
}

export default ProductForm;