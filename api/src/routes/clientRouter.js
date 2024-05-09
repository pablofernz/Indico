const { Router } = require('express');
const { createClient, deleteClient, updateClient, clientLogin } = require("../handlers/clientHandler")
const { addReview, myReviews, deleteReview, purchaseFood } = require("../handlers/clientStoreHandler");

const router = Router();

router.post("/register", createClient)
router.post("/login", clientLogin)
router.put("/update/:id", updateClient)
router.delete("/delete/:id", deleteClient)

router.post("/:id/review/add", addReview)
router.get("/:id/reviews", myReviews)
router.delete("/:id/review/delete/:reviewID", deleteReview)

router.post("/pay", purchaseFood)

module.exports = router;