const { Router } = require('express');
const { createClient, deleteClient, updateClient } = require("../handlers/clientHandler")
const { addReview, myReviews, deleteReview } = require("../handlers/clientStoreHandler");
const router = Router();

router.post("/register", createClient)
router.put("/update/:id", updateClient)
router.delete("/delete/:id", deleteClient)

router.post("/:id/review/add", addReview)
router.get("/:id/reviews", myReviews)
router.delete("/:id/review/delete/:reviewID", deleteReview)
module.exports = router;