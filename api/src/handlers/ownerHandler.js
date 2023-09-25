const Owner = require('../models/Owner');
const addOwner = require("../controllers/ownerCreator")

const createOwner = async (req, res) => {
    const { name, lastname, email, password, image } = req.body

    try {
        const owners = await Owner.find();
        if (owners.length < 2) {
            const existingOwner = await Owner.findOne({
                name: name,
                lastname: lastname,
                email: email,
                password: password
            });

            if (existingOwner) {
                return res.status(400).json({ error: 'Ya existe una cuenta con este correo.' });
            } else {
                const newOwner = addOwner({ name, lastname, email, password, image })
                return res.status(200).json(newOwner)
            }
        } else {
            return res.status(400).send("Ésta página ha excedido el número máximo de dueños")
        }

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const seeOwners = async (req, res) => {
    const owners = await Owner.find();
    try {
        if (owners.length) {
            return res.status(200).json(owners)
        } else {
            throw Error("Aun no hay dueños")
        }
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const updateOwner = async (req, res) => {
    const { id } = req.params
    const { name, lastname, email, password, image } = req.body
    const updateData = { name, lastname, email, password, image }

    try {
        const oldOwner = await Owner.findById(id)
        const updatedOwner = await Owner.findByIdAndUpdate(id, updateData, { new: true })

        const hasChanged = (
            updatedOwner.name !== oldOwner.name ||
            updatedOwner.lastname !== oldOwner.lastname ||
            updatedOwner.email !== oldOwner.email ||
            updatedOwner.password !== oldOwner.password ||
            updatedOwner.image !== oldOwner.image
        )

        if (!hasChanged) {
            return res.status(400).send("No se realizaron cambios")
        } else {
            return res.status(200).send("Información actualizada")
        }

    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const deleteOwner = async (req, res) => {
    const { id } = req.params

    try {
        await Owner.deleteOne({ _id: id })
        return res.status(200).send("Dueño eliminado")

    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = {
    createOwner,
    updateOwner,
    seeOwners,
    deleteOwner
}