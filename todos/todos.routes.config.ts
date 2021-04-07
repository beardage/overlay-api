import {
	CommonRoutesConfig,
	configureRoutes,
} from "../common/common.routes.config";
import { TodosController } from "./controllers/todos.controller";

import express from "express";

export class TodosRoutes extends CommonRoutesConfig implements configureRoutes {
	constructor(app: express.Application) {
		super(app, "TodosRoute");
		this.configureRoutes();
	}

	configureRoutes() {
		const todosController = new TodosController();
		this.app.get(`/todos`, [todosController.listTodos]);

		this.app.post(`/todos`, [todosController.createTodo]);

		this.app.put(`/todos/:todoId`, [todosController.put]);

		this.app.patch(`/todos/:todoId`, [todosController.patch]);

		this.app.delete(`/todos/:todoId`, [todosController.getTodoById]);
	}
}
