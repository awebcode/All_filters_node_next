// index.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");
const cors=require("cors")
const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
const db = async(req, res)=> {
    try {
      await mongoose.connect(
        "mongodb+srv://Asikur:12345@cluster0.txiokqr.mongodb.net/FilteringApi23",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
        console.log("Mongodb Connected")
    } catch (error) {
        console.log("Connection error in mongodb")
    }
}

app.use(bodyParser.json());
app.use(cors({origin:"http://localhost:3000"}))
// Use product routes
app.use("/products", productRoutes);
db();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
