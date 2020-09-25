const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const founderSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: Number,

  createdProducts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  votedProducts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

module.exports = mongoose.model("Founder", founderSchema);
