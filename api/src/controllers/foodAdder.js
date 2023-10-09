const menuSchema = require("../models/Menu")

const foodAdd = async ({ title, description, price, discount, image, type }) => {
    try {
        const newFood = new menuSchema({ title, description, price, discount, image, type });
        const savedFood = await newFood.save();
        console.log("Creado exitosamente");
        return savedFood;
    } catch (error) {
        console.error("Error al crear", error);
        throw error; // Lanza el error para que se maneje en la función llamante
    }
};


module.exports = foodAdd