import express from "express";
import {
  createDriver,
  getAllDrivers,
  getDriver,
} from "../controllers/DriverController.js";

const driverRouter = express.Router();

driverRouter.post("/create", createDriver);

driverRouter.post("/get", getDriver);

driverRouter.get("/getall", getAllDrivers);

export default driverRouter;
