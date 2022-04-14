import {Project} from "./entities";

class Model {
    projectList;

    constructor(){
        const defaultProject = new Project("default");
        this.projectList = [defaultProject];
    }

    addProject(title){
        console.log("inside model: add project");
        this.projectList.push(new Project(title));
    }
    
    getProject(id){
        console.log(this.projectList[id]);
        return this.projectList[id];
    }
    
    getProjects(){
        console.log("inside model: get projects");
        return this.projectList;
    }
    
    addTodoToProject(id, title, due, prio){
        this.projectList[id].addTodo(title,due,prio);
    }

}


export {Model};