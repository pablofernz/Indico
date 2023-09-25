const clientSchema = require("../models/Client")

const addClient = ({ name, lastname, email, password, image, reviews }, res) => {
    const newClient = clientSchema({ name, lastname, email, password, image, reviews })
    newClient.save()
        .then(() => { () => console.log("Usuario creado con éxito") })
        .catch(() => { () => console.log("Tuvimos problemas al crear el usuario") })
    return newClient
}

module.exports = addClient