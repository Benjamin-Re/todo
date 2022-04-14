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
    this.allCurrentProjects = document.querySelector("li");
  }

  listenForProjects() {
    this.allCurrentProjects?.forEach((project) => {
      project.addEventListener("click", (e) => {
        this.currentProjectId = e.target.getAttribute("id");
      });
    });
  }

  listenForProjectAdd() {
    this.addProjectButton.addEventListener("click", () => {
      let projectTitle = this.projectInputField.value;
      this.model.addProject(projectTitle);
      this.view.displayProjects(this.model.getProjects());
    });
  }

  listenForTodoAdd() {
    this.addTodoButton.addEventListener("click", () => {
      let todoTitle = this.todoInputField.value;
      this.model.addTodoToProject(this.currentProjectId);
      this.view.displayTodos(
        this.model.getProject(this.currentProjectId).getTodos()
      );
    });
  }
}

export { Controller };
