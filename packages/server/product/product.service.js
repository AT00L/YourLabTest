import { ObjectId } from 'mongodb'
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

export async function getProducts({ category, brandIds, grouped = true }) {
    const db = await mongoInatialize()
    const query = {}
    if (category) query.category = category
    if (brandIds && brandIds.length > 0) {
        query['brand.brandId'] = { $in: brandIds }
    }

    const products = await db.collection("products").find(query).toArray()

    if (!grouped) {
        return {
            status: true,
            data: products
        }
    }

    // Group products by brand
    const brandMap = {}
    for (const product of products) {
        const key = product.brand.brandId
        if (!brandMap[key]) {
            brandMap[key] = {
                brandId: product.brand.brandId,
                displayName: product.brand.name,
                products: []
            }
        }
        brandMap[key].products.push(product.name)
    }

    return {
        status: true,
        data: Object.values(brandMap)
    }
}

export async function deleteProducts(ids) {
    const db = await mongoInatialize()
    const objectIds = ids.map(id => new ObjectId(id))
    const result = await db.collection("products").deleteMany({ _id: { $in: objectIds } })
    return {
        status: true,
        message: `${result.deletedCount} product(s) deleted successfully`
    }
}

export async function updateProduct({ id, name, category, brandId }) {
    const db = await mongoInatialize()
    const brand = await db.collection("brands").findOne({ brandId, category })
    if (!brand) {
        return {
            status: false,
            message: "Brand not found"
        }
    }
    await db.collection("products").updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                name,
                category,
                brand: {
                    brandId: brand.brandId,
                    name: brand.name
                },
                updatedAt: new Date()
            }
        }
    )
    return {
        status: true,
        message: "Product updated successfully"
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

export async function getCategories() {
    const db = await mongoInatialize()
    const categories = await db.collection("products").distinct("category")
    return {
        status: true,
        data: categories
    }
}

export async function voteProduct(productId) {
    const db = await mongoInatialize()
    const result = await db.collection("products").updateOne(
        { _id: new ObjectId(productId) },
        { $inc: { votes: 1 } }
    )
    if (result.matchedCount === 0) {
        return { status: false, message: "Product not found" }
    }
    return { status: true, message: "Vote recorded" }
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
