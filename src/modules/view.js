class View {
    todoTable;
    projectList;
    constructor(){
        this.todoTable = document.querySelector("table");
        this.projectList = document.querySelector(".projectList");
    }

    displayProjects(currentProjectsList) {
      this.projectList.innerHTML = "";
      let id = 0;
      currentProjectsList.forEach((project) => {
        this.projectList.appendChild(this.createLi(project.title, id++));
      });
    }
    
    createLi(projectTitle, id) {
      const newLi = document.createElement("li");
      newLi.textContent = projectTitle;
      newLi.setAttribute("id", id);
      return newLi;
    }
    
    displayTodos(currentTodoArray) {
      // Wipeout current list
      this.todoTable.innerHTML = "";
      let id = 0;
      // loop through list
      currentTodoArray.forEach((todo) => {
        // Create and add a new row to the table
        this.todoTable.appendChild(this.createRow(todo.title, id++));
      });
    }
    
    createRow(title, id) {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `<td>${title}</td>`;
      newRow.setAttribute("id", id);
      return newRow;
    }
}

export { View };
