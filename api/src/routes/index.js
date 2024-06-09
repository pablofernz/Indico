const { Router } = require('express');
const restaurantRouter = require("./storeRouter")
const clientRouter = require("./clientRouter")
const ownerRouter = require("./ownerRouter")
const tokenRouter = require('./tokenRouter');
const router = Router();

router.use("/store", restaurantRouter);
router.use("/client", clientRouter)
router.use("/owner", ownerRouter)
router.use("/token", tokenRouter)

module.exports = router;
