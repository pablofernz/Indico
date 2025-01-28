const Client = require('../models/Client');
const addClient = require("../controllers/clientCreator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const cloudinary = require("cloudinary");
const authAccess = require('../controllers/thirdPartyAccess');

const secret = process.env.SECRET

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createClient = async (req, res) => {
    const { name, lastname, email, password, image, reviews } = req.body

    const getDay = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const hours = String(today.getHours()).padStart(2, '0');
        const minutes = String(today.getMinutes()).padStart(2, '0');
        const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}`;
        return formattedDateTime
    }
    try {
        if (!name && !lastname && !email && !password) return res.status(400).send("Debes rellenar tus datos")

        const existingClient = await Client.findOne({
            email: email
        });

        if (existingClient?.auth?.authMethod === "google") return res.status(400).send("Correo vinculado a una cuenta de Google. Inicia sesión.")

        if (existingClient) return res.status(400).send('Ya existe una cuenta con este correo. Inicia sesión');



        const newClient = await addClient({ name, lastname, email, password, image, reviews, createdAt: getDay() })

        const tokenData = {
            name: newClient.name,
            lastname: newClient.lastname,
            id: newClient._id,
            email: newClient.email,
            createdAt: newClient.createdAt
        }

        const token = jwt.sign(
            {
                tokenData,
                exp: Date.now() + 60 * 1000 * 60 * 24 * 7
            }, secret
        )
        return res.status(200).json({ name: newClient.name, email: newClient.email, createdAt: newClient.createdAt, token: token })



    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const updateClient = async (req, res) => {
    const { id } = req.params
    const { name, lastname, email, newPassword, image } = req.body
    let token = null
    const authorization = req.get('authorization')

    const hashPassword = async () => {
        const saltRounds = 10;
        const hash = await bcrypt.hash(newPassword, saltRounds);
        return hash;
    }

    try {
        if (authorization && authorization.toLowerCase().startsWith('bearer')) {
            token = authorization.split(" ")[1]
            const decodedToken = jwt.verify(token, secret)

            if (decodedToken) {
                if (Date.now() > decodedToken.exp) {
                    return res.status(401).send("Token expirado")
                } else {
                    const result = await cloudinary.uploader.upload(image, {
                        folder: 'Projects Images/Indico/Clients Photos',
                        resource_type: 'image',
                        public_id: `${name}_${lastname}`
                    });
                    let imageUrl = result.secure_url;

                    const quality = "upload/q_0/";
                    let modifiedUrl = imageUrl
                        .split("upload/")
                        .join(quality)
                        .replace(/\.(jpg|png|jfif)$/, ".webp");

                    const oldClient = await Client.findById(id)
                    const updateData = { name, lastname, email, password: newPassword ? await hashPassword() : oldClient.password, image: modifiedUrl }

                    const updatedClient = await Client.findByIdAndUpdate(id, updateData, { new: true })

                    const hasChanged = (
                        updatedClient.name !== oldClient.name ||
                        updatedClient.lastname !== oldClient.lastname ||
                        updatedClient.email !== oldClient.email ||
                        updatedClient.password !== oldClient.password ||
                        updatedClient.image !== oldClient.image
                    )

                    if (!hasChanged) {
                        return res.status(400).send("No se realizaron cambios")
                    } else {
                        return res.status(200).send("Información de usuario actualizada")
                    }
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

const deleteClient = async (req, res) => {
    const { id } = req.params
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

                    await Client.deleteOne({ _id: id })
                    return res.status(200).send("Usuario eliminado")
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

const clientLogin = async (req, res) => {
    const { email, password } = req.body

    try {
        if (!email && !password) return res.status(400).send("Debes ingresar datos")
        else {
            const existingClient = await Client.findOne({ email })

            if (!existingClient) return res.status(400).send("No existe esta cuenta, registrate.")

            if (existingClient.auth && existingClient.auth.authMethod === "google") return res.status(400).send("Correo vinculado a una cuenta de Google. Inicia sesión.")

            const passwordsMatch = await bcrypt.compare(password, existingClient.password);

            if (!!passwordsMatch) return res.status(400).send("La contraseña es incorrecta.");
            const tokenData = {
                name: existingClient.name,
                lastname: existingClient.lastname,
                id: existingClient._id,
                email: existingClient.email
            }

            const token = jwt.sign(
                {
                    tokenData,
                    exp: Date.now() + 60 * 1000 * 60 * 24 * 7
                }, secret
            )
            return res.status(200).json({ name: existingClient.name, email: existingClient.email, token: token })


        }
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const thirdPartyAccess = async (req, res) => {
    const { email, auth, image, name, lastname } = req.body
    const getDay = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const hours = String(today.getHours()).padStart(2, '0');
        const minutes = String(today.getMinutes()).padStart(2, '0');
        const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}`;
        return formattedDateTime
    }

    try {
        const result = await authAccess({ email, image, name, lastname, createdAt: getDay(), auth })
        return res.status(200).json(result)

    } catch (error) {
        return { success: false, status: 400, message: error.message || "Error log in" };
    }
}


module.exports = {
    createClient,
    updateClient,
    deleteClient,
    clientLogin,
    thirdPartyAccess
}