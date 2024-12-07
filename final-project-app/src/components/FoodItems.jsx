import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import FoodCard from "./FoodCard";
import axios from "axios";
import { useSelector } from 'react-redux';
const FoodItems = () => {
  const handleToast = (name) => toast.success(`Added ${name} to cart`);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { categories } = useSelector((state) => state.allCart);
  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("http://localhost:3002/getproducts");
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data); // Initialize filtered products
      console.log(categories);
    }
    fetchProducts();
  }, []);

  const filterProducts = async () => {
    let filtered = products;

    // Filter by category
    if (category) {
      try {
        console.log(category);
        const response = await axios.get(`http://localhost:3002/lunch?category=${category}`);
        filtered = response.data;
        // console.log(response.data); // Log response correctly
      } catch (err) {
        // console.log(err);
        // toast.error("Server Error");
      }
    }

    // Filter by price range
    if (minPrice) {
      filtered = filtered.filter((product) => product.price >= Number(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter((product) => product.price <= Number(maxPrice));
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
    console.log('first')
  }, [category, minPrice, maxPrice, searchQuery]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="py-5">
        <span className="flex items-center justify-center lg:w-full lg:h[100vw] lg:my-14">
          <h1 className="text-2xl font-bold lg:text-5xl">
            Find the <span className="font-serif text-yellow">Best</span> food
          </h1>
        </span>

        {/* Filter Section */}
        <div className="flex flex-wrap justify-center gap-5 mb-5">
          {/* Category Filter */}
          <select
            className="p-2 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Products</option>
            {
              categories.map((item,index) => {
                return(
                  <option key={index} value={item.food_catname}>{item.food_catname}</option>
                );
                
              })
            }
            {/* <option value="">All Categories</option>
            <option value="Beverages">Beverages</option>
            <option value="Snacks">Snacks</option>
            <option value="Desserts">Desserts</option>
            <option value="Main Course">Main Course</option> */}
            {/* Add more categories as needed */}
          </select>

          {/* Price Range Filter */}
          <input
            type="number"
            className="p-2 border rounded"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            className="p-2 border rounded"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />

          {/* Search Box */}
          <input
            type="text"
            className="p-2 border rounded"
            placeholder="Search products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Products Display Section */}
        <div className="flex flex-wrap justify-center gap-10 lg:mx-20">
          {filteredProducts.map((food, index) => (
            <FoodCard key={index} data={food} handleToast={handleToast} />
          ))}
        </div>
      </div>
    </>
  );
};

export default FoodItems;
