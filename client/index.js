import express from "express";
import router from "./routes/router.js";

const app = express();

app.use("/css", express.static("./src/css"));
app.use("/js", express.static("./src/js"));
app.use("/assets", express.static("./src/assets"));

app.use("/", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("listening at port", PORT);
});
