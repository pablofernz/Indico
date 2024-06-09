require("dotenv").config()
const jwt = require("jsonwebtoken")


const secret = process.env.SECRET

const testToken = async (req, res) => {
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
                    return res.status(200).json({ message: "El token es válido", data: decodedToken })
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


module.exports = testToken