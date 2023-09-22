import React, { useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "@/hi";

const ProductFilter = ({ setData, page, setPage, limit, setLimit }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const response = await axios.get(`${base_url}/products`, {
          params: { search, category, minPrice, maxPrice, page, limit },
        });
        setData(response.data.filteredProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFilteredProducts();
  }, [search, category, minPrice, maxPrice, page, limit]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };

  return (
    <div className="p-4 border">
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border mb-2"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 border mb-2"
      >
        <option value="">Select Category</option>
        <option value="Shoe">Shoe</option>
        <option value="Food">Food</option>
        <option value="Shirt">Shirt</option>
      </select>
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="p-2 border mb-2"
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="p-2 border mb-2"
      />
      <div className="flex justify-between mt-4">
        <div>
          <label className="mr-2">Results per page:</label>
          <select
            value={limit}
            onChange={(e) => handleLimitChange(e.target.value)}
            className="p-2 border"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
        <div>
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 mr-2 bg-blue-500 text-white rounded"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(page + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
