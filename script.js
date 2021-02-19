var inquirer = require("inquirer")
var mysql = require("mysql")
require("console.table")
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Antonne11",
    database: "employee"
})
connection.connect(function (error) {
    if (error) throw error
    console.log("connection id", connection.threadId)
    displayMenu()
})

function displayMenu() {
    inquirer.prompt({
        type: "list",
        message: "choose selection",
        choices: ["add employee", "add department", "add role", "view employees", "view roles", "view departments", "update employee role",],
        name: "selection"

    })
        .then(function (response) {
            if (response.selection === "add department") {
                addDepartment()
            }
            else if (response.selection === "view departments") {
                viewDepartment()
            }
            else if (response.selection === "add role") {
                addRoles()
            }
            else if (response.selection === "view roles")
                viewRoles()
        })
}

function viewDepartment() {
    connection.query("select * from department", function (err, results) {
        console.table(results)
        displayMenu()
    })

}

function viewRoles() {
    connection.query("select * from role", function (err, results) {
        console.table(results)
        displayMenu()
    })
}


function addRoles() {
    connection.query("select * from department", function (err, results) {
        console.table(results)


        // create a choice list array from department rows
        inquirer.prompt([{
            type: "input",
            message: "what is the role?",
            name: "RoleName",
            // choices: ["salary", "title", "department_id"]?
        },
        {
            type: "number",
            message: "what is the salary?",
            name: "Salary",

        },
        {
            type: "input",
            message: "what department",
            name: "Department"
        }
            // {

            // }
        ])
            .then(function (response) {
                connection.query(`insert into role(title, salary, department_id) values ("${response["RoleName"]}",${response.Salary},${response["department_id"]}) `, function (err, results) {
                    if (err) throw err;
                    console.log("role added")
                    displayMenu()
                })
            }).catch(err => console.log(err))
    })
}

function addDepartment() {
    inquirer.prompt({
        type: "input",
        message: "what is your department name?",
        name: "departmentName"

    })
        .then(function (response) {
            connection.query(`insert into department(name) values ("${response.departmentName}")`, function (err, results) {
                console.log("department added")
                displayMenu()
            })
        })
}


