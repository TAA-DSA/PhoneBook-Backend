const express = require("express");
const indexController = require("../controllers/index.controller");
const router = express.Router();

router.get("/info", indexController.indexPage);
router.get("/api/persons", indexController.getAllContact);
router.get("/api/persons/:id", indexController.getContactById);
router.post("/api/persons", indexController.createContact);
router.delete("/api/persons/:id", indexController.deleteAllContact);

module.exports = router;
