// controllers/productController.js

const Product = require("../models/Product");

const productController = {};
productController.createProduct = async (req, res) => {
  try {
    const newProuct = await Product.create(req.body);
    res.status(201).json({ message: "Product created", newProuct });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
productController.getFilteredProducts = async (req, res) => {
  try {
    const filters = {};
    const { search, category, minPrice, maxPrice, page, limit, sortBy } = req.query;

    // Search by 
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, "i");
      filters.$or = [
        { name: { $regex: searchRegex } },
        { category: { $regex: searchRegex } },
        
      ];
    }
    //also you should note that regex only work on string not number like price,rating
    // Filter by category
    if (category) {
      filters.category = category;
    }

    // Filter by price range
    if (minPrice && maxPrice) {
      filters.price = {
        $gte: parseFloat(minPrice),
        $lte: parseFloat(maxPrice),
      };
    } else if (minPrice) {
      filters.price = { $gte: parseFloat(minPrice) };
    } else if (maxPrice) {
      filters.price = { $lte: parseFloat(maxPrice) };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const query = Product.find(filters).skip(skip).limit(parseInt(limit));

    if (sortBy) {
      query.sort(sortBy);
    }

    const filteredProducts = await query.exec();
    const totalProducts = await Product.countDocuments(filters);
    const totalPages = Math.ceil(totalProducts / parseInt(limit));

    res.json({ totalPages, totalProducts, filteredProducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = productController;
