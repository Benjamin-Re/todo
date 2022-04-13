import Todo from "./todo.js";

const createTodo = () => {
    // Get the basic elements on the page - the add button, the content container and the input field
    const addButton = document.querySelector("main > button");
    const tableBody = document.querySelector("tbody");
    const inputField = document.querySelector("#todoInputField");

    // Add new row to content table
    addButton.addEventListener("click", (e) => {
        const newTodo = new Todo(inputField.value);
        // Look for the last rows id and increment it for the next one, or if none exists, then it should return undefined = falsy and therefore assign 0
        let id = parseInt (
                document.querySelector("tbody")?.lastElementChild?.getAttribute("id")
            ) + 1 || 0;
        const newItem = generateRow(id, newTodo.getTitle());
        tableBody.appendChild(newItem);
    });
}

//function to create new row
const generateRow = (id, text) => {
let newRow = document.createElement("tr");
newRow.setAttribute("id", id);
newRow.innerHTML = `
        <td>
            <i class="fa-solid fa-circle-check"></i>
            <span contenteditable="true" class="task">${text}</span>
        </td>
        <td>
            <span class="fa-stack fa-2x">
                <i class="fa-solid fa-square fa-stack-2x"></i>
                <i class="fa-solid fa-pen fa-stack-1x fa-inverse"></i>
            </span>
        </td>
        <td>
        <span class="fa-stack fa-2x">
            <i class="fa-solid fa-square fa-stack-2x"></i>
            <i class="fa-solid fa-trash fa-stack-1x fa-inverse"></i>
        </span>
        </td>
        `;
    return newRow;
};

export {createTodo};