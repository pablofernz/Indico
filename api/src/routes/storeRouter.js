const { Router } = require('express');
const { getMenu } = require("../handlers/clientStoreHandler");
const { seeReviews } = require('../handlers/reviewsHandler');
const storeRouter = Router();

storeRouter.get("/menu", getMenu)

storeRouter.get("/reviews", seeReviews)
module.exports = storeRouter;