import { Router } from "express";
import { vendorRoutes } from "./vendor-routes";
import { menuRoutes } from "./menu-routes";
import { customerRoutes } from "./customer-routes";


const router = Router();

router.use("/vendor", vendorRoutes);
router.use("/menu", menuRoutes);
router.use("/customer", customerRoutes);

export { router as applicationRoutes };
