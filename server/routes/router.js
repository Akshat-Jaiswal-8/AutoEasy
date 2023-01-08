import express from "express";
import contactRouter from "./ContactRouter.js";
import driverRouter from "./DriverRouter.js";
import locationRouter from "./LocationRouter.js";
import userRouter from "./UserRouter.js";

const router = express.Router();

// Routes for user requests
router.use("/user", userRouter);

// Routes for location requests
router.use("/location", locationRouter);

//  Routes for driver requests
router.use("/driver", driverRouter);

//  Routes for driver requests
router.use("/contact", contactRouter);

export default router;
