import React, { useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "@/hi";

const HomeX = () => {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "",
    page: 1,
    limit: 2,
  });

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setFilters({ ...filters, page: 1 });

    try {
      const response = await axios.get(`${base_url}/products`, {
        params: filters,
      });
      setFilteredProducts(response.data.filteredProducts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSort = async (sortBy) => {
    setFilters({ ...filters, sortBy, page: 1 });

    try {
      const response = await axios.get(`${base_url}/products`, {
        params: filters,
      });
      setFilteredProducts(response.data.filteredProducts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePagination = async (newPage) => {
    console.log("Clicked page:", newPage);
    setFilters({ ...filters, page: newPage });

    try {
      const response = await axios.get("/api/products/filter", {
        params: { ...filters, page: newPage },
      });
      setFilteredProducts(response.data.filteredProducts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${base_url}/products`, {
          params: filters,
        });
        setFilteredProducts(response.data.filteredProducts);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [filters]);

  return (
    <div className="container my-6 mx-5">
      {/* Filter UI */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search..."
            className="p-2 border"
          />
          <input
            type="text"
            name="category"
            value={filters.category}
            onChange={handleChange}
            placeholder="Category"
            className="p-2 border"
          />
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="Min Price"
            className="p-2 border"
          />
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="Max Price"
            className="p-2 border"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Search
          </button>
        </div>
      </form>

      {/* Sort UI */}
      <div className="mb-4">
        <label className="mr-2">Sort By:</label>
        <select
          name="sortBy"
          value={filters.sortBy}
          onChange={(e) => handleSort(e.target.value)}
          className="p-2 border"
        >
          <option value="">--Select--</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
      </div>

      {/* Display filteredProducts */}
      <div>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="border p-4 mb-4">
              <h2>{product.name}</h2>
              <p>Category: {product.category}</p>
              <p>Price: {product.price}</p>
            </div>
          ))
        ) : (
          <h1>No Product found</h1>
        )}
      </div>

      {/* Pagination UI */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePagination(filters.page - 1)}
          className={`mx-2 px-3 py-2 border ${filters.page === 1 ? "bg-gray-300" : ""}`}
          disabled={filters.page === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePagination(page)}
            className={`mx-2 px-3 py-2 border ${
              filters.page === page ? "bg-blue-500 text-white" : ""
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePagination(filters.page + 1)}
          className={`mx-2 px-3 py-2 border ${
            filters.page === totalPages ? "bg-gray-300" : ""
          }`}
          disabled={filters.page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomeX;
