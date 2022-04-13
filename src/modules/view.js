const todoTable = document.querySelector("table");

function display(currentTodoArray){
    // Wipeout current list
    todoTable.innerHTML = "";
    // loop through list
    currentTodoArray.forEach((todo)=>{
        // Create and add a new row to the table
        todoTable.appendChild(createRow(todo.title));
    })
}

function createRow(title) {
    console.log(title);
    const newRow = document.createElement("tr");
    newRow.innerHTML=`<td>${title}</td>`;
    return newRow;
}

export {display};