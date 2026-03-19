import { mongoInatialize } from "../server";

export function getBrandByCategory(category) {
    const db = mongoInatialize()
    const data = db.collection("product").find({
        category
    }).toArray()
    return {
        status: true,
        data
    }
}
