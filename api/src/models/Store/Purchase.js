const mongoose = require("mongoose")

const payDataSchema = mongoose.Schema({
    food: {
        type: Number,
    },
    service: {
        type: Number,
    },
    allTogether: {
        type: Number,
    }
})
const purchaseSchema = mongoose.Schema({
    orders: {
        type: Array,
        required: true
    },
    payData: {
        type: payDataSchema,
    },

    date: {
        type: String,
        required: true
    }
}, {
    versionKey: false // Establecer versionKey en false para eliminar la propiedad "__v"
})

module.exports = mongoose.model("Purchase", purchaseSchema)