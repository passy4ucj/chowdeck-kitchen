import { Router } from "express";
import {
    createMenuSchema,
  createVendorSchema
} from "../schema";
import { createMenuController, deleteMenuController, getAMenuController, getAllMenusController, updateMenuController } from "../controllers";
import { currentUserMiddleware, requireAuthMiddleware } from "../middleware";

const router = Router();


router.route("/:menuId")
    .get(getAMenuController)
    .put(updateMenuController)
    .delete(deleteMenuController)

router
  .route("/")
  .get(getAllMenusController)


router
  .route("/")
  .post(
    createMenuSchema(),
    createMenuController
  );


export { router as menuRoutes };
