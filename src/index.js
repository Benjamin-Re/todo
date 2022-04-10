import Todo from "./todo.js";
// import {} from "./project";
import css from './style.css';


// Create Todo module


const addButton = document.querySelector(".content > button");
const contentContainer = document.querySelector(".content");
const inputField = document.querySelector("#todoInputField");

addButton.addEventListener("click", (e) => {
    const newTodo = new Todo(inputField.value);
    const newItem = document.createElement("div");
    newItem.textContent = newTodo.title;
    contentContainer.appendChild(newItem);
});




// Set todo status to complete module

// Changing todo priority module

// Dom manipulation module