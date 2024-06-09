const Client = require("../models/Client")
const bcrypt = require("bcrypt")

const existingUser = async (req, res) => {
    const { email } = req.query

    const client = await Client.findOne({
        email: email
    });
    const existingClient = !!client

    return res.status(200).send(existingClient)
}

const passwordValidator = async (req, res) => {
    const { actualPassword, newPassword } = req.body
    const { email } = req.query

    if (actualPassword && newPassword) {
        const client = await Client.findOne({
            email: email
        });

        const hashPassword = async (actualPassword) => {
            const saltRounds = 10;
            const hash = await bcrypt.hash(newPassword, saltRounds);
            return hash;
        }
        const comparePassword = async (password, storedHash) => {
            const match = await bcrypt.compare(password, storedHash);
            return match;
        }

        const passwordMatch = await comparePassword(actualPassword, client.password);
        // const passwordMatch = await hashPassword()
        return res.status(200).send(passwordMatch)
    } else {
        return res.status(400).send("Contraseña requerida")

    }
}

module.exports = {
    existingUser,
    passwordValidator
}