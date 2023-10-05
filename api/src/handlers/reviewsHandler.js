const Client = require('../models/Client');


const seeReviews = async (req, res) => {
    try {
        const allClients = await Client.find();
        const reviews = allClients.filter((client) => client.reviews.length > 0)

        const reviewClients = reviews.map((cliente) => ({
            name: cliente.name,
            lastname: cliente.lastname,
            image: cliente.image,
            reviews: cliente.reviews
        }))

        if (reviewClients) {
            return res.status(200).json(reviewClients)
        } else {
            return res.status(400).send("No existen reseñas")
        }
    } catch (error) {
        return res.status(400).json(error.message)
    }
}


module.exports = {
    seeReviews
}