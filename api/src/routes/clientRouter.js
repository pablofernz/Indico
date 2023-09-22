const { Router } = require('express');
const {createClient, deleteClient, updateClient} = require("../handlers/clientHandler")
const router = Router();

router.post("/register", createClient)
router.put("/update/:id", updateClient)
router.delete("/delete/:id", deleteClient)
module.exports = router;