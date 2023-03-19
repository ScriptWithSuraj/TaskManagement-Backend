import { validationResult } from "express-validator";
import taskModel from "../models/task.model.js";
import UserModel from "../models/User.model.js";
import { StatusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helper.js";

export const DeleteTask = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json(
      jsonGenerate(StatusCode.VALIDATION_ERROR, "Task id is required"),
      error.mapped()
    );
  }
  try {
    const task = await taskModel.findOneAndDelete({
      userId: req.userId,
      _id: req.body.task_id,
    });
    if (task) {
      const user = await UserModel.findOneAndUpdate(
        { _id: req.userId },
        { $pull: { tasks: req.body.task_id } }
      );
      res.json(
        jsonGenerate(StatusCode.SUCCESS, "Task deleted successfully", null)
      );
    }
  } catch (error) {
    jsonGenerate(
      StatusCode.UNPROCESSABLE_ENTITY,
      "Failed to  delete the task ",
      error
    );
  }
};
