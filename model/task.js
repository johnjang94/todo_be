const mongoose = require("mongoose");
const schema = mongoose.Schema;

const taskSchema = schema(
  {
    task: {
      type: String,
      required: true,
    },
    isComplete: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const taskModel = mongoose.model("task", taskSchema);
module.exports = taskModel;
