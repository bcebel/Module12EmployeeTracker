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
//adds a new employee to the database
function addEmployee() {
  const statement = "SELECT * FROM role";
  db.query(statement, function (err, roles) {
    if (err) throw err;
    const roleChoices = roles.map((role) => ({
      name: role.title,
      value: role.id,
    }));
    const statement = "SELECT * FROM employee";
    db.query(statement, function (err, employees) {
      if (err) throw err;
      const managerChoices = employees.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      }));
      inquirer
        .prompt([
          {
            type: "input",
            name: "first_name",
            message: "Enter employee's first name",
          },
          {
            type: "input",
            name: "last_name",
            message: "Enter employee's last name",
          },
          {
            type: "list",
            name: "role_id",
            message: "Select employee's role",
            choices: roleChoices,
          },
          {
            type: "list",
            name: "manager_id",
            message: "Select employee's manager",
            choices: managerChoices,
          },
        ])
        .then((response) => {
          const statement = "INSERT INTO employee SET ?";
          db.query(statement, response, function (err, result) {
            if (err) throw err;
            console.log("Employee added.");
            mainMenu();
          });
        });
    });
  });
}
//adds a new department
function addDepartment() {
  inquirer

    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter department name",
      },
    ])
    .then((response) => {
      const statement = "INSERT INTO department SET ?";
      db.query(statement, response, function (err, result) {
        if (err) throw err;
        console.log("Department added.");
        mainMenu();
      });
    });
}
//write a function that adds a new role
function addRole() {
  const statement = "SELECT * FROM department";
  db.query(statement, function (err, departments) {
    if (err) throw err;
    const departmentChoices = departments.map((department) => ({
      name: department.name,
      value: department.id,
    }));
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "Enter role title",
        },
        {
          type: "input",
          name: "salary",
          message: "Enter role salary",
        },
        {
          type: "list",
          name: "department_id",
          message: "Select role department",
          choices: departmentChoices,
        },
      ])

      .then((response) => {
        const statement = "INSERT INTO role SET ?";
        db.query(statement, response, function (err, result) {
          if (err) throw err;
          console.log("Role added.");
          mainMenu();
        });
      });
  });
}

function mainMenu() {
  const options = {
    viewEmployees: "View All Employees",
    viewRoles: "View All Roles",
    viewDepartments: "View All Departments",
    addEmployee: "Add Employee",
    addDepartment: "Add Department",
    addRole: "Add Role",
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
        case options.addEmployee:
          addEmployee();
          break;
        case options.addDepartment:
          addDepartment();
          break;
        case options.addRole:
          addRole();
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
