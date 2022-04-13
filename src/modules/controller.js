import {addTodo} from "./model.js";
import {display} from "./view.js";

let todoInputField = document.querySelector("#todoInputField");
const addButton = document.querySelector(".addTodoButton");

function listenForAdd() {
    console.log(addButton);
    addButton.addEventListener("click", () => {
        let todoTitle = todoInputField.value;
        display(addTodo(todoTitle));
    });
}

export {listenForAdd};