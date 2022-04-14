class View {
    todoTable;
    projectList;
    constructor(){
        this.todoTable = document.querySelector("table");
        this.projectList = document.querySelector(".projectList");
    }

    displayProjects(currentProjectsList) {
      this.projectList.innerHTML = "";
      currentProjectsList.forEach((project) => {
        this.projectList.appendChild(this.createLi(project.title));
      });
    }
    
    createLi(projectTitle) {
      const newLi = document.createElement("li");
      newLi.textContent = projectTitle;
      let id = parseInt(newLi.previousElementSibling?.getAttribute("id")) +1 || 0;
      newLi.setAttribute("id", id);
      return newLi;
    }
    
    displayTodos(currentTodoArray) {
      // Wipeout current list
      this.todoTable.innerHTML = "";
      // loop through list
      currentTodoArray.forEach((todo) => {
        // Create and add a new row to the table
        this.todoTable.appendChild(createRow(todo.title));
      });
    }
    
    createRow(title) {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `<td>${title}</td>`;
      return newRow;
    }
}

export { View };
