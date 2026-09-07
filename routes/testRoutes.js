const express = require("express");
const { testUsercontroller } = require("../controllers/testcontroller");

const router = express.Router();

router.get("/test-user", testUsercontroller);

module.exports = router;