const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema({
  userFromId: {
    type: String,
    required: true,
  },
  userFromName: {
    type: String,
    required: true,
  },
  walletFromId: {
    type: String,
    required: true,
  },
  walletFromName: {
    type: String,
    required: true,
  },
  userToId: {
    type: String,
    required: true,
  },
  userToName: {
    type: String,
    required: true,
  },
  walletToId: {
    type: String,
    required: true,
  },
  walletToName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Transactions", TransactionSchema);
