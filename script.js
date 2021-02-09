var inquirer = require("inquirer")
var mysql = require("mysql")
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
        choices: ["add a manager", "add department", "add a role", "view employee", "view role", "view department", "update employee role"],
        name: "selection"

    })
        .then(function (response) {

        })
}