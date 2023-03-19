// import { validationResult } from "express-validator";
// import { StatusCode, SECRET_KEY } from "../utils/constants.js";
// import { jsonGenerate } from "../utils/helper.js";
// import Jwt from "jsonwebtoken";
// import bcrypt, { hash } from "bcrypt";
// import UserModel from "../models/User.model.js";
// const Register = async (req, res) => {
//   const errors = validationResult(req);
//   // res.send(errors);
//   if (errors.isEmpty()) {
//     const { username, password, email } = req.body;
//     const salt = await bcrypt.genSalt(10);
//     const hashPass = await bcrypt.hash(password, salt);
//     // password = hashPass;
//     const userExist = await UserModel.findOne({ email: email });
//     if (userExist) {
//       res.json(
//         jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Email already taken")
//       );
//     }
//     try {
//       const result = await UserModel.create({
//         username: username,
//         password: hashPass,
//         email: email,
//       });
//       const token = Jwt.sign({ userId: result._id }, SECRET_KEY);
//       res.json(
//         jsonGenerate(StatusCode.SUCCESS, "Registration successful", {
//           userId: result._id,
//           token: token,
//         })
//       );
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   res.json(
//     jsonGenerate(
//       StatusCode.VALIDATION_ERROR,
//       "Validation Error",
//       errors.mapped()
//     )
//   );
// };
// export default Register;
import { validationResult } from "express-validator";
import { StatusCode, SECRET_KEY } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helper.js";
import Jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import UserModel from "../models/User.model.js";

const Register = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { username, password, email } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);
    const userExist = await UserModel.findOne({ email: email });
    if (userExist) {
      return res.json(
        jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Email already taken")
      );
    }
    try {
      const result = await UserModel.create({
        username: username,
        password: hashPass,
        email: email,
      });
      const token = Jwt.sign({ userId: result._id }, SECRET_KEY);
      return res.json(
        jsonGenerate(StatusCode.SUCCESS, "Registration successful", {
          userId: result._id,
          token: token,
        })
      );
    } catch (err) {
      console.log(err);
      return res.json(jsonGenerate(StatusCode.SERVER_ERROR, "Server error"));
    }
  } else {
    return res.json(
      jsonGenerate(
        StatusCode.VALIDATION_ERROR,
        "Validation Error",
        errors.mapped()
      )
    );
  }
};

export default Register;
