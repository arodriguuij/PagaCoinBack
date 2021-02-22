const mongoose = require("mongoose");

const WalletsSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("Wallets", WalletsSchema);
