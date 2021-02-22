const Transaction = require("../models/Transaction");
const createError = require("http-errors");
const mongoose = require("mongoose");

module.exports = {
  getTransactions: async (req, res, next) => {
    try {
      const transactions = await Transaction.find();
      res.status(200).json(transactions);
    } catch (error) {
      res.json({ message: error });
    }
  },
  getSentTransactionById: async (req, res, next) => {
    try {
      const transaction = await Transaction.find({ userFromId: req.params.id });
      if (!transaction) {
        throw createError(404, "Transaction does not exist.");
      }
      res.status(200).json(transaction);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Transaction id"));
        return;
      }
      next(error);
    }
  },
  getReceivedTransactionById: async (req, res, next) => {
    try {
      const transaction = await Transaction.find({ userToId: req.params.id });
      if (!transaction) {
        throw createError(404, "Transaction does not exist.");
      }
      res.status(200).json(transaction);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Transaction id"));
        return;
      }
      next(error);
    }
  },
  getSentTransactionByWallet: async (req, res, next) => {
    try {
      const transaction = await Transaction.find({
        walletFromId: req.params.id,
      });
      if (!transaction) {
        throw createError(404, "Transaction does not exist.");
      }
      res.status(200).json(transaction);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Transaction id"));
        return;
      }
      next(error);
    }
  },
  getReceivedTransactionByWallet: async (req, res, next) => {
    try {
      const transaction = await Transaction.find({ walletToId: req.params.id });
      if (!transaction) {
        throw createError(404, "Transaction does not exist.");
      }
      res.status(200).json(transaction);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Transaction id"));
        return;
      }
      next(error);
    }
  },
  postTransaction: async (req, res, next) => {
    const transaction = new Transaction({
      userFromId: req.body.userFromId,
      userFromName: req.body.userFromName,
      walletFromId: req.body.walletFromId,
      walletFromName: req.body.walletFromName,
      userToId: req.body.userToId,
      userToName: req.body.userToName,
      walletToId: req.body.walletToId,
      walletToName: req.body.walletToName,
      quantity: req.body.quantity,
    });

    try {
      const savedTransaction = await transaction.save();
      res.status(200).json(savedTransaction);
    } catch (error) {
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },
};
