import express from "express";
import path from "path";
import url from "url";

const router = express.Router();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// routing starts over here
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/html/index.html"));
});

router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/html/register.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/html/login.html"));
});

router.get("/map", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/html/map.html"));
});

// routing ends over here
export default router;
