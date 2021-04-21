const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
  const db = config.get("db");
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "vidly",
      autoIndex: false, // Don't build indexes
    })
    .then(() => winston.info(`Connected to ${db}...`));
};
