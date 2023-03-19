import { validationResult } from "express-validator";
import { StatusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helper.js";
import taskModel from "../models/task.model.js";
import UserModel from "../models/User.model.js";
export const CreateTask = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json(
      jsonGenerate(
        StatusCode.VALIDATION_ERROR,
        "Task is required",
        error.mapped()
      )
    );
  }
  try {
    const result = await taskModel.create({
      userId: req.userId,
      desc: req.body.desc,
      title: req.body.title,
    });
    if (result) {
      const user = await UserModel.findOneAndUpdate(
        { _id: req.userId },
        { $push: { tasks: result } }
      );
      return res.json(
        jsonGenerate(StatusCode.SUCCESS, "Task created successfully", result)
      );
    }
  } catch (error) {
    jsonGenerate(
      StatusCode.UNPROCESSABLE_ENTITY,
      "Task creation failed",
      result
    );
  }
};
