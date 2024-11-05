const menuSchema = require("../models/Menu")
const cloudinary = require('cloudinary').v2;
require("dotenv").config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const foodAdd = async ({ title, description, price, discount, image, type }) => {
    try {
        let imageUrl = undefined
        const result = await cloudinary.uploader.upload(image, {
            folder: 'Projects Images/Indico/Food Images',
            resource_type: 'image'
        });
        imageUrl = result.secure_url;

        const quality = "upload/q_auto:low/";
        let modifiedUrl = imageUrl
            .split("upload/")
            .join(quality)
            .replace(/\.(jpg|png)$/, ".webp");


        const newFood = new menuSchema({ title, description, price, discount, image: modifiedUrl, type });
        const savedFood = await newFood.save();
        console.log(imageUrl);
        return savedFood;
    } catch (error) {
        console.error("Error al crear", error);
        throw error; // Lanza el error para que se maneje en la función llamante
    }
};


module.exports = foodAdd