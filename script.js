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
        choices: ["add a employee", "add department", "add a role", "view employee", "view role", "view department", "update employee role"],
        name: "selection"

    })
        .then(function (response) {
            if (response.selection === "add department") {
                addDepartment()
            }
            else if (response.selection === "view department") {
                viewDepartment()
            }

        })
}

function viewDepartment() {
    connection.query("select * from department", function (err, results) {
        console.table(results)
        displayMenu()
    })
}

function addDepartment() {
    inquirer.prompt({
        type: "input",
        message: "what is your department name",
        name: "departmentName"

    })
        .then(function (response) {
            connection.query(`insert into department(name) values ("${response.departmentName}")`, function (err, results) {
                console.log("department added")
                displayMenu()
            })
        })
}
