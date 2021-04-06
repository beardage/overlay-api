export class chatDao {
	private static instance: chatDao;
	todos: any = [];
	
	constructor () {
		console.log('created new chatDao');
	}

	static getInstance(): chatDao {
		if(!chatDao.instance) {
			chatDao.instance = new chatDao();
		}
		return chatDao.instance;
	}
	
	addTodo(todo: any) {
		return this.todos.push(todo);
	}

	getTodos() {
		return this.todos;
	}

	getTodoById(todoId: string) {
		return this.todos.find((todo: {id: string; }) => todo.id === todoId);
	}

	putTodoById(todo: any) {
		const objIndex = this.todos.findIndex((obj: { id: any; }) => obj.id === todo.id);
		const updatedTodos = [
			...this.todos.slice(0, objIndex),
			todo,
			...this.todos.slice(objIndex + 1),
		];
		this.todos = updatedTodos;
		return `${todo.id} updated via put`;
	}

	patchTodoById(todo: any) {
		const objIndex = this.todos.findIndex((obj: {id: any; }) => obj.id === todo.id);	
		let currentTodo = this.todos[objIndex];
		for (let i in todo) {
			if (i !== 'id') {
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
		const objIndex = this.todos.findIndex((obj: { id: any; }) => obj.id === todoId);
		this.todos = this.todos.splice(objIndex, 1);
		return `${todoId} removed`;
	}

}
