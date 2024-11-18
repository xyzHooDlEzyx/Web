import express from "express";
import cors from "cors";
import {
  getProducts,
  getProduct,
  buildProductQuery,
  pool,
} from "../backend/database.js";

const app = express();
app.use(cors());

app.get("/products", async (req, res, next) => {
  try {
    const { search = "", sort = "" } = req.query;

    if (!search && !sort) {
      const products = await getProducts();
      return res.json(products);
    }

    const { query, params } = buildProductQuery(search, sort);

    console.log("Executing query:", query);
    console.log("With params:", params);

    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error("Error executing query:", error.message);
    next(error);
  }
});

app.get("/products/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await getProduct(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something Broke!");
});

app.listen(8080, () => {
  console.log("server is running on port 8080");
});
