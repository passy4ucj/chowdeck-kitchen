import { body } from "express-validator";

export const registerCustomerSchema = () => {
  return [
    body("firstName").notEmpty().withMessage("Please provide your first name"),
    body("LastName").notEmpty().withMessage("Please provide your last name"),
    // body("role")
    //     .isIn(["CUSTOMER"])
    //     .withMessage("Invalid role value")
    //     .isString()
    //     .withMessage("role must be a string"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .notEmpty()
      .trim()
      .isLength({ min: 6, max: 25 })
      .withMessage("Password must be between 6 to 25 characters"),
  ];
};

export const loginSchema = () => {
    return [
      body("email").isEmail().withMessage("Please provide an email"),
      body("password").notEmpty().withMessage("Please provide a password"),
    ];
};

export const userUpdatePasswordSchema = () => {
    return [
      body("oldPassword")
        .notEmpty()
        .withMessage("Please provide oldPassword"),
      body("newPassword")
        .notEmpty()
        .withMessage("Please provide newPassword"),
    ];
};

