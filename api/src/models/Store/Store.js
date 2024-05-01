const mongoose = require("mongoose")
const reviewsSchema = require("../Reviews").schema
const purchaseSchema = require("../Store/Purchase").schema
const clientSchema = require("../Client").schema

const storeSchema = mongoose.Schema({
    purchases: [purchaseSchema],
    reviews: [reviewsSchema],
    clients: [clientSchema]
}, {
    versionKey: false // Establecer versionKey en false para eliminar la propiedad "__v"
})


module.exports = mongoose.model("Store", storeSchema)