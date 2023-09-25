const { Router } = require('express');
const restaurantRouter = require("./storeRouter")
const clientRouter = require("./clientRouter")
const ownerRouter = require("./ownerRouter")
const router = Router();

router.use("/store", restaurantRouter);
router.use("/client", clientRouter)
router.use("/owner", ownerRouter)

module.exports = router;