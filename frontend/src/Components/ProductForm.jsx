// src/components/ProductForm.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductForm = ({ isEdit }) => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (isEdit && id) {
      const fetchProduct = async () => {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        const product = response.data;
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setQuantity(product.quantity);
      };
      fetchProduct();
    }
  }, [isEdit, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("quantity", quantity);
    if (image) {
      formData.append("image", image);
    }

    try {
      if (isEdit) {
        await axios.put(`http://localhost:5000/api/products/${id}`, formData);
        alert("Product updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/products", formData);
        alert("Product created successfully!");
      }
      // Reset form after submission
      setName("");
      setPrice("");
      setDescription("");
      setQuantity("");
      setImage(null);
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error saving product!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Product Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type='number'
        placeholder='Price'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type='text'
        placeholder='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type='number'
        placeholder='Quantity'
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <input type='file' onChange={(e) => setImage(e.target.files[0])} />
      <button type='submit'>{isEdit ? "Update Product" : "Add Product"}</button>
    </form>
  );
};

export default ProductForm;
