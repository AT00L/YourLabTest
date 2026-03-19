import express from "express";
import { addProduct, getBrandByCategory, createBrand } from "./product.service.js";
const router = express.Router();

router.use(express.json())

router.post("/addProduct", async (req, res) => {
    const { name, category, brand } = req.body
    const response = await addProduct({ name, category, brand })
    res.json(response)
})

router.post("/getBrandByCategory", async (req, res) => {
    const { category } = req.body
    const response = await getBrandByCategory(category)
    res.json(response)
})

router.post("/createBrand", async (req, res) => {
    const { name, category } = req.body
    const response = await createBrand({ name, category })
    res.json(response)
})

export default router