const menuSchema = require("../models/Menu")

const foodAdd = ({ title, description, price, discount, image, type }, res) => {
    const newFood = menuSchema({ title, description, price, discount, image, type })
    newFood.save()
        .then(() => { () => console.log("Food added to database") })
        .catch(() => { () => console.log("We have problems to add this food to database") })
    return newFood
}

module.exports = foodAdd