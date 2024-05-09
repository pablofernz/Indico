const Menu = require('../models/Menu');
const Client = require('../models/Client');
const Review = require('../models/Reviews');
const Purchase = require('../models/Store/Purchase');
const jwt = require("jsonwebtoken")
require("dotenv").config()


const secret = process.env.SECRET


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

const addReview = async (req, res) => {
    const { id } = req.params
    const { text, stars } = req.body
    const clientID = id

    try {
        const client = await Client.findById(clientID)

        if (client) {
            const existingReview = client.reviews.filter((review) => review.text == text)

            if (existingReview.length) {
                return res.status(400).send("Ya tienes una reseña parecida, sabemos que puedes ser mucho más creativo :)")

            } else {
                const review = new Review({ text, stars });
                client.reviews.push(review);

                await client.save();
                res.status(201).json(review);
            }
        } else {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const myReviews = async (req, res) => {
    const { id } = req.params
    try {
        const client = await Client.findById(id)

        if (client) {
            const reviews = client.reviews
            if (reviews.length) {
                res.status(201).json(reviews);
            } else {
                return res.status(404).send('No tienes reseñas, empieza a pedir comida!')

            }
        } else {
            return res.status(404).send('Cliente no encontrado')
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const deleteReview = async (req, res) => {
    const { id, reviewID } = req.params;

    try {
        const client = await Client.findById(id);

        if (client) {
            const reviewToDelete = client.reviews.find(review => review._id == reviewID);

            if (reviewToDelete) {
                client.reviews.pull({ _id: reviewID });

                await client.save();
                res.status(200).send('Reseña eliminada');
            } else {
                return res.status(400).send("Esta reseña ya no existe");
            }
        } else {
            return res.status(404).send('Cliente no encontrado');
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
}


const purchaseFood = async (req, res) => {
    const { data } = req.body
    const authorization = req.headers.authorization
    const order = req.body

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

        if (authorization && authorization.toLowerCase().startsWith('bearer')) {
            token = authorization.split(" ")[1]
            const decodedToken = jwt.verify(token, secret)

            if (decodedToken) {
                if (Date.now() > decodedToken.exp) {
                    return res.status(401).send("Token expirado, inicia sesión denuevo")
                } else {

                    const client = await Client.findById(decodedToken.tokenData.id)

                    if (client) {
                        const foodOrder = {
                            order: order,
                            date: getDay(),

                        }
                        const purchase = new Purchase(foodOrder);
                        client.purchases.push(purchase);

                        await client.save();
                        return res.status(200).json(purchase);

                    } else {
                        return res.status(404).send('Cliente no encontrado');
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
module.exports = {
    getMenu,
    addReview,
    myReviews,
    deleteReview,
    purchaseFood
}