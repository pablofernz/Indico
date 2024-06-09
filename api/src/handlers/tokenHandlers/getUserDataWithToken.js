require("dotenv").config()
const jwt = require("jsonwebtoken")
const Client = require("../../models/Client")
const secret = process.env.SECRET

const getUserDataWithToken = async (req, res) => {
    let token = null
    const authorization = req.get('authorization')


    try {

        if (authorization && authorization.toLowerCase().startsWith('bearer')) {
            token = authorization.split(" ")[1]
            const decodedToken = jwt.verify(token, secret)

            if (decodedToken) {
                if (Date.now() > decodedToken.exp) {
                    return res.status(401).send("Token expirado")
                } else {

                    const userData = await Client.findOne({
                        _id: decodedToken.tokenData.id
                    });

                    const userDataFiltered = {
                        id: userData.id,
                        name: userData.name,
                        lastname: userData.lastname,
                        email: userData.email,
                        image: userData.image,
                        reviews: userData.reviews,
                        purchases: userData.purchases,
                        createdAt: userData.createdAt
                    }
                    // return res.status(200).json({ message: "El token es válido", data: userData })
                    return res.status(200).json(userDataFiltered)
                }
            } else {
                return res.status(400).send("Token perdido o invalido")
            }
        } else {
            return res.status(401).send("No autorizado")
        }

    } catch (error) {
        return res.status(400).json(error.message)
    }
}


module.exports = getUserDataWithToken