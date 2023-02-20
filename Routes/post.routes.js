const { PostModel } = require("../Models/post.model");
const jwt = require("jsonwebtoken");

const postRouter = require("express").Router();

postRouter.get("/", async (req, res) => {
  try {
    const { device1, device12 } = req.query;
    const token = req.headers.authorization;
    jwt.verify(token, "linkedin", async (err, decoded) => {
      if (err) throw err;
      if (device1) {
        const postData = await PostModel.find({
          user: decoded.userId,
          device: device1,
        });
        res.send(postData);
      } else if (device1 && device12) {
        const postData = await PostModel.find({
          user: decoded.userId,
          device: device1,
        });
        res.send(postData);
      } else {
        const postData = await PostModel.find({ user: decoded.userId });
        res.send(postData);
      }
    });
  } catch (error) {
    res.send({ msg: "something went wrong", error });
  }
});

postRouter.get("/top", async (req, res) => {
  res.send("post");
});

postRouter.post("/", async (req, res) => {
  try {
    const newPost = new PostModel(req.body);
    await newPost.save();
    res.send("new post added");
  } catch (error) {
    res.send({ msg: "something went wrong", error });
  }
});

postRouter.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await PostModel.findByIdAndUpdate({ _id: id }, req.body);
    res.send("post updated");
  } catch (error) {
    res.send({ msg: "something went wrong", error });
  }
});

postRouter.delete("/top", async (req, res) => {
  try {
    const id = req.params.id;
    await PostModel.findByIdAndDelete({ _id: id }, req.body);
    res.send("post deleted");
  } catch (error) {
    res.send({ msg: "something went wrong", error });
  }
});

module.exports = {
  postRouter,
};
