import express from "express";
import { TodosService } from "../../services/todo.services";

export class TodosController {
	constructor() {}

	listTodos(req: express.Request, res: express.Response) {
		const todosService = TodosService.getInstance();
		const todos = todosService.list(100, 0);
		console.log("todos" + todos);
		res.status(200).send(todos);
	}

	getTodoById(req: express.Request, res: express.Response) {
		const todosService = TodosService.getInstance();
		const todo = todosService.readById(req.params.todoId);
		res.status(200).send(todo);
	}

	createTodo(req: express.Request, res: express.Response) {
		const todosService = TodosService.getInstance();
		const todoId = todosService.create(req.body);
		res.status(201).send({ id: todoId });
	}

	patch(req: express.Request, res: express.Response) {
		const todosService = TodosService.getInstance();
		todosService.patchById(req.body);
		res.status(204).send(``);
	}

	put(req: express.Request, res: express.Response) {
		const todosService = TodosService.getInstance();
		todosService.updateById(req.body);
		res.status(204).send(``);
	}

	removeTodo(req: express.Request, res: express.Response) {
		const todosService = TodosService.getInstance();
		todosService.deleteById(req.params.todoId);
		res.status(204).send(``);
	}
}
