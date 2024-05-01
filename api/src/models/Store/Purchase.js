const mongoose = require("mongoose")

const purchaseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    order: {
        type: Array,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, {
    versionKey: false // Establecer versionKey en false para eliminar la propiedad "__v"
})

module.exports = mongoose.model("Purchase", purchaseSchema)