const { Router } = require('express');
const {getMenu, addFood, deleteFood, updateFood} = require("../handlers/MenuHandler")
const restaurantRouter = Router();

restaurantRouter.get("/menu", getMenu)
restaurantRouter.post("/menu/add", addFood)
restaurantRouter.put("/menu/update/:id", updateFood)
restaurantRouter.delete("/menu/delete/:id", deleteFood)

module.exports = restaurantRouter;