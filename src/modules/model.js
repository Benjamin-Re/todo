import { Project, Todo } from "./entities";

class Model {
  projectList;

  constructor() {
    const defaultProject = new Project("default");
    this.projectList = [defaultProject];
  }

  revive(data) {
    // When reviving empty the plist we dont want duplicate defautl
    this.projectList = [];
    data.forEach((project) => {
      this.reviveProject(project);
    });
  }

  reviveProject(project) {
    const newProject = new Project(project.title);
     // revive and add its todos
    project.todoList.forEach((todo) => {
      newProject.addRevivedTodo(this.reviveTodo(todo));
    });
    this.addRevivedProject(newProject);
  }

  reviveTodo(todo) {
    let newTodo = new Todo(todo.title, todo.due, todo.prio);
    newTodo.setId(todo.id);
    newTodo.setDescription(todo.description);
    return newTodo;
  }

  addRevivedProject(project) {
    this.projectList.push(project);
  }

  addProject(title) {
    this.projectList.push(new Project(title));
  }

  getProject(id) {
    return this.projectList[id];
  }

  getProjects() {
    return this.projectList;
  }

  addTodoToProject(id, title, due, prio) {
    this.projectList[id].addTodo(title, due, prio);

  }

  addDescriptionToTodo(projectId, todoId, text) {
    this.projectList[projectId].getTodo(todoId).setDescription(text);
  }

  updateTodo(projectId, todoId, title, due, prio, description) {
    this.projectList[projectId].setTodo(todoId, title, due, prio, description);
  }
}

export { Model };
