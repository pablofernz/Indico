const { Router } = require('express');
const { createClient, deleteClient, updateClient, clientLogin, thirdPartyAccess } = require("../handlers/clientHandler")
const { addReview, myReviews, deleteReview, purchaseFood, purchaseFoodWithMercadoPago, setFavoriteFood, getFavoriteFood, getMyPurchases } = require("../handlers/clientStoreHandler");
const { existingUser, passwordValidator } = require('../handlers/validations');

const router = Router();

router.post("/access/register", createClient)
router.post("/access/login", clientLogin)
router.post("/access/thirdparty", thirdPartyAccess)

router.put("/:id/update", updateClient)
router.delete("/:id/delete", deleteClient)

router.post("/:id/review/add", addReview)
router.get("/:id/reviews", myReviews)
router.delete("/:id/review/delete/:reviewID", deleteReview)

router.get("/exist", existingUser)
router.post("/password", passwordValidator)

router.post("/pay", purchaseFood)
router.post("/pay/mercadopago", purchaseFoodWithMercadoPago)
router.get("/:id/mypurchases", getMyPurchases)

router.patch("/:id/favoritefoods", setFavoriteFood)
router.get("/:id/favoritefoods", getFavoriteFood)

module.exports = router;