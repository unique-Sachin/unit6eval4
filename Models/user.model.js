const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  password: String,
  age: Number,
  city: String,
});

const UserModel = mongoose.model("linkdinuser", schema);

module.exports = {
  UserModel,
};
