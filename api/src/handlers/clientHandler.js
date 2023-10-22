const Client = require('../models/Client');
const addClient = require("../controllers/clientCreator")
const bcrypt = require("bcrypt")

const createClient = async (req, res) => {
    const { name, lastname, email, password, image, reviews } = req.body

    try {
        if (name && lastname && email && password) {

            const existingClient = await Client.findOne({
                email: email
            });

            if (existingClient) {
                return res.status(400).send('Ya existe una cuenta con este correo. Inicia sesión');
            } else {
                const newClient = addClient({ name, lastname, email, password, image, reviews })
                return res.status(200).send("Cuenta creada")
            }
        } else {
            return res.status(400).send("Debes rellenar tus datos")
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

const clientLogin = async (req, res) => {
    const { email, password } = req.body

    try {
        if (!email && !password) return res.status(400).send("Debes ingresar datos")
        else {
            const existingClient = await Client.findOne({ email })

            if (existingClient) {
                const passwordsMatch = await bcrypt.compare(password, existingClient.password);

                if (passwordsMatch) {
                    return res.status(200).send(`Hola, ${existingClient.name}`)
                } else {
                    return res.status(400).send("La contraseña es incorrecta.");
                }
            } else {
                return res.status(400).send("No existe esta cuenta, registrate.")
            }
        }
    } catch (error) {
        return res.status(400).json(error.message)
    }
}


module.exports = {
    createClient,
    updateClient,
    deleteClient,
    clientLogin
}