const mongoose = require("mongoose")
const reviewsSchema = require("./Reviews").schema
const purchaseSchema = require("./Store/Purchase").schema
const bcrypt = require("bcrypt")

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
        required: true
    },
    image: {
        type: String,
        default: 'https://www.texture-fabrics.com/content/images/thumbs/0048095_cayman-seagreen.jpeg'
    },
    role: {
        type: String,
        default: "Client"
    },
    purchases: [purchaseSchema],
    reviews: [reviewsSchema],
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