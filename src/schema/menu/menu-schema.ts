import { body, check } from "express-validator";

export const createMenuSchema = () => {
  return [
    body("meal").notEmpty().withMessage("meal cannot be empty"),
    body("vendorId").notEmpty().withMessage("vendorId cannot be empty"),
  ]
};
