import { mongoInatialize } from "../server.js";

export async function addProduct({ name, category, brand }) {
    const db = await mongoInatialize()
    await db.collection("products").insertOne({
        name,
        category,
        brand,
        createdAt: new Date()
    })
    return {
        status: true,
        message: "Product added successfully"
    }
}

export async function getBrandByCategory(category) {
    const db = await mongoInatialize()
    const brands = await db.collection("brands").find({ category }).toArray()
    return {
        status: true,
        data: brands
    }
}

function toTitleCase(str) {
    return str.toLowerCase().split(' ').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
}

export async function createBrand({ name, category }) {
    const db = await mongoInatialize()
    const brandName = toTitleCase(name.trim())
    const existing = await db.collection("brands").findOne({ name: brandName, category })
    if (existing) {
        return {
            status: false,
            message: "Brand already exists for this category"
        }
    }
    await db.collection("brands").insertOne({ name: brandName, category, createdAt: new Date() })
    return {
        status: true,
        message: "Brand created successfully"
    }
}
