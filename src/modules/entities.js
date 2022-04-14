class Todo {
    title;
    due;
    prio;

    constructor(title, due, prio) {
        this.title = title;
        this.due = due;
        this.prio = prio;
    }

    setTitle(title) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }


    setDue(due) {
        this.due = due;
    }

    getDue() {
        return this.due;
    }

    setPriority(prio) {
        this.prio = prio;
    }

    getPrio() {
        return this.prio;
    }
}

class Project {
    title;
    todoList = [];

    constructor(title){
        this.title = title;
    }

    setTitle(title){
        this.title = title;
    }

    getTitle(){
        return this.title;
    }

    addTodo(title,due,prio){
        this.todoList.push(new Todo(title,due,prio));
    }

    getTodo(id){
        return this.todoList[id];
    }

    getTodos(){
        return this.todoList;
    }
}

export {Todo, Project};