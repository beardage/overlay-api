const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database(":memory:");

export class ChatDao {
	private static instance: ChatDao;
	todos: any = [];

	constructor() {
		console.log("initializing sqlite db");
		db.serialize(function () {
			db.run(
				"CREATE TABLE [IF NOT EXISTS] tasks ( id INTEGER PRIMARY KEY,content TEXT NOT NULL, status INTEGER, childOf INTEGER"
			);
		});
	}

	static getInstance(): ChatDao {
		if (!ChatDao.instance) {
			ChatDao.instance = new ChatDao();
		}
		return ChatDao.instance;
	}

	addTodo(todo: any) {
		console.log(todo);
		var stmt = db.prepare(
			"INSERT INTO tasks VALUES(NULL, todo.content, todo.status, todo.childOf)"
		);
		stmt.finalize();
		return this.todos.push(todo);
	}

	getTodos() {
		console.log(this.todos);
		return this.todos;
	}

	getTodoById(todoId: string) {
		return this.todos.find((todo: { id: string }) => todo.id === todoId);
	}

	putTodoById(todo: any) {
		const objIndex = this.todos.findIndex(
			(obj: { id: any }) => obj.id === todo.id
		);
		const updatedTodos = [
			...this.todos.slice(0, objIndex),
			todo,
			...this.todos.slice(objIndex + 1),
		];
		this.todos = updatedTodos;
		return `${todo.id} updated via put`;
	}

	patchTodoById(todo: any) {
		const objIndex = this.todos.findIndex(
			(obj: { id: any }) => obj.id === todo.id
		);
		let currentTodo = this.todos[objIndex];
		for (let i in todo) {
			if (i !== "id") {
				currentTodo[i] = todo[i];
			}
		}
		this.todos = [
			...this.todos.slice(0, objIndex),
			currentTodo,
			...this.todos.slice(objIndex + 1),
		];
		return `${todo.id} patched`;
	}

	removeTodoById(todoId: string) {
		const objIndex = this.todos.findIndex(
			(obj: { id: any }) => obj.id === todoId
		);
		this.todos = this.todos.splice(objIndex, 1);
		return `${todoId} removed`;
	}
}
