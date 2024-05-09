const mongoose = require("mongoose")

const purchaseSchema = mongoose.Schema({
    order: {
        type: Array,
        required: true
    },
    date: {
        type: String,
        required: true
    }
}, {
    versionKey: false // Establecer versionKey en false para eliminar la propiedad "__v"
})

module.exports = mongoose.model("Purchase", purchaseSchema)