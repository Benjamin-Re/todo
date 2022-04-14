import { View } from "./view";
import { Model } from "./model.js";

class Controller {
  model;
  view;
  todoInputField;
  addTodoButton;
  projectInputField;
  addProjectButton;
  currentProjectId;
  allCurrentProjects;

  constructor() {
    this.model = new Model();
    this.view = new View();
    this.todoInputField = document.querySelector("#todoInputField");
    this.addTodoButton = document.querySelector(".addTodoButton");
    this.projectInputField = document.querySelector("#projectsInputField");
    this.addProjectButton = document.querySelector(".addProjectButton");
    this.currentProjectId = 0;
  }
  
  initializeUI(){
    this.view.displayProjects(this.model.getProjects());
    this.listenForProjects();
    this.listenForProjectAdd();
    this.listenForTodoAdd();
  }
  
  listenForProjects() {
    this.allCurrentProjects = Array.from(document.querySelectorAll("li"));
    this.allCurrentProjects?.forEach((project) => {
      project.addEventListener("click", (e) => {
        this.currentProjectId = e.target.getAttribute("id");
        console.log(this.currentProjectId);
      });
    });
  }

  listenForProjectAdd() {
    this.addProjectButton.addEventListener("click", () => {
      let projectTitle = this.projectInputField.value;
      this.model.addProject(projectTitle);
      this.view.displayProjects(this.model.getProjects());
      this.listenForProjects();
    });
  }

  listenForTodoAdd() {
    this.addTodoButton.addEventListener("click", () => {
      let todoTitle = this.todoInputField.value;
      this.model.addTodoToProject(this.currentProjectId, todoTitle);
      this.view.displayTodos(
        this.model.getProject(this.currentProjectId).getTodos()
      );
    });
  }
}

export { Controller };
