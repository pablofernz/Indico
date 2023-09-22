const { Router } = require('express');
const {createOwner, updateOwner, seeOwners, deleteOwner} = require("../handlers/ownerHandler")
const ownerRouter = Router();

ownerRouter.post("/register", createOwner)
ownerRouter.get("/list", seeOwners)
ownerRouter.put("/update/:id", updateOwner)
ownerRouter.delete("/delete/:id", deleteOwner)
module.exports = ownerRouter