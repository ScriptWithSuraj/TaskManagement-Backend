import UserModel from "../models/User.model.js";
import { StatusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helper.js";

export const GetTasks = async (req, res) => {
  try {
    const list = await UserModel.findById(req.userId)
      .select("-password")
      .populate("tasks")
      .exec();
    return res.json(jsonGenerate(StatusCode.SUCCESS, "Got all tasks", list));
  } catch (error) {
    return res.json(
      jsonGenerate(
        StatusCode.UNPROCESSABLE_ENTITY,
        "Failed to get the tasks",
        error
      )
    );
  }
};
