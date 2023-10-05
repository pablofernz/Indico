const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const ownerSchema = mongoose.Schema({
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
    role: {
        type: String,
        default: "Owner"
    }
}, {
    versionKey: false // Establecer versionKey en false para eliminar la propiedad "__v"
})

ownerSchema.pre('save', async function (next) {
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
module.exports = mongoose.model("Owner", ownerSchema)