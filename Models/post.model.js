const mongoose = require("mongoose");

const schema = mongoose.Schema({
  user: String,
  title: String,
  body: String,
  device: String,
  no_if_comments: { type: Number, default: 0 },
});

const PostModel = mongoose.model("linkdinpost", schema);

module.exports = {
  PostModel,
};
