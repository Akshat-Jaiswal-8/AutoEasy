import express from "express";
import {
  getAllMessages,
  makeMessage,
} from "../controllers/ContactController.js";

const contactRouter = express.Router();

contactRouter.post("/message", makeMessage);

contactRouter.get("/getall", getAllMessages);

export default contactRouter;
