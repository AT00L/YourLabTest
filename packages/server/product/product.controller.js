import express from "express";
import { getBrandCategoriesWise } from "./product.service";
const router = express.Router();

router.post("/addProduct",(req,res)=>{
    console.log(req)
    res.json({})
})

router.post("/getBrandByCategory",async (req,res)=>{
    const response = await getBrandByCategory({...req.body})
    res.json(response)
})

export default router