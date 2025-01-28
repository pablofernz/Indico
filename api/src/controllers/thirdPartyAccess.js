const Client = require("../models/Client")
const clientSchema = require("../models/Client")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const secret = process.env.SECRET

const authAccess = async ({ email, image, name, lastname, createdAt, auth }) => {

    try {
        const existingClient = await Client.findOne({ "auth.uid": auth.uid })

        if (!existingClient) {
            const newUser = clientSchema({ email, image, name, lastname, createdAt, auth })
            return newUser.save()
                .then(() => {
                    const tokenData = {
                        uid: newUser.auth.uid,
                        email: newUser.email,
                        id: newUser._id
                    }

                    const token = jwt.sign(
                        {
                            tokenData,
                            exp: Date.now() + 60 * 1000 * 60 * 24 * 7
                        }, secret
                    )
                    return { success: true, status: 200, message: "User created successfully", token: token, data: { email: newUser.email, authMethod: newUser.auth.authMethod } };
                })
                .catch((error) => {
                    return { success: false, status: 400, message: error.message || "Error creating the user" };
                });
        } else {
            const tokenData = {
                uid: existingClient.auth.uid,
                email: existingClient.email,
                id: existingClient._id
            }

            const token = jwt.sign(
                {
                    tokenData,
                    exp: Date.now() + 60 * 1000 * 60 * 24 * 7
                }, secret
            )


            return { success: true, status: 200, message: "Login successfully", token: token, data: { email: existingClient.email, authMethod: existingClient.auth.authMethod } };
        }

    } catch (error) {
        return { success: false, status: 400, message: error.message || "Error log in" };
    }


}

module.exports = authAccess