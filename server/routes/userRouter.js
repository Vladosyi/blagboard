const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

router
  .post("/registration", userController.registration)
  .post("/login", userController.login)
  .get("/auth", authMiddleware, userController.check);

module.exports = router;
