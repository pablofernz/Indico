const Menu = require('../models/Menu');
const foodAdd = require('../controllers/foodAdder');

const getMenu = async (req, res) => {
    const { search, type } = req.query

    try {
        const menu = await Menu.find();

        if (search || type) {
            if (type) {
                const searchedType = menu.filter((menus) => menus.type.toLowerCase().includes(type.toLowerCase()))

                if (!searchedType.length) throw Error("No pudimos encontrar este tipo de comida :(")
                else return res.status(200).json(searchedType)

            } else {
                if (search) {
                    const searchedFood = menu.filter((menus) => menus.title.toLowerCase().includes(search.toLowerCase()))

                    if (!searchedFood.length) throw Error("No encontramos esta comida :(")
                    else return res.status(200).json(searchedFood)

                } else {
                    return res.status(200).json(menu);
                }
            }
        } else return res.status(200).json(menu);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

const addFood = async (req, res) => {
    const { title, description, price, discount, image, type } = req.body

    try {
        const existingMenu = await Menu.findOne({
            title: title,
            description: description,
            image: image
        });

        if (existingMenu) {
            return res.status(400).json({ error: 'Este menú ya existe' });
        } else {
            const add = foodAdd({ title, description, price, discount, image, type })
            return res.status(200).json(add)
        }

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

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
    getMenu,
    addFood,
    updateFood,
    deleteFood
}