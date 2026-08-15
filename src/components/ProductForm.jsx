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
    <form
  onSubmit={handleSubmit}
  className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-lg"
>
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
  Add New Product
</h2>

      <label className="mb-2 block text-sm font-medium text-gray-700">
  Product Name
</label>

      <input
  type="text" 
  name="title" 
  value={formData.title} 
  onChange={handleChange} 
  placeholder="Enter product name" 
  required 
  className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
/>

        <label className="mb-2 block text-sm font-medium text-gray-700">
  Price
</label>

      <input 
  type="number" 
  name="price" 
  value={formData.price} 
  onChange={handleChange} 
  placeholder="Enter price" 
  required 
  className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
/>

     <label className="mb-2 block text-sm font-medium text-gray-700">
  Image URL
</label>

      <input 
  type="text" 
  name="image" 
  value={formData.image} 
  onChange={handleChange} 
  placeholder="Enter image URL" 
  required 
  className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
/>

<label className="block mb-2 text-sm font-medium text-gray-700">
  Category
</label>

      <input
  className="w-full rounded-lg border border-gray-300 px-4 py-2 mb-4 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
  type="text"
  name="category"
  value={formData.category}
  onChange={handleChange}
  placeholder="e.g. Dresses"
  required
/>
     <label className="block mb-2 text-sm font-medium text-gray-700">
  Description
</label>

      <textarea
  className="w-full rounded-lg border border-gray-300 px-4 py-2 mb-4 min-h-[120px] resize-y focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
  name="description"
  value={formData.description}
  onChange={handleChange}
  placeholder="Enter product description"
  required
/>
     <button
  className="w-full rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
  type="submit"
>
  Add Product
</button>
    </form>
  );
}

export default ProductForm;