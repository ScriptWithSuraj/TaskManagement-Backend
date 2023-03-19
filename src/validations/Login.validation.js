import { check } from "express-validator";
export const LoginValidation = [
  //   check("name").trim().isAlpha().withMessage("Name should be Alphabets only"),
  check("password", "Password is require")
    .exists()
    .isLength({ min: 8, max: 50 })
    .trim(),
  check("email", "Email is require").exists().isEmail(),
];
