import mongoose, { Schema } from "mongoose";
import "dotenv/config";

dbConnect().catch((err) => console.log(err));

async function dbConnect() {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.nrordbg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
  );
}

export const ProductModel = mongoose.model(
  "products",
  new Schema({
    name: String,
    price: Number,
    description: String,
    quantity: Number,
    category: String,
  })
);
