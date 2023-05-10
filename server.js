require("dotenv").config();
require("console.table");
const inquirer = require("inquirer");
const { db, connectToDatabase } = require("./db/database");

function viewEmployees() {
  db.query("SELECT * FROM employee", function (err, employees) {
    if (err) throw err;
    console.table(employees);
    mainMenu();
  });
}


function mainMenu() {
  const options = {
    viewEmployees: "View All Employees",
    viewRoles: "View All Roles",
    viewDepartments: "View All Departments",
    quit: "quit",
  };

  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "Select Option",
        choices: Object.values(options),
      },
    ])
    .then((response) => {
      switch (response.action) {
        case options.viewEmployees:
          viewEmployees();
          break;
        case options.viewRoles:
          viewRoles();
          break;
        case options.viewDepartments:
          viewDepartments();
          break;
        default:
          process.exit();
          break;
      }
    });
}

function init() {
  connectToDatabase(mainMenu);
}
init();
