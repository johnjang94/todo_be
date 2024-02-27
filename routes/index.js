const express = require("express");
const router = express.Router();
const taskAPI = require("./task_api");
const userAPI = require("./user_api");

router.use("/tasks", taskAPI);
router.use("/user", userAPI);

module.exports = router;
