const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const { db, connectToDatabase } = require("../db/database");
