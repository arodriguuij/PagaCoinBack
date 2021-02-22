const User = require("../models/User");
const createError = require("http-errors");
const mongoose = require("mongoose");

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.json({ message: error });
    }
  },
  getUserById: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        throw createError(404, "User does not exist.");
      }
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid User id"));
        return;
      }
      next(error);
    }
  },
  postUser: async (req, res, next) => {
    const user = new User({
      name: req.body.name,
      wallets: req.body.wallets,
    });
    try {
      const savedUser = await user.save();
      res.status(200).json(savedUser);
    } catch (error) {
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { name: req.body.name } }
      );
      if (!updatedUser) {
        throw createError(404, "User does not exist");
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid User id"));
        return;
      }
      next(error);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const removedUser = await User.findByIdAndDelete({ _id: req.params.id });
      if (!removedUser) {
        throw createError(404, "User does not exist.");
      }
      res.status(200).json(removedUser);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid User id"));
        return;
      }
      next(error);
    }
  },
};
