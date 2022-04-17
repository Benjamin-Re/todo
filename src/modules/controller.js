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
  showPopupButton;
  popup;
  todoDate;
  todoPrio;

  constructor() {
    this.model = new Model();
    this.view = new View();
    this.todoInputField = document.querySelector("#todoInputField");
    this.addTodoButton = document.querySelector(".addTodoButton");
    this.projectInputField = document.querySelector("#projectsInputField");
    this.addProjectButton = document.querySelector(".addProjectButton");
    this.currentProjectId = 0;
    this.showPopupButton = document.querySelector(".showPopupButton");
    this.popup = document.querySelector(".popup");
    this.todoDate = document.querySelector("#dateInput");
    this.todoPrio = document.querySelector("#prio");
  }

  initializeUI() {
    this.view.displayProjects(this.model.getProjects());
    this.listenForProjects();
    this.listenForProjectAdd();
    this.listenForTodoAdd();
    this.listenForShowPopupButton();
  }

  listenForProjects() {
    this.allCurrentProjects = Array.from(document.querySelectorAll("li"));
    this.allCurrentProjects?.forEach((project) => {
      project.addEventListener("click", (e) => {
        this.currentProjectId = e.target.getAttribute("id");
        // Display all todos for active project
        this.view.displayTodos(
          this.model.getProject(this.currentProjectId).getTodos()
        );
        this.listenForTodos();
      });
    });
  }

  listenForProjectAdd() {
    this.addProjectButton.addEventListener("click", () => {
      this.addProjectHelper();
    });
    // Add keyboard listener but to the input field not to the projects themselves
    this.projectInputField.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.addProjectHelper();
      }
    });
  }

  addProjectHelper() {
    let projectTitle = this.projectInputField.value;
    this.model.addProject(projectTitle);
    this.view.displayProjects(this.model.getProjects());
    this.listenForProjects();
    this.listenForDescriptions();
  }

  listenForTodoAdd() {
    this.addTodoButton.addEventListener("click", () => {
      this.addTodoHelper();
    });
    // Listen for keypress also
    this.todoInputField.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.addTodoHelper();
      }
    });
  }

  addTodoHelper() {
    let todoTitle = this.todoInputField.value;
    let todoDate = this.todoDate.value;
    let todoPrio = this.todoPrio.value;
    this.model.addTodoToProject(
      this.currentProjectId,
      todoTitle,
      todoDate,
      todoPrio
    );
    this.view.displayTodos(
      this.model.getProject(this.currentProjectId).getTodos()
    );
    this.popup.classList.remove("active");
    this.listenForDescriptions();
    this.listenForTodos();
    this.listenForDelete();
    this.listenForEdit();
  }

  // Listen for delete icon
  listenForDelete() {
    const deleteIcons = Array.from(document.querySelectorAll(".trash-icon"));
    deleteIcons.forEach((icon) => {
      icon.parentNode.addEventListener("click", () => {
        // Get id of corresponding todo
        let thisTodoId =
          +icon.parentNode.parentNode.previousElementSibling.getAttribute("id");
        this.model.getProject(this.currentProjectId).deleteTodo(thisTodoId);
        this.view.displayTodos(
          this.model.getProject(this.currentProjectId).getTodos()
        );
      });
    });
  }

  listenForEdit(){
    const editIcons = Array.from(document.querySelectorAll(".edit-icon"));
    editIcons.forEach((icon)=>{
      icon.addEventListener("click", ()=>{
        // Get id of todo to edit
        let thisTodoId =
          +icon.parentNode.parentNode.previousElementSibling.getAttribute("id");
        // Get data from the popup + descr
        this.popup.classList.add("active");
        // Hide the Add button (its listening to add a new todo)
        this.popup.lastElementChild.style.display="none";
        // Disable the trash can while editing
        icon.parentElement.nextElementSibling.firstChild.style.display="none";
        // Also disable other todos to be clicked
        // Add an update button (which will update not add a new one)
        const updateButton = document.createElement("button");
        updateButton.textContent="update";
        this.popup.appendChild(updateButton);
        // Add event listener to the update button
        let todoTitle = this.todoInputField.value;
        let todoDate = this.todoDate.value;
        let todoPrio = this.todoPrio.value;
        let todoDescription = icon.parentNode.previousElementSibling.firstChild.value;
        this.model.getProject(this.currentProjectId).setTodo(
          thisTodoId,
          todoTitle,
          todoDate,
          todoPrio,
          todoDescription,
        );
      })
    })
  }

  listenForTodos() {
    const todos = Array.from(document.querySelectorAll("tr[id]"));
    todos.forEach((todo) => {
      todo.addEventListener("click", () => {
        todo.nextElementSibling.classList.toggle("popup");
        this.listenForDescriptions();
      });
    });
  }

  listenForShowPopupButton() {
    this.showPopupButton.addEventListener("click", () => {
      this.popup.classList.add("active");
    });
  }

  listenForDescriptions() {
    const descriptions = Array.from(document.querySelectorAll("textarea"));
    descriptions.forEach((description) => {
      description.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          // Save the description in the corresponding todo
          let correspondingTodoId =
            e.target.parentNode.parentNode.previousElementSibling.getAttribute(
              "id"
            );
          this.model.addDescriptionToTodo(
            this.currentProjectId,
            correspondingTodoId,
            e.target.value
          );
        }
      });
    });
  }
}

export { Controller };
