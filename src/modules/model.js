import {Project} from "./entities";

class Model {
    projectList;

    constructor(){
        const defaultProject = new Project("default");
        this.projectList = [defaultProject];
    }

    addProject(title){
        this.projectList.push(new Project(title));
    }
    
    getProject(id){
        return this.projectList[id];
    }
    
    getProjects(){
        return this.projectList;
    }
    
    addTodoToProject(id, title, due, prio){
        this.projectList[id].addTodo(title,due,prio);
        console.log(this.projectList);
    }

    addDescriptionToTodo(projectId, todoId, text){
        this.projectList[projectId].getTodo(todoId).setDescription(text);
        
    }

    updateTodo(projectId, todoId, title, due, prio, description){
        this.projectList[projectId].setTodo(todoId, title, due, prio, description);
    }

}


export {Model};