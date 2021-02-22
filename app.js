const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const createError = require("http-errors");
require("dotenv/config");

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//  Import Routes
const userRoute = require("./routes/users");
app.use("/users", userRoute);
const walletRoute = require("./routes/wallets");
app.use("/wallets", walletRoute);
const transactionRoute = require("./routes/transactions");
app.use("/transactions", transactionRoute);

// 404 handler and pass to error handler
app.use((req, res, next) => {
  next(createError(404, "Not found"));
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.statys || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

// Routes
app.get("/", (req, res) => {
  res.send("We are at home");
});

// Initilize DB
require("./initDB")();

const PORT = process.env.PORT || 5000;
// How to we start listening to the server
app.listen(PORT, () => {
  console.log("Server started on port " + PORT + " ...");
});
