#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
let todos_Store = [];
let loops = true;
while (loops) {
    const chose = await inquirer_1.default.prompt({
        name: "selection",
        type: "list",
        message: chalk_1.default.bold.magentaBright("chose a todos action"),
        choices: ["Add", "Update", "Delete", "Read"]
    });
    if (chose.selection === "Add") {
        const todosAdd = await inquirer_1.default.prompt([{
                name: "todos",
                type: "input",
                message: chalk_1.default.cyan.italic("please enter your todos")
            }, {
                name: "addmore",
                type: "confirm",
                message: chalk_1.default.yellow("do you want to add more"),
                default: true
            }]);
        todos_Store.push(todosAdd.todos);
        console.log(todos_Store);
        loops = todosAdd.addmore;
    }
    if (chose.selection === "Update") {
        const UpdateTodos = await inquirer_1.default.prompt({
            name: "updated",
            type: 'list',
            message: chalk_1.default.redBright("select your todos which you want to update"),
            choices: todos_Store.map(item => item)
        });
        const newupdated = await inquirer_1.default.prompt([{
                name: "newTodos",
                type: "input",
                message: chalk_1.default.cyan.italic("enter new todos"),
            }, {
                name: "addmore",
                type: "confirm",
                message: chalk_1.default.yellow("do you want to add more"),
                default: true
            }]);
        loops = newupdated.addmore;
        let new_list_todos = todos_Store.filter(item => item !== UpdateTodos.updated);
        todos_Store = [...new_list_todos, newupdated.newTodos];
        console.log(todos_Store);
    }
    if (chose.selection === "Delete") {
        const DeleteTodos = await inquirer_1.default.prompt({
            name: "Deleted",
            type: 'list',
            message: chalk_1.default.cyan.italic("select your todos which you want to update"),
            choices: todos_Store.map(item => item)
        });
        let newdeletedtodos = todos_Store.filter(item => item !== DeleteTodos.Deleted);
        todos_Store = [...newdeletedtodos];
        console.log(todos_Store);
    }
    if (chose.selection === "Read") {
        console.log(chalk_1.default.bgGreenBright.italic.bold("here is your todos"));
        for (let i = 0; i < todos_Store.length; i++) {
            console.log(chalk_1.default.yellowBright.italic(`${i + 1}.${todos_Store[i]}`));
        }
        break;
    }
}
