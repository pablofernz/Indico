const reviewsSchema = require("../models/Reviews")

const reviewCreator = ({ name, lastname, text, stars }, res) => {
    const newReview = reviewsSchema({ name, lastname, text, stars })
    newReview.save()
        .then(() => { () => console.log("Usuario creado con éxito") })
        .catch(() => { () => console.log("Tuvimos problemas al crear el usuario") })
    return newReview
}

module.exports = reviewCreator