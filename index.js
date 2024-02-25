import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { ProductModel } from "./bootstrap.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome To Marketplace" });
});

app.get("/api/products", async (req, res) => {
  const query = req.query;
  let products;
  if (query.name) {
    products = await ProductModel.find({
      name: { $regex: query.name, $options: "i" },
    });
  } else {
    products = await ProductModel.find();
  }
  res.json(products);
});

app.get("/api/products/:id", async (req, res) => {
  const product = await ProductModel.findById(req.params.id);
  res.json(product);
});

app.post("/api/products", async (req, res) => {
  const { name, price, quantity, description, category } = req.body;
  const product = await ProductModel.create({
    name,
    price,
    quantity,
    description,
    category,
  });

  res.json(product);
});

app.put("/api/products/:id", async (req, res) => {
  const updatedProduct = await ProductModel.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  res.json(updatedProduct);
});

app.delete("/api/products/:id", async (req, res) => {
  await ProductModel.deleteOne({ _id: req.params.id });
  res.json({ message: `deleted product with id: ${req.params.id}` });
});

app.delete("/api/products", async (req, res) => {
  await ProductModel.deleteMany();
  res.json({ message: "deleted all products" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
