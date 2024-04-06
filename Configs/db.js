const mongoose = require('mongoose');
require("dotenv").config();

const MONGO_URL = process.env.Mongo_URL;

const connection = mongoose.connect(MONGO_URL);

module.exports = { connection };