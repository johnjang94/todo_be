const taskModel = require("../model/task");

const taskController = {};

taskController.createTask = async (req, res) => {
  try {
    const { task, isComplete } = req.body;
    const newTask = new taskModel({ task, isComplete });
    await newTask.save();

    res.status(200).json({ message: "ok!", data: newTask });
  } catch (error) {
    res.status(400).json({ message: "not been successful", error });
  }
};

taskController.getTask = async (req, res) => {
  try {
    const taskList = await taskModel.find({}).select("-__v");
    res.status(200).json({ message: "ok!", data: taskList });
  } catch (error) {
    res.status(400).json({ message: "could not read any list", error });
  }
};

taskController.updateTask = async (req, res) => {
  try {
    const { task } = req.body;
    res.status(201).json({ message: "task has been updated", data: task });
  } catch (error) {
    res
      .status(400)
      .json({ message: "the designated task does not exist", error });
  }
};

taskController.deleteTask = async (req, res) => {
  try {
    const { task } = req.body;
    res.status(201).json({ message: "task has been deleted", data: task });
  } catch (error) {
    res
      .status(400)
      .json({ message: "the designated task does not exist", error });
  }
};

module.exports = taskController;
