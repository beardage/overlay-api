import express from "express";
import { TodosService } from "../../services/todo.services";

export class TodosController {
	constructor() {}

	async listTodos(req: express.Request, res: express.Response) {
		const todosService = TodosService.getInstance();
		const todos = await todosService.list(10, 0);
		res.status(200).send(todos);
	}

	async getTodoById(req: express.Request, res: express.Response) {
		const todosService = TodosService.getInstance();
		const todo = await todosService.readById(req.params.todoId);
		res.status(200).send(todo);
	}

	async createTodo(req: express.Request, res: express.Response) {
		console.log(req.body);
		const todosService = TodosService.getInstance();
		const todoId = await todosService.create(req.body);
		res.status(201).send({ id: todoId });
	}

	async patchTodo(req: express.Request, res: express.Response) {
		const todosService = TodosService.getInstance();
		await todosService.updateById(req.body);
		res.status(204).send(true);
	}

	async putTodo(req: express.Request, res: express.Response) {
		const todosService = TodosService.getInstance();
		await todosService.updateById(req.body);
		res.status(204).send(true);
	}

	async removeTodo(req: express.Request, res: express.Response) {
		const todosService = TodosService.getInstance();
		await todosService.deleteById(req.params.todoId);
		res.status(204).send(true);
	}
}
