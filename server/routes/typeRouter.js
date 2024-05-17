const Router = require("express");
const router = new Router();
const typeController = require("../controllers/typeController.js");
const checkRole = require("../middleware/checkRoleMiddleware.js");

router
  .post("/", checkRole("ADMIN"), typeController.create)
  .get("/", typeController.getAll)
  .delete("/:id", checkRole("ADMIN"), typeController.delete);

module.exports = router;
