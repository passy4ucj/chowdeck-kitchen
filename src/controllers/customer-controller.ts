import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import {
  generateJWT,
  Password,
  successResponse,
} from "../helpers";
import { BadRequestError, ForbiddenError, NotFoundError } from "../errors";
import Logger from "../logger";
import { createCustomer, customerUpdateService, findCustomerByIdService, getAllCustomerService, getCustomer, updatePasswordService } from "../services";


// @desc    Register Customer
// @route   POST    /api/v2/customer/register
export const registerCustomerController = async (req: Request, res: Response) => {
  const { firstName, LastName, email, password, role } = req.body;

  let user = await getCustomer(email);

  if (user)
    throw new BadRequestError(`User with the email ${email} exists`);
  
  const data = await createCustomer({
    firstName,
    LastName,
    email,
    password,
    role,
  });

  delete data.password

  return successResponse(res, StatusCodes.CREATED, data);
};

// @desc    Login Users
// @route   POST    /api/v2/customer/signin
export const loginCustomerController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await getCustomer(email);

  if (!user) throw new BadRequestError("Invalid credentials");

  const passwordMatch = await Password.comparePassword(
    password,
    user?.password!
  );

  if (!passwordMatch) throw new BadRequestError("Invalid credentials");

  // After providing valid credentials
  // Generate the JWT and attach it to the req session object
  const userJWT = generateJWT(req, {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    LastName: user.LastName,
    role: user.role,
  });

  // remove password from the user object
  delete user.password;

  return successResponse(res, StatusCodes.OK, {
    user,
    token: userJWT
  });
};


// @desc    Fetches the current user
// @route   GET   /api/v2/customer/signin
export const currentCustomer = async (req: Request, res: Response) => {
  if (!req.currentUser) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ currentUser: null });
  }

  const currentUser = await findCustomerByIdService(req.currentUser.id)
  delete currentUser?.password;
  
  return res
    .status(StatusCodes.OK)
    .json({ message: "success", currentUser });
};

export const customerUpdatePasswordController = async (req: Request, res: Response) => {
  const email = req.currentUser?.email
  const { oldPassword, newPassword } = req.body;

  if(!email) throw new BadRequestError("Invalid email");

  const user = await getCustomer(email);

  if (!user) throw new BadRequestError("Invalid credentials");
  
  const passwordMatch = await Password.comparePassword(
    oldPassword,
    user?.password!
  );

  if (!passwordMatch) throw new BadRequestError("Invalid credentials");


  await updatePasswordService(email, newPassword);

    // After providing valid credentials
  // Generate the JWT and attach it to the req session object
  generateJWT(req, {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    LastName: user.LastName,
    role: user.role,
  });

  // remove password from the user object
  delete user.password;


  return successResponse(res, StatusCodes.CREATED, {
    message: "password updated",
  });
};

export const customerUpdateProfileController = async (req: Request, res: Response) => {
  const email = req.currentUser?.email
  if(!email) throw new BadRequestError("Invalid email");

  let user = await getCustomer(email)

  if(!user) throw new BadRequestError("Invalid user - not found");

  const payload = {
    firstName: req.body.firstName || user.firstName,
    LastName: req.body.LastName || user.LastName,
  }

  await customerUpdateService(email, payload)

  return successResponse(res, StatusCodes.CREATED, {
    message: "Customer Profile updated",
  });
};


export const getCustomersController = async (req: Request, res: Response) => {
  const users = await getAllCustomerService(req.query);
  return successResponse(res, StatusCodes.OK, users);
};


export const getCustomerController = async (req: Request, res: Response) => {
  const { customerId } = req.params;

  const user = await findCustomerByIdService(customerId);

  if (!user) throw new NotFoundError("Invalid user ID");

  delete user.password;
  return successResponse(res, StatusCodes.OK, user);
};
