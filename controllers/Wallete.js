const Wallet = require("../models/Wallet");
const crypto = require("crypto");
const mongoose = require("mongoose");
const createError = require("http-errors");

module.exports = {
  getWallets: async (req, res, next) => {
    try {
      const wallets = await Wallet.find();
      res.status(200).json(wallets);
    } catch (error) {
      res.json({ message: error });
    }
  },
  getWalletById: async (req, res, next) => {
    try {
      const wallet = await Wallet.findById(req.params.id);
      if (!wallet) {
        throw createError(404, "Wallet does not exist.");
      }
      res.status(200).json(wallet);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Wallet id"));
        return;
      }
      next(error);
    }
  },
  getWalletByHashId: async (req, res, next) => {
    try {
      const wallet = await Wallet.find({ id: req.params.id });
      if (!wallet) {
        throw createError(404, "Wallet does not exist.");
      }
      res.status(200).json(wallet);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Wallet id"));
        return;
      }
      next(error);
    }
  },
  postWallet: async (req, res, next) => {
    const current_date = new Date().valueOf().toString();
    const random = Math.random().toString();
    const idHash = crypto
      .createHash("sha1")
      .update(current_date + random)
      .digest("hex");

    const wallet = new Wallet({
      id: idHash,
      name: req.body.name,
      quantity: req.body.quantity,
    });

    try {
      const savedWallet = await wallet.save();
      res.status(200).json(savedWallet);
    } catch (error) {
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },
  updateWalletByHashId: async (req, res, next) => {
    try {
      const updatedWallet = await Wallet.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { name: req.body.name, quantity: req.body.quantity } }
      );
      if (!updatedWallet) {
        throw createError(404, "Wallet does not exist");
      }
      res.status(200).json(updatedWallet);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Wallet id"));
        return;
      }
      next(error);
    }
  },
  updateWallet: async (req, res, next) => {
    try {
      const updatedWallet = await Wallet.findByIdAndUpdate(req.params.id, {
        $set: { name: req.body.name, quantity: req.body.quantity },
      });
      if (!updatedWallet) {
        throw createError(404, "Wallet does not exist");
      }
      res.status(200).json(updatedWallet);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Wallet id"));
        return;
      }
      next(error);
    }
  },
  deleteWallet: async (req, res, next) => {
    try {
      const removedWallet = await Wallet.findByIdAndDelete({
        _id: req.params.id,
      });
      if (!removedWallet) {
        throw createError(404, "Wallet does not exist.");
      }
      res.status(200).json(removedWallet);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid User id"));
        return;
      }
      next(error);
    }
  },
};
