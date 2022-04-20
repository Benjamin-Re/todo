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
  isUpdate;
  idToUpdate;

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
    this.isUpdate = false;
    this.idToUpdate = -1;
  }

  initializeUI() {
    // Load stored data when the page is first loaded
    let data = this.getData();
    console.log(data);
    console.log(this.model.getProjects());
    this.view.displayProjects(data);  
    
    // this.view.displayProjects(this.model.getProjects());
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
        this.listenForEdit();
        this.listenForDelete();
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
    // Save your current data
    this.saveData();
    this.listenForProjects();
    this.listenForDescriptions();
    this.listenForEdit();
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
    if(this.isUpdate){
      // If we update dont create a new todo but overwrite the old one
      // The id of the todo to update is saved in a global variable
      // Also get the description as the popup is showing at this flow
      let todoDescription = document.querySelector(`tr[id='${this.idToUpdate}']`).nextElementSibling.firstElementChild.firstElementChild.value;
      this.model.updateTodo(this.currentProjectId, this.idToUpdate, todoTitle, todoDate, todoPrio, todoDescription);      
      this.isUpdate=false;
    } else {
      this.model.addTodoToProject(
        this.currentProjectId,
        todoTitle,
        todoDate,
        todoPrio
      );
    }
    // Display all todos after the change
    this.view.displayTodos(
      this.model.getProject(this.currentProjectId).getTodos()
    );
    this.popup.classList.remove("active");
    this.listenForDescriptions();
    this.listenForTodos();
    this.listenForDelete();
    this.listenForEdit();
    // Save the current data
    this.saveData();
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
        // Set the global update flag to true so the add button handlers can know. 
        this.isUpdate=true;
        // Get id of todo to edit and save it in global variable
        this.idToUpdate =
          +icon.parentNode.parentNode.previousElementSibling.getAttribute("id");
        // Get data from the popup + descr
        this.popup.classList.add("active");
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

  // Store data whenever a project or todo is added
  saveData() {
    let data = JSON.stringify(this.model.getProjects());
    console.log(`stringified data: ${data}`);
    localStorage.setItem("projects", data);
  }

  getData() {
    let data = localStorage.getItem("projects");
    return JSON.parse(data);
  }

}

export { Controller };
