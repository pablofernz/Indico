const mongoose = require("mongoose")

const favoriteFoodsSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
}, {
    versionKey: false // Establecer versionKey en false para eliminar la propiedad "__v"
})

module.exports = mongoose.model("FavoriteFoods", favoriteFoodsSchema)