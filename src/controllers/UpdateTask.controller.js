import { validationResult } from "express-validator";
import taskModel from "../models/task.model.js";
import { StatusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helper.js";

export const UpdateTask = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json(
      jsonGenerate(
        StatusCode.VALIDATION_ERROR,
        "Taskid is required",
        error.mapped()
      )
    );
  }
  try {
    const task = await taskModel.findOneAndUpdate(
      {
        _id: req.body.task_id,
        userId: req.userId,
      },
      [
        {
          $set: {
            isCompleted: {
              $eq: [false, "$isCompleted"],
            },
          },
        },
      ]
    );
    if (task) {
      return res.json(
        jsonGenerate(StatusCode.SUCCESS, "Tasks updated successfully", task)
      );
    }
  } catch (error) {
    return res.json(
      jsonGenerate(
        StatusCode.UNPROCESSABLE_ENTITY,
        "Could not update the task",
        error
      )
    );
  }
};
