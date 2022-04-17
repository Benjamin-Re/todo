class View {
    todoTable;
    projectList;
    constructor(){
        this.todoTable = document.querySelector("tbody");
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
        this.todoTable.appendChild(this.createRow(todo.title, todo.due, todo.prio, id++));
        this.todoTable.appendChild(this.createNewTodoPopup(todo.description));
      });
    }
    
    createRow(title, due, prio, id) {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `<td>${title}</td>
      <td>${due}</td><td>${prio}</td>`;
      newRow.setAttribute("id", id);
      return newRow;
    }

    createNewTodoPopup(description){
      const newRowPopup = document.createElement("tr");
      newRowPopup.innerHTML = `<td><textarea>${description}</textarea></td>
      <td><div class="edit-icon"><i class="fa-solid fa-pencil"></i></div></td>
     <td><div class="trash-icon"><i class="fa-solid fa-trash"></div></td>`;
      newRowPopup.setAttribute("class", "popup");
      return newRowPopup;
    }

}

export { View };
