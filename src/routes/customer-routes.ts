import { Router } from "express";
import {
    validateRequestMiddleware,
  } from "../helpers";
import { currentUserMiddleware, requireAuthMiddleware } from "../middleware";
import { loginSchema, registerCustomerSchema, userUpdatePasswordSchema } from "../schema";
import { currentCustomer, customerUpdatePasswordController, getCustomerController, getCustomersController, loginCustomerController, registerCustomerController } from "../controllers";


const router = Router();


// sign in route
router
  .route("/signin-user")
  .post(loginSchema(), validateRequestMiddleware, loginCustomerController);

// current user route
router.route("/current-user").get(currentUserMiddleware, currentCustomer);

// protected routes
// router.use(currentUserMiddleware, requireAuthMiddleware);

router
.route("/")
.get(getCustomersController)
.post(
  registerCustomerSchema(),
  validateRequestMiddleware,
  registerCustomerController
);

router
    .route("/update-password")
    .patch(
      userUpdatePasswordSchema(),
      validateRequestMiddleware,
      customerUpdatePasswordController
    );


router.route("/:customerId").get(getCustomerController);


export { router as customerRoutes };
