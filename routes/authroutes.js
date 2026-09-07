const express = require("express");
const authmiddleware = require("../Middlewares/authmiddleware");

const {
  registercontroller,
  logincontroller,
  logoutcontroller,
} = require("../controllers/authcontrollers");
const router = express.Router();

router.post("/register", registercontroller);
router.post("/login", logincontroller);
router.post("/logout", authmiddleware, logoutcontroller);

module.exports = router;
