const Client = require('../models/Client');
const addClient = require("../controllers/clientCreator")

const createClient = async (req, res) => {
    const { name, lastname, email, password, image } = req.body

    try {
        const existingClient = await Client.findOne({
            name: name,
            lastname: lastname,
            email: email,
            password: password
        });

        if (existingClient) {
            return res.status(400).json({ error: 'Ya existe una cuenta con este correo. Inicia sesión' });
        } else {
            const newClient = addClient({ name, lastname, email, password, image })
            return res.status(200).json(newClient)
        }

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const updateClient = async (req, res) => {
    const { id } = req.params
    const { name, lastname, email, password, image } = req.body
    const updateData = { name, lastname, email, password, image }

    try {
        const oldClient = await Client.findById(id)
        const updatedClient = await Client.findByIdAndUpdate(id, updateData, { new: true })

        const hasChanged = (
            updatedClient.name !== oldClient.name ||
            updatedClient.lastname !== oldClient.lastname ||
            updatedClient.email !== oldClient.email ||
            updatedClient.password !== oldClient.password ||
            updatedClient.image !== oldClient.image
        )

        if (!hasChanged) {
            return res.status(400).send("No se realizaron cambios")
        } else {
            return res.status(200).send("Información de usuario actualizada")
        }

    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const deleteClient = async (req, res) => {
    const { id } = req.params

    try {
        await Client.deleteOne({ _id: id })
        return res.status(200).send("Usuario eliminado")

    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = {
    createClient,
    updateClient,
    deleteClient
}