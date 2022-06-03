class Todo {
  static url = "todos";
  #todos = [];
  #currentTodo = null;
  #currentTodoE = null;
  #EtodoContainer = null;
  #http = null;
  #editE = null;
  #editTitle = null;
  #editBody = null;

  #CLASSES = {
    todoComplete: "todo-complete",
    itemActive: "item-active",
    showEdit: "show-edit",
    hideComplBut: "hide-element",
    close: "close",
    complete: "complete",
    itemTItle: "item-title",
    itemBody: "item-body",
  };

  constructor(el, editEl) {
    this.#EtodoContainer = el;
    this.#editE = editEl;
    this.init();
  }

  init() {
    this.#http = new Http(Todo.url);
    this.addListeners();
    this.#editTitle = this.#editE.querySelector(".edit-title");
    this.#editBody = this.#editE.querySelector(".edit-body");
    const btn = this.#editE.querySelector(".save");
    this.getTodos();
  }

  addListeners() {
    this.#EtodoContainer.addEventListener("click", this.onTodoClick);
    this.#editE.querySelector(".save").addEventListener("click", this.onSave);
  }
  
  getTodos() {
    this.#http.getAll().then((d) => {
      this.#todos = d;
      this.renderTodos(this.#todos);
    });
  }

  renderTodos(todos) {
    const content = todos.map((t) => this.createTodoElement(t)).join("");
    this.#EtodoContainer.innerHTML = content;
  }

  createTodoElement(todo) {
    return `    <div class="item ${
      todo.isComplete ? this.#CLASSES.todoComplete : ""
    }" id="${todo.id}">
    <div class="item-content">
      <div>
        <div class="item-title"> ${todo.title}</div>
        <div class="item-body"> ${todo.body}</div>
      </div>
      <div>time</div>
    </div>
    <div class="item-actions">
      <div class="close">x</div>
      <button class="complete ${
        todo.isComplete ? this.#CLASSES.hideComplBut : ""
      }">Complete</button>
    </div>
  </div>`;
  }
  onTodoClick = (e) => {
    const target = e.target;
    this.#currentTodoE = e.target.closest(".item");
    if (this.#currentTodoE) {
      this.#currentTodo = this.#todos.find(
        (e) => e.id === this.#currentTodoE.id
      );
    }
    if (e.target.classList.contains(this.#CLASSES.close)) {
      this.removeTodo(this.#currentTodo.id);
      return;
    }
    if (e.target.classList.contains(this.#CLASSES.complete)) {
      this.completeToto(this.#currentTodo);
      return;
    }
    if (
      e.target.classList.contains(this.#CLASSES.itemTItle) ||
      e.target.classList.contains(this.#CLASSES.itemBody)
    ) {
      this.editTodo();
      return;
    }
  };

  removeTodo(id) {
    this.#http.delete(id).then((r) => {
      if (r.deletedCount >= 1) {
        this.#todos = this.#todos.filter((t) => t.id !== id);
        this.#currentTodoE.remove();
        this.clearData();
      }
    });
  }

  editTodo() {
    this.#editE.classList.add(this.#CLASSES.showEdit);
    this.#currentTodoE.classList.add(this.#CLASSES.itemActive);
    this.#editTitle.value = this.#currentTodo.title;
    this.#editBody.value = this.#currentTodo.body;
  }

  completeToto(todo) {
    todo.isComplete = true;
    this.#http.update(todo.id, todo).then((r) => {
      if (r && r.id) {
        this.#currentTodoE.classList.add(this.#CLASSES.todoComplete);
        this.clearData();
      }
    });
  }

  createTodo(title, body) {
    const todo = {
      title,
      body,
      isComplete: false,
    };
    this.#http.create(todo).then((r) => {
      if (r && r.id) {
        this.#todos.unshift(r);
        const content = this.createTodoElement(r);
        this.#EtodoContainer.insertAdjacentHTML("afterbegin", content);
      }
    });
  }

  clearData() {
    this.#currentTodo = null;
    this.#currentTodoE = null;
  }

  onSave = () => {
    this.#currentTodo.title = this.#editTitle.value;
    this.#currentTodo.body = this.#editBody.value;
    this.#http.update(this.#currentTodo.id, this.#currentTodo).then((r) => {
      if (r && r.id) {
        this.#currentTodoE.querySelector(".item-title").innerHTML = r.title;
        this.#currentTodoE.querySelector(".item-body").innerHTML = r.body;
        this.#editE.classList.remove(this.#CLASSES.showEdit);
        this.#currentTodoE.classList.remove(this.#CLASSES.itemActive);
        this.clearData();
      }
    });
  };
}
