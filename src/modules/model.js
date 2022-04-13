import {Todo} from "./entities";

const todoList = [];

function addTodo(title, due, prio){
    let newTodo = new Todo(title, due, prio);
    todoList.push(newTodo);
    return todoList;
}

export {addTodo};