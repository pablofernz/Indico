const { Router } = require('express');
const { getMenu } = require("../handlers/clientStoreHandler");
const { seeReviews } = require('../handlers/reviewsHandler');
const { seeClients, getNumberOfPurchases } = require('../handlers/ownerActionsHandler');
const storeRouter = Router();

storeRouter.get("/menu", getMenu)
storeRouter.get("/clients", seeClients)

storeRouter.get("/reviews", seeReviews)
module.exports = storeRouter;