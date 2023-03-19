import { SECRET_KEY, StatusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helper.js";
import Jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  console.log(req.headers["auth"]);
  if (req.headers["auth"] === undefined) {
    console.log("-----------------------------------------");
    return res.json(jsonGenerate(StatusCode.AUTH_ERROR, "Unauthorize"));
  }
  const token = req.headers["auth"];
  try {
    const decode = Jwt.verify(token, SECRET_KEY);
    console.log(decode);
    req.userId = decode.userId;
    return next();
  } catch (error) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Invalid Token")
    );
  }
};
export default auth;
