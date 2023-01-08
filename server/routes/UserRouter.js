import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
} from "../controllers/UserController.js";

const userRouter = express.Router();

userRouter.post("/create", createUser);

userRouter.post("/get", getUser);

userRouter.get("/getall", getAllUsers);

export default userRouter;
