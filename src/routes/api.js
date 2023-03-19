import express from "express";
import { CreateTask } from "../controllers/Task.controller.js";
import Login from "../controllers/Login.controller.js";
import Register from "../controllers/Register.controller.js";
import { LoginValidation } from "../validations/Login.validation.js";
import { RegisterValidation } from "../validations/Register.validation.js";
import { check } from "express-validator";
import { GetTasks } from "../controllers/TasksList.controller.js";
import { UpdateTask } from "../controllers/UpdateTask.controller.js";
import { DeleteTask } from "../controllers/DeleteTask.controller.js";

const apiRoute = express.Router();
export const apiProtect = express.Router();
apiRoute.post("/register", RegisterValidation, Register);
apiRoute.post("/login", LoginValidation, Login);
apiProtect.post(
  "/createTask",
  [check("desc", "Tasks description is required").exists()],
  CreateTask
);
apiProtect.post(
  "/updateTask",
  [check("task_id", "Task_id is required").exists()],
  UpdateTask
);
apiProtect.post(
  "/deleteTask",
  [check("task_id", "Task_id is required").exists()],
  DeleteTask
);
apiProtect.get("/tasks", GetTasks);

export default apiRoute;
