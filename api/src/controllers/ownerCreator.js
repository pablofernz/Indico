const ownerSchema = require("../models/Owner")

const addOwner = ({ name, lastname, email, password, image }, res) => {
    const newOwner = ownerSchema({ name, lastname, email, password, image })
    newOwner.save()
        .then(() => { () => console.log("Usuario creado con éxito") })
        .catch(() => { () => console.log("Tuvimos problemas al crear el usuario") })
    return newOwner
}

module.exports = addOwner