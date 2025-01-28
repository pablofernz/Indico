const mongoose = require("mongoose")
const reviewsSchema = require("./Reviews").schema
const purchaseSchema = require("./Store/Purchase").schema
const favoriteFoodsSchema = require("./Store/FavoriteFoods").schema
const bcrypt = require("bcrypt")

const authSchema = mongoose.Schema({
    authMethod: {
        type: String,
        default: "form"
    },
    uid: {
        type: String
    }
})

const clientSchema = mongoose.Schema({
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
    password: {
        type: String,
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/dnrprmypf/image/upload/q_auto:low/v1728605983/Projects%20Images/Indico/Clients%20Photos/User%20default%20photo.webp"
    },
    role: {
        type: String,
        default: "Client"
    },
    auth: authSchema,
    purchases: [purchaseSchema],
    reviews: [reviewsSchema],
    favoriteFoods: [favoriteFoodsSchema],
    createdAt: {
        type: String,
        required: true
    }
}, {
    versionKey: false // Establecer versionKey en false para eliminar la propiedad "__v"
})

clientSchema.pre('save', async function (next) {
    try {
        // Verificar si la contraseña ya está hasheada
        if (!this.isModified('password')) {
            return next();
        }

        // Generar un salt (valor aleatorio) para hashear la contraseña
        const salt = await bcrypt.genSalt(10);

        // Hashear la contraseña y reemplazarla en el campo 'password'
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
});

module.exports = mongoose.model("Client", clientSchema)