import { body, check } from "express-validator";

export const createVendorSchema = () => {
  return [
    body("name").notEmpty().withMessage("name cannot be empty"),
  ]
};
