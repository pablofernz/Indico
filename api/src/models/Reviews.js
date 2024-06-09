const mongoose = require("mongoose")

const reviewsSchema = mongoose.Schema({
    text: {
        type: String,
        maxlength: 200,
        required: true
    },
    stars: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true
    },
    date: {
        type: String,
        required: true
    }
}, {
    versionKey: false // Establecer versionKey en false para eliminar la propiedad "__v"
})

module.exports = mongoose.model("Review", reviewsSchema)