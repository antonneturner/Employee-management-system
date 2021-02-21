var inquirer = require("inquirer");
const { up } = require("inquirer/lib/utils/readline");
var mysql = require("mysql");
require("console.table");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Antonne11",
  database: "employee",
});
connection.connect(function (error) {
  if (error) throw error;
  console.log("connection id", connection.threadId);
  displayMenu();
});

function displayMenu() {
  inquirer
    .prompt({
      type: "list",
      message: "choose selection",
      choices: [
        "add employee",
        "add department",
        "add role",
        "view employees",
        "view roles",
        "view departments",
        "update employee role",
      ],
      name: "selection",
    })
    .then(function (response) {
      if (response.selection === "add department") {
        addDepartment();
      } else if (response.selection === "view departments") {
        viewDepartment();
      } else if (response.selection === "add role") {
        addRoles();
      } else if (response.selection === "view roles") viewRoles();
      else if (response.selection === "add employee") {
        addEmployee();
      } else if (response.selection === "view employees") {
        viewEmployees();
      } else if (response.selection === "update roles") {
        updateRole();
      }
    });
}

// View Departments

function viewDepartment() {
  connection.query("select * from department", function (err, results) {
    console.table(results);
    displayMenu();
  });
}

// view Roles

function viewRoles() {
  connection.query("select * from role", function (err, results) {
    console.table(results);
    displayMenu();
  });
}
//  View Employees

function viewEmployees() {
  connection.query("select * from employee", function (err, results) {
    console.table(results);
    displayMenu();
  });
}
// Add employees
function addEmployee() {
  connection.query("select * from role", function (err, results) {
    console.table(results);

    //     role choices

    let roleChoices = [];
    for (let i = 0; i < results.length; i++) {
      console.log(results[i]);
      roleChoices.push({
        value: results[i].id,
        name: results[i].title,
      });
      console.log(roleChoices);
    }

    // employee choices

    connection.query("select * from employee", function (err, empResults) {
      console.log(empResults);
      let employeeChoices = [];
      for (let i = 0; i < empResults.length; i++) {
        console.log(empResults[i]);
        employeeChoices.push({
          value: empResults[i].id,
          name: empResults[i].first_name + empResults[i].last_name,
        });
        console.log(employeeChoices);
      }

      // query for employees

      // create a choice list array for roles and employees````
      inquirer
        .prompt([
          {
            type: "list",
            message: "what is role?",
            name: "role_id",
            choices: roleChoices,
          },
          {
            type: "list",
            message: "who is the manager",
            name: "employee_id",
            choices: employeeChoices,
          },
          {
            type: "input",
            message: "what is employee first name?",
            name: "first_name",
          },

          {
            type: "input",
            message: "what is employee last name?",
            name: "last_Name",
          },
          //    what is role choice array
          //    what is the employees manager/ employee choice array
          //    create choices array for roles and employees
        ])
        // Employee response
        .then(function (response) {
          connection.query(
            `insert into employee(first_name, last_name, role_id, manager_id) values ("${response["first_name"]}","${response.last_Name}",${response["role_id"]},${response["employee_id"]}) `,
            function (err, results) {
              if (err) throw err;
              console.log("employee added");
              displayMenu();
            }
          );
        })
        .catch((err) => console.log(err));
    });
  });
}

//  Add roles
function addRoles() {
  connection.query("select * from department", function (err, results) {
    console.log(results);
    let departmentChoices = [];
    for (let i = 0; i < results.length; i++) {
      console.log(results[i]);
      departmentChoices.push({
        value: results[i].id,
        name: results[i].name,
      });
      console.log(departmentChoices);
    }
    console.log(departmentChoices);
    // create a choice list array from department rows
    inquirer
      .prompt([
        {
          type: "input",
          message: "what is the role?",
          name: "RoleName",
        },
        {
          type: "number",
          message: "what is the salary?",
          name: "Salary",
        },
        {
          type: "list",
          message: "what department",
          name: "Department",
          choices: departmentChoices,
        },
      ])
      .then(function (response) {
        console.log(response);
        connection.query(
          `insert into role(title, salary, department_id) values ("${response["RoleName"]}",${response.Salary},${response["Department"]}) `,
          function (err, results) {
            if (err) throw err;
            console.log("role added");
            displayMenu();
          }
        );
      })
      .catch((err) => console.log(err));
  });
}
//  Add department

function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      message: "what is your department name?",
      name: "departmentName",
    })
    .then(function (response) {
      connection.query(
        `insert into department(name) values ("${response.departmentName}")`,
        function (err, results) {
          console.log("department added");
          displayMenu();
        }
      );
    });
}

//  Update Role

// function updateRole (){
// inquirer.prompt({
//   type: "input",
//   message:"Role you would like to update",
//   name:"updateRole"
// })

// .then(function (response){
// connection.query("select * from role_id", function (err, updateResults){
// console.log(updateResults)
// let updateRole = []
// for (let i = 0; i < updateResults.length; i++) {
//   console.log(updateResults[i].id)
//   updateRole.push({
//     value: results[i].id,
//     name: results[i].name,
//   })
// }

// }

// )

// })

// }
//  create update a role, create choices arrays for employees and roles,
// questions which employee do you want to update what is there new role
// then run update query (w3 schools)
