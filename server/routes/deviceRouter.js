const Router = require("express");
const router = new Router();
const deviceController = require("./../controllers/deviceController");
const checkRole = require("../middleware/checkRoleMiddleware");
const visitMiddleware = require("../middleware/visitMiddleware");

router
  .post("/", deviceController.create)
  .get("/", deviceController.getAll)
  .get("/visit", deviceController.getDevicesByVisitsDescending)
  .get("/search", deviceController.getSearchAllDeviceByName)
  .get("/:id", visitMiddleware, deviceController.getOne)
  .delete("/:id", checkRole("ADMIN"), deviceController.delete)
  .put("/:id", checkRole("ADMIN"), deviceController.update);

module.exports = router;
