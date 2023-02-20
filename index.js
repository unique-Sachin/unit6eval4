const { json } = require("express");
const { connection } = require("./Configs/db");
const { authenticate } = require("./Middleware/authentication.middleware");
const { postRouter } = require("./Routes/post.routes");
const { userRouter } = require("./Routes/user.routes");
const cors = require("cors");
const app = require("express")();
require("dotenv").config();

app.use(cors());
app.use(json());
app.get("/", (req, res) => {
  res.send("Home");
});
app.use("/users", userRouter);
app.use("/posts", authenticate, postRouter);

app.listen(process.env.port, async () => {
  try {
    connection;
    console.log("connected to db");
  } catch (error) {
    console.log("could not connect");
  }
});
