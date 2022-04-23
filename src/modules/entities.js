class Todo {
    static id = 0;
    title;
    due;
    prio;
    description;

    constructor(title, due, prio) {
        this.id = ++Todo.id;
        this.title = title;
        this.due = due;
        this.prio = prio;
    }

    setId(id){
        this.id = id;
    }

    getId(){
        return this.id;
    }

    setDescription(text){
        this.description=text;
    }

    getDescription(){
        return this.description;
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
    static id = 0;
    todoList = [];

    constructor(title){
        this.title = title;
        this.id = ++Project.id;
    }

    setId(id){
        this.id = id;
    }

    getId(){
        return this.id;
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

    addRevivedTodo(todo){
        this.todoList.push(todo);
    }

    getTodo(id){
        return this.todoList[id];
    }

    setTodo(id, title, due, prio, description){
        this.todoList[id].setTitle(title);
        this.todoList[id].setDue(due);
        this.todoList[id].setPriority(prio);
        this.todoList[id].setDescription(description);
    }

    getTodos(){
        return this.todoList;
    }

    deleteTodo(id){
        this.todoList.splice(id,1);
    }
}

export {Todo, Project};