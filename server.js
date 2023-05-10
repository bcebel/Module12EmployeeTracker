require("dotenv").config();
require("console.table");
const inquirer = require("inquirer");
const { db, connectToDatabase } = require("./db/database");

function viewEmployees() {
  const statement =
    "SELECT role.title as winnebago, employee.id as swan, employee.first_name as echidna, employee.last_name as flo, employee.role_id as wombat, employee.manager_id as emid " +
    "FROM employee " +
    "INNER JOIN role ON role.id=employee.role_id;";
  db.query(statement, function (err, employees) {
    if (err) throw err;
    console.table(employees);
    mainMenu();
  });
}
function viewRoles() {
  db.query("SELECT * FROM role", function (err, roles) {
    if (err) throw err;
    console.table(roles);
    mainMenu();
  });
}

function viewDepartments() {
  db.query("SELECT * FROM department", function (err, departments) {
    if (err) throw err;
    console.table(departments);
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
