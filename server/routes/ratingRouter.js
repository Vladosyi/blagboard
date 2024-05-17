const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/authMiddleware.js");
const checkAddRatingMiddleware = require("../middleware/checkAddRatingMiddleware.js");
const ratingController = require("../controllers/ratingController.js");

router
  .post(
    "/",
    authMiddleware,
    checkAddRatingMiddleware,
    ratingController.addRating
  )
  .post("/check-rating", authMiddleware, ratingController.checkRating);

module.exports = router;
