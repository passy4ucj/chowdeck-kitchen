import { Router } from "express";
import {
  createVendorSchema
} from "../schema";
import { createVendorController, getAVendorController, getAllVendorsController, updateVendorController } from "../controllers";
import { currentUserMiddleware, requireAuthMiddleware } from "../middleware";

const router = Router();


router.route("/:vendorId")
    .get(getAVendorController)
    .put(updateVendorController)

router
  .route("/")
  .get(getAllVendorsController)


// Protected routes
router.use(currentUserMiddleware, requireAuthMiddleware);

router
  .route("/")
  .post(
    createVendorSchema(),
    createVendorController
  );


export { router as vendorRoutes };
