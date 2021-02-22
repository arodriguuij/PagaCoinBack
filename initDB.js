const mongoose = require("mongoose");

module.exports = () => {
  const uri = process.env.DB_CONNECTION;
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => console.log(err));
};
