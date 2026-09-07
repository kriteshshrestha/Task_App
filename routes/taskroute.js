const express = require("express");

const { createtaskcontroller, updatetaskcontroller, gettaskcontroller, deletetaskcontroller } = require("../controllers/taskcontroller");
const authmiddleware = require("../Middlewares/authmiddleware");

const router = express.Router();

router.post("/createtask", authmiddleware ,createtaskcontroller);
router.post("/updatetask/:id",authmiddleware,updatetaskcontroller);
router.get("/gettask", authmiddleware, gettaskcontroller );
router.delete("/deletetask/:id", authmiddleware, deletetaskcontroller);



module.exports = router;
