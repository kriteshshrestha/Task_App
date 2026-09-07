const express = require("express");
const {
  getusercontroller,
  updateusercontroller,
  resetpasswordcontroller,
  updatepasswordcontroller,
  deleteusercontroller,
} = require("../controllers/usercontroller");
const authmiddleware = require("../Middlewares/authmiddleware");

const router = express.Router();

router.get("/getuser", authmiddleware, getusercontroller);

router.put("/updateuser", authmiddleware, updateusercontroller);

router.post("/resetpassword", authmiddleware, resetpasswordcontroller);

router.post("/updatepassword", authmiddleware, updatepasswordcontroller);

router.delete("/deleteuser/:id", authmiddleware, deleteusercontroller);
module.exports = router;
