const { UserModel } = require("../Models/user.model");
const userRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

userRouter.post("/register", async (req, res) => {
  try {
    const { name, email, gender, password, age, city } = req.body;
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      res.send({ msg: "User already exist, please login" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) throw err;
        const newUser = new UserModel({
          name,
          email,
          gender,
          password: hash,
          age,
          city,
        });
        await newUser.save();
        res.send({ msg: "User register Successfully" });
      });
    }
  } catch (error) {
    res.send({ msg: "something went wrong", error });
  }
});
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const loggedUser = await UserModel.find({ email });
    if (loggedUser.length > 0) {
      bcrypt.compare(password, loggedUser[0].password, function (err, result) {
        if (err) throw err;
        if (result) {
          const token = jwt.sign({ userId: loggedUser[0]._id }, "linkedin");
          res.send({ msg: "User logged in Successfully", token });
        } else {
          res.send({ msg: "wrong credentials" });
        }
      });
    } else {
      res.send({ msg: "User does not exist, please register" });
    }
  } catch (error) {
    res.send({ msg: "something went wrong", error });
  }
});

module.exports = {
  userRouter,
};
