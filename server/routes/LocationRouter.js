import express from "express";
import {
  getLocations,
  addLocation,
  getPassengers,
  getDrivers,
  getWithinField,
} from "../controllers/LocationController.js";

const locationRouter = express.Router();

locationRouter.get("/getall", getLocations);

locationRouter.get("/passenger", getPassengers);

locationRouter.get("/driver", getDrivers);

locationRouter.post("/addlocation", addLocation);

locationRouter.get("/getinrange", getWithinField);

export default locationRouter;
