import { check } from "express-validator";
export const RegisterValidation = [
  //   check("name").trim().isAlpha().withMessage("Name should be Alphabets only"),
  check("username", "Username is required")
    .exists()
    .isAlphanumeric()
    .withMessage("Username should be in alphanumeric only")
    .trim()
    .isLength({ min: 6, max: 32 }),
  check("password", "Password is require")
    .exists()
    .isLength({ min: 8, max: 50 })
    .trim(),
  check("email", "Email is require").exists().isEmail(),
];
