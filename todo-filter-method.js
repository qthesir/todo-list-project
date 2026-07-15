class Todo {
  static DONE_MARKER = "X";
  static UNDONE_MARKER = " ";

  constructor(title) {
    this.title = title;
    this.done = false;
  }

  toString() {
    let marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
    return `[${marker}] ${this.title}`;
  }

  markDone() {
    this.done = true;
  }

  markUndone() {
    this.done = false;
  }

  isDone() {
    return this.done;
  }

  getTitle() {
    return this.title;
  }
}

// omitted code

// This class represents a collection of Todo objects.
// You can perform typical collection-oriented actions
// on a TodoList object, including iteration and selection.

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  toString() {
    return this.todos.reduce((acc, cv) => {
      return acc + `${cv} \n`
    }, `--- ${this.title} --- \n`)
  }

  add(todo) {
    if (!(todo instanceof Todo)) {
      throw new TypeError("Value is not type Todo");
    }

    this.todos.push(todo);
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
  }

  last() {
    return this.todos[this.size() - 1];
  }

  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index];
  }

  _validateIndex(index) {
    if (!(index in this.todos)) {
      throw new ReferenceError(`invalid Index: ${index}`);
    }
  }

  markDoneAt(index) {
    this.itemAt(index).markDone();
  }

  markUndoneAt(index) {
    this.itemAt(index).markUndone();
  }

  isDone() {
    return this.todos.every(todo => todo.isDone())
  }

  shift() {
    return this.todos.shift()
  }

  pop() {
    return this.todos.pop()
  }

  removeAt(index) {
    this._validateIndex(index)
    return this.todos.splice(index, 1)
  }

  forEach(callback) {
    for(let index = 0; index < this.todos.length; index++) {
      callback(this.todos[index])
    }
  }

  filter(callback) {
    let filteredTodos = []
    this.forEach(todo => {
      if(callback(todo)) {
        filteredTodos.push(todo)
      }
    })
    return filteredTodos
  }
}


let todo1 = new Todo("Buy milk");
let todo2 = new Todo("Clean room");
let todo3 = new Todo("Go to the gym");
let todo4 = new Todo("Go shopping");
let todo5 = new Todo("Feed the cats");
let todo6 = new Todo("Study for Launch School");
let list = new TodoList("Today's Todos");

list.add(todo1);
list.add(todo2);
list.add(todo3);
list.add(todo4);
list.add(todo5);
list.add(todo6);
todo1.markDone();
todo5.markDone();

let doneTodos = list.filter(todo => todo.isDone());
console.log(doneTodos);