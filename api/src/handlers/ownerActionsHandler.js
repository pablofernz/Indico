const Menu = require('../models/Menu');
const Client = require('../models/Client');
const foodAdd = require('../controllers/foodAdder');

const seeClients = async (req, res) => {
    const { waiting } = req.query
    try {

        const clients = await Client.find();
        if (clients.length) {

            const clientsFilteredData = clients.map((client) => ({
                name: client.name,
                lastname: client.lastname,
                email: client.email,
                // image: client.image,
                reviews: client.reviews,
                purchases: client.purchases
            }))
            if (waiting == "amount") {
                return res.status(200).json(clientsFilteredData.length)
            } else {
                return res.status(200).json(clientsFilteredData)
            }
        } else {
            throw Error("No hay clientes")
        }
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const addFood = async (req, res) => {
    const { title, description, price, discount, image, type } = req.body;

    try {
        const existingMenu = await Menu.findOne({
            title: title,
            description: description,
            image: image
        });

        if (existingMenu) {
            return res.status(400).json({ error: 'Este menú ya existe' });
        } else {
            if (description.length > 100) {
                return res.status(400).json({ error: "La descripción no puede contener más de 100 caracteres" });
            } else {
                const add = await foodAdd({ title, description, price, discount, image, type }, res);
                return res.status(200).json(add);
            }
        }
    } catch (error) {
        console.error("Error adding food:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const updateFood = async (req, res) => {
    const { id } = req.params
    const { title, description, price, discount, image, type } = req.body
    const updateData = { title, description, price, discount, image, type }

    try {
        const oldFood = await Menu.findById(id)
        const updatedFood = await Menu.findByIdAndUpdate(id, updateData, { new: true })

        const hasChanged = (
            updatedFood.title !== oldFood.title ||
            updatedFood.description !== oldFood.description ||
            updatedFood.price !== oldFood.price ||
            updatedFood.discount !== oldFood.discount ||
            updatedFood.image !== oldFood.image ||
            updatedFood.type !== oldFood.type
        )

        if (!hasChanged) {
            return res.status(400).send("No se realizaron cambios")
        } else {
            return res.status(200).send("Información del platillo actualizada")
        }
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const deleteFood = async (req, res) => {
    const { id } = req.params

    try {
        await Menu.deleteOne({ _id: id })
        return res.status(200).send("Platillo eliminado")

    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = {
    seeClients,
    addFood,
    updateFood,
    deleteFood
}