const Router = require("express");
const router = new Router();

const ordersController = require("../controllers/ordersController.js");
const checkRole = require("../middleware/checkRoleMiddleware.js");

router
  .post("/", ordersController.create)
  .get("/", checkRole("ADMIN"), ordersController.getAll)
  .get("/:id", checkRole("ADMIN"), ordersController.getOne)
  .put("/", checkRole("ADMIN"), ordersController.updateOrder)
  .delete("/", checkRole("ADMIN"), ordersController.deleteOrder);
module.exports = router;
