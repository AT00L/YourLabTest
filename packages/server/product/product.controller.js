import express from "express";
import { addProduct, getBrandByCategory, createBrand, getProducts, deleteProducts, updateProduct, getCategories, voteProduct } from "./product.service.js";
const router = express.Router();

router.use(express.json())

router.post("/getProducts", async (req, res) => {
    const { category, brandIds, grouped } = req.body
    const response = await getProducts({ category, brandIds, grouped })
    res.json(response)
})

router.post("/deleteProducts", async (req, res) => {
    const { ids } = req.body
    const response = await deleteProducts(ids)
    res.json(response)
})

router.post("/updateProduct", async (req, res) => {
    const { id, name, category, brandId } = req.body
    const response = await updateProduct({ id, name, category, brandId })
    res.json(response)
})

router.post("/addProduct", async (req, res) => {
    const { name, category, brandId } = req.body
    const response = await addProduct({ name, category, brandId })
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

router.get("/getCategories", async (req, res) => {
    const response = await getCategories()
    res.json(response)
})

router.post("/voteProduct", async (req, res) => {
    const { productId } = req.body
    const response = await voteProduct(productId)
    res.json(response)
})

export default router