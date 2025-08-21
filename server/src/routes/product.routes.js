import { Router } from "express";
import { addProduct, getProducts } from "../controllers/product.controller.js";
import { authenticate } from "./../middlewares/auth.js";

const Productrouter = Router();

Productrouter.post("/products", authenticate, addProduct);
Productrouter.get("/products", authenticate, getProducts);

export default Productrouter;
