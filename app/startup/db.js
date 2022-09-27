const mongoose = require("mongoose");
const { logInfo, logError } = require("./error");
const { DB_URI } = process.env;

module.exports = function () {
  mongoose
    .connect(DB_URI || 'mongodb://127.0.0.1:27017/test')
    .then((result) => logInfo("successfully connected to the database"))
    .catch((err) => logError(err));
};
