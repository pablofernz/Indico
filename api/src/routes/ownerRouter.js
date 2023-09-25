const { Router } = require('express');
const { createOwner, updateOwner, seeOwners, deleteOwner } = require("../handlers/ownerHandler");
const { seeClients, addFood, updateFood, deleteFood } = require('../handlers/ownerActionsHandler');
const { getMenu } = require('../handlers/clientStoreHandler');
const ownerRouter = Router();

ownerRouter.post("/register", createOwner)
ownerRouter.get("/list", seeOwners)
ownerRouter.put("/update/:id", updateOwner)
ownerRouter.delete("/delete/:id", deleteOwner)

ownerRouter.get("/clients", seeClients)

ownerRouter.get("/store/menu", getMenu)
ownerRouter.post("/store/menu/add", addFood)
ownerRouter.put("/store/menu/update/:id", updateFood)
ownerRouter.delete("/store/menu/delete/:id", deleteFood)

module.exports = ownerRouter