var inquirer = require("inquirer")
var mysql = require("mysql")
var connection = mysql.createConnection({
    host: "local host",
    port: "3306",
    user: "root",
    password: "Antonne11",
    database: "employee"


})
connection.connect(function (error) {
    If(error) throw error
    console.log("connection id", connection.threadId)
    displayMenu()
})