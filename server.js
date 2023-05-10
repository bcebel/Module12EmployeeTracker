require("dotenv").config();
require("console.table");
const inquirer = require("inquirer");
const { db, connectToDatabase } = require("./db/database");

function viewEmployees() {
  const statement =
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, CONCAT_WS(',',manager.first_name, manager.last_name) as manager " +
    "FROM employee " +
    "INNER JOIN role ON role.id=employee.role_id " +
    "LEFT JOIN employee manager ON employee.manager_id = manager.id;";
  db.query(statement, function (err, employees) {
    if (err) throw err;
    console.table(employees);
    mainMenu();
  });
}
function viewRoles() {
  const statement =
    "SELECT role.id, role.title, role.salary, department.name as department " +
    "FROM role " +
    "INNER JOIN department ON department.id=role.department_id;";

  db.query(statement, function (err, roles) {
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
