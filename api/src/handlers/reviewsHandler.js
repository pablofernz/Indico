const Client = require('../models/Client');


const seeReviews = async (req, res) => {
    try {
        const allClients = await Client.find();
        const reviewClients = allClients.filter((client) => client.reviews.length > 0)
        if (reviewClients) {
            return res.status(200).json(reviewClients)
        } else {
            return res.status(400).send("No existen reseñas")
        }
    } catch (error) {

    }
}


module.exports = {
    seeReviews
}