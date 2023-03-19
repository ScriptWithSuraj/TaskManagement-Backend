import { validationResult } from "express-validator";
import UserModel from "../models/User.model.js";
import { jsonGenerate } from "../utils/helper.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { SECRET_KEY, StatusCode } from "../utils/constants.js";
const Login = async (req, res) => {
  const error = validationResult(req);
  if (error.isEmpty()) {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          "Email does not exist",
          user
        )
      );
    }
    const passVerification = bcrypt.compareSync(password, user.password);
    if (!passVerification) {
      return res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          "Email or Password is incorrect"
        )
      );
    }
    const token = Jwt.sign({ userId: user._id }, SECRET_KEY);
    return res.json(
      jsonGenerate(StatusCode.SUCCESS, "Login Successful", {
        userId: user._id,
        token: token,
      })
    );
  }
  res.json(
    jsonGenerate(
      StatusCode.VALIDATION_ERROR,
      "Validation error",
      error.mapped()
    )
  );
};
export default Login;
