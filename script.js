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

            else if (response.selection === "add employee") {
                addEmployee()
            }
            else if (response.selection === "view employees") {
                viewEmployees()
            }

        })
}

// View Departments

function viewDepartment() {
    connection.query("select * from department", function (err, results) {
        console.table(results)
        displayMenu()
    })

}

// view Roles

function viewRoles() {
    connection.query("select * from role", function (err, results) {
        console.table(results)
        displayMenu()
    })
}
//  View Employees

function viewEmployees() {
    connection.query("select * from employee", function (err, results) {
        console.table(results)
        displayMenu()
    })

}
// Add employees
function addEmployee() {
    connection.query("select * from role", function (err, results) {
        console.table(results)

        //     role choices 
        //     let departmentChoices = []
        //     for (let i = 0; i < results.length; i++) {
        //         console.log(results[i])
        //         departmentChoices.push({
        //             value: results[i].id,
        //             name: results[i].name
        //         })
        //         console.log(departmentChoices)
        //     }
        //     console.log(departmentChoices)


        // employee choices 

        // connection.query("select * from employee", function (err, results) {
        //     console.log(results)
        //     let departmentChoices = []
        //     for (let i = 0; i < results.length; i++) {
        //         console.log(results[i])
        //         departmentChoices.push({
        //             value: results[i].id,
        //             name: results[i].name
        //         })
        //         console.log(departmentChoices)
        //     }
        //     console.log(departmentChoices)


        // query for employees






        // create a choice list array for roles and employees```` 
        inquirer.prompt([
            // {
            //     type: "input",
            //     message: "what is the employee?",
            //     name: "department_id",
            // },
            {
                type: "input",
                message: "what is employee first name",
                name: "first_name",
            },//     console.log(results)
            //     let departmentChoices = []
            //     for (let i = 0; i < results.length; i++) {
            //         console.log(results[i])
            //         departmentChoices.push({
            //             value: results[i].id,
            //             name: results[i].name
            //         })
            //         console.log(departmentChoices)
            //     }
            //     console.log(departmentChoices)

            {
                type: "input",
                message: "what is employee last name?",
                name: "last_Name"
            },
            //    what is role choice array
            //    what is the employees manager/ employee choice array
            //    create choices array for roles and employees
        ])
            // Employee response
            .then(function (response) {
                connection.query(`insert into employee(first_name, last_name, role_id) values ("${response["first_name"]}","${response.last_Name}",4) `, function (err, results) {
                    if (err) throw err;
                    console.log("employee added")
                    displayMenu()
                })
            }).catch(err => console.log(err))
        // }) 
    })
}

//  Add roles
function addRoles() {
    connection.query("select * from department", function (err, results) {
        console.log(results)
        let departmentChoices = []
        for (let i = 0; i < results.length; i++) {
            console.log(results[i])
            departmentChoices.push({
                value: results[i].id,
                name: results[i].name
            })
            console.log(departmentChoices)
        }
        console.log(departmentChoices)
        // create a choice list array from department rows 
        inquirer.prompt([{
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
            choices: departmentChoices
        }

        ])
            .then(function (response) {
                console.log(response)
                connection.query(`insert into role(title, salary, department_id) values ("${response["RoleName"]}",${response.Salary},${response["Department"]}) `, function (err, results) {

                    if (err) throw err;
                    console.log("role added")
                    displayMenu()
                })
            }).catch(err => console.log(err))
    })
}
//  Add department 

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


