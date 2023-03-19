import dotenv from "dotenv";
dotenv.config();
export const DBConnection = {
  url: process.env.MONGO_URL,
};
export const SECRET_KEY = process.env.API_SECRET_KEY;
export const StatusCode = {
  SUCCESS: 200,
  VALIDATION_ERROR: 403,
  UNPROCESSABLE_ENTITY: 422,
  AUTH_ERROR: 401,
};
