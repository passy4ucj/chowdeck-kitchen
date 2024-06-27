import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, ForbiddenError } from "../errors";
import { successResponse } from "../helpers";
import { createMenuService, deleteMenu, getMenuService, getMenusService, getVendorService, updateMenuService } from "../services";

export const createMenuController = async (
  req: Request,
  res: Response
) => {
  const {
    meal,
    content,
    vendorId,
  } = req.body;

  const vendor = await getVendorService(vendorId)
  if (!vendor) throw new BadRequestError("Vendor not found");

  const menu = await createMenuService({
    meal,
    content,
    vendorId,
  });
  if (!menu) throw new BadRequestError("Invalid menu");
  return successResponse(res, StatusCodes.CREATED, menu);
};

export const getAllMenusController = async (req: Request, res: Response) => {
  const menu = await getMenusService();
  return successResponse(res, StatusCodes.OK, menu);
};

export const getAMenuController = async (req: Request, res: Response) => {
  const { menuId } = req.params;
  const menu = await getMenuService(menuId);

  if (!menu) throw new BadRequestError("Invalid menu ID");

  return successResponse(res, StatusCodes.OK, menu);
};

export const updateMenuController = async (req: Request, res: Response) => {
    const { menuId } = req.params;
  
    if(!menuId) throw new BadRequestError("Invalid ID");
  
    let menu = await getMenuService(menuId)
  
    if(!menu) throw new BadRequestError("Invalid menu- not found");
  
    const {
        meal,
        content,
        vendorId,
    } = req.body

    const payload = {
        meal,
        content,
        vendorId,
    }
  
    await updateMenuService(menuId, payload)
  
    return successResponse(res, StatusCodes.CREATED, {
      message: "menu updated",
    });
};

export const deleteMenuController = async (req: Request, res: Response) => {
  const { menuId } = req.params;
  const menu = await deleteMenu(menuId);

  if (!menu) throw new BadRequestError("Invalid menu ID");

  return successResponse(res, StatusCodes.OK, 'Deleted');
};
