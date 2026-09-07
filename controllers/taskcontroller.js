const usermodel = require("../models/usermodel");
const taskmodel = require("../models/tasks");

const createtaskcontroller = async (req, res) => {
  try {
    const user = await usermodel.findById({ _id: req.user.id });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found",
      });
    }
    const { tasktitle, taskdescription } = req.body;

    if (!tasktitle) {
      return res.status(500).send({
        success: false,
        message: "please provide task title",
      });
    }

    const task = await taskmodel.create({
      user: user.username,
      taskdescription,
      tasktitle,
    });
    res.status(201).send({
      success: true,
      message: "task created successfully ",
      task,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in create task api",
    });
  }
};

const updatetaskcontroller = async (req, res) => {
  try {
    const user = await usermodel.findById({ _id: req.user.id });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }

    const task = await taskmodel.findById({ _id: req.params.id });
    if (!task) {
      return res.status(404).send({
        success: false,
        message: "task not found",
      });
    }
    // const { status } = req.body;
    //  task.iscompleted = status;

    task.iscompleted = !task.iscompleted;

    await task.save();
    res.status(200).send({
      success: true,
      message: "task update successful",
      task,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in update task api",
    });
  }
};
const gettaskcontroller = async (req, res) => {
  try {
    const user = await usermodel.findById({ _id: req.user.id });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    const task = await taskmodel.find({ user: user.username });

    res.status(200).send({
      success: true,
      message: "user task get successfully",
      task,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in gettask api",
    });
  }
};
const deletetaskcontroller = async (req, res) => {
  try {
    const task = await taskmodel.findByIdAndDelete(req.params.id);

    if (!task) {
      console.log(error);
      return res.status(404).send({
        success: false,
        message: "task not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "task deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete task API",
      error,
    });
  }
};

module.exports = {
  createtaskcontroller,
  updatetaskcontroller,
  gettaskcontroller,
  deletetaskcontroller
};
