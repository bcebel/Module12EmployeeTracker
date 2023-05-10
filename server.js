require("dotenv").config();
require("console.table");
const inquirer = require("inquirer");
const { db, connectToDatabase } = require("./db/database");
