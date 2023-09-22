// routes/productRoutes.js

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getFilteredProducts);
router.post("/", productController.createProduct);

module.exports = router;
