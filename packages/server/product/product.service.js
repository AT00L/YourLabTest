import { mongoInatialize } from "../server.js"

export async function addProduct({ name, category, brandId }) {
    const db = await mongoInatialize()
    const brand = await db.collection("brands").findOne({ brandId, category })
    if (!brand) {
        return {
            status: false,
            message: "Brand not found"
        }
    }
    await db.collection("products").insertOne({
        name,
        category,
        brand: {
            brandId: brand.brandId,
            name: brand.name
        },
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

function toBrandId(str) {
    return str.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')
}

export async function createBrand({ name, category }) {
    const db = await mongoInatialize()
    const brandName = toTitleCase(name.trim())
    const brandId = toBrandId(name.trim())
    const existing = await db.collection("brands").findOne({ brandId, category })
    if (existing) {
        return {
            status: false,
            message: "Brand already exists for this category"
        }
    }
    await db.collection("brands").insertOne({
        name: brandName,
        brandId,
        category,
        createdAt: new Date()
    })
    return {
        status: true,
        message: "Brand created successfully"
    }
}
