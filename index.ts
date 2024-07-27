#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk"

let todos_Store: string[] = []

let loops = true
while (loops) {

    const chose = await inquirer.prompt(
        {
            name: "selection",
            type: "list",
            message: chalk.bold.magentaBright("chose a todos action"),
            choices: ["Add", "Update", "Delete", "Read"]
        }
    )
    if (chose.selection === "Add") {

        const todosAdd = await inquirer.prompt(
            [{
                name: "todos",
                type: "input",
                message: chalk.cyan.italic("please enter your todos")
            }, {
                name: "addmore",
                type: "confirm",
                message: chalk.yellow("do you want to add more"),
                default: true
            }]
        )

        todos_Store.push(todosAdd.todos)
        console.log(todos_Store);

        loops = todosAdd.addmore

    }

    if (chose.selection === "Update") {

        const UpdateTodos = await inquirer.prompt(
            {
                name: "updated",
                type: 'list',
                message: chalk.redBright("select your todos which you want to update"),
                choices: todos_Store.map(item => item)
            })
        const newupdated = await inquirer.prompt(
            [{
                name: "newTodos",
                type: "input",
                message: chalk.cyan.italic("enter new todos"),
            }, {
                name: "addmore",
                type: "confirm",
                message: chalk.yellow("do you want to add more"),
                default: true
            }])
        loops = newupdated.addmore

        let new_list_todos = todos_Store.filter(item => item !== UpdateTodos.updated)
        todos_Store = [...new_list_todos, newupdated.newTodos]
        console.log(todos_Store);

    }

    if (chose.selection === "Delete") {

        const DeleteTodos = await inquirer.prompt(
            {
                name: "Deleted",
                type: 'list',
                message: chalk.cyan.italic("select your todos which you want to update"),
                choices: todos_Store.map(item => item)
            })

        let newdeletedtodos = todos_Store.filter(item => item !== DeleteTodos.Deleted)

        todos_Store = [...newdeletedtodos]
        console.log(todos_Store);


    }

    if (chose.selection === "Read") {

        console.log(chalk.bgGreenBright.italic.bold("here is your todos"));

        for (let i = 0; i < todos_Store.length; i++) {
            console.log(chalk.yellowBright.italic(`${i + 1}.${todos_Store[i]}`));

        }
        break
    }

}

