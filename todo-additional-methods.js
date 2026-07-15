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
      return acc + `${cv} \n`;
    }, `--- ${this.title} --- \n`);
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
    return this.todos.every((todo) => todo.isDone());
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(index) {
    this._validateIndex(index);
    return this.todos.splice(index, 1);
  }

  forEach(callback) {
    for (let index = 0; index < this.todos.length; index++) {
      callback(this.todos[index]);
    }
  }

  filter(callback) {
    let filteredTodos = new TodoList(this.title);
    this.forEach((todo) => {
      if (callback(todo)) {
        filteredTodos.add(todo);
      }
    });

    return filteredTodos;
  }

  findByTitle(title) {
    return this.filter(todo => todo.getTitle() === title).first()
  }

  allDone() {
    return this.filter((todo) => todo.isDone());
  }

  allNotDone() {
    return this.filter((todo) => !todo.isDone());
  }

  markDone(title) {
    let todoToMark = this.findByTitle(title);
    if (todoToMark) {
      todoToMark.markDone();
    }
  }

  markAllDone() {
    this.forEach((todo) => {
      todo.markDone();
    });
  }

  markAllUndone() {
    this.forEach((todo) => {
      todo.markUndone();
    });
  }

  toArray() {
    return [...this.todos];
  }
}

let todoList = new TodoList("Todays Todos");
let todo1 = new Todo("Milk Collection");
let todo2 = new Todo("Riot");
let todo3 = new Todo("Make money");

todoList.add(todo1);
todoList.add(todo2);
todoList.add(todo3);

console.log(todoList.findByTitle("Milk Collection"));
console.log(todoList.findByTitle("Riot"));
console.log(todoList.findByTitle("Collect debt"));

todo1.markDone();
todo2.markDone();

console.log(todoList.allDone());
console.log(todoList.allNotDone());

todoList.markDone("Make money")
console.log(todoList)

todoList.markAllUndone()
console.log(todoList)

todoList.markAllDone()
console.log(todoList)



console.log(todoList.toArray() === todoList.todos)
