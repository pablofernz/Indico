const mongoose = require("mongoose")
const reviewsSchema = require("../Reviews").schema
const purchaseSchema = require("../Store/Purchase").schema
const Client = require("../Client")

const storeSchema = mongoose.Schema({
    reviews: [reviewsSchema],
    clients: [{
        type: Schema.Types.ObjectId,
        ref: "Client"
    }]
}, {
    versionKey: false // Establecer versionKey en false para eliminar la propiedad "__v"
})


module.exports = mongoose.model("Store", storeSchema)