const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  wallets: {
    type: [
      {
        type: String,
      },
    ],
    required: true,
  },
});

module.exports = mongoose.model("Users", UserSchema);
