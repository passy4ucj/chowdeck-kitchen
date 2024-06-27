import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, ForbiddenError } from "../errors";
import { successResponse } from "../helpers";
import { createVendorService, getVendorService, getVendorsService, updateVendorService } from "../services";

export const createVendorController = async (
  req: Request,
  res: Response
) => {
  const {
    name
  } = req.body;

  const vendor = await createVendorService({
    name,
  });
  if (!vendor) throw new BadRequestError("Invalid vendor");
  return successResponse(res, StatusCodes.CREATED, vendor);
};

export const getAllVendorsController = async (req: Request, res: Response) => {
  const vendors = await getVendorsService();
  return successResponse(res, StatusCodes.OK, vendors);
};

export const getAVendorController = async (req: Request, res: Response) => {
  const { vendorId } = req.params;
  const vendor = await getVendorService(vendorId);

  if (!vendor) throw new BadRequestError("Invalid menu ID");

  return successResponse(res, StatusCodes.OK, vendor);
};

export const updateVendorController = async (req: Request, res: Response) => {
    const { vendorId } = req.params;
  
    if(!vendorId) throw new BadRequestError("Invalid ID");
  
    let vendor = await getVendorService(vendorId)
  
    if(!vendor) throw new BadRequestError("Invalid vendor- not found");
  
    const {
        name
    } = req.body

    const payload = {
        name
    }
  
    await updateVendorService(vendorId, payload)
  
    return successResponse(res, StatusCodes.CREATED, {
      message: "vendor updated",
    });
};
