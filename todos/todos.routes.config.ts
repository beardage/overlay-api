import {
	CommonRoutesConfig,
	configureRoutes,
} from "../common/common.routes.config";
import express from "express";

export class TodosRoutes extends CommonRoutesConfig implements configureRoutes {
	constructor(app: express.Application) {
		super(app, "TodosRoute");
		this.configureRoutes();
	}

	configureRoutes() {
		this.app.get(
			`/todos`,
			(req: express.Request, res: express.Response) => {
				res.status(200).send(`list of todos`);
			}
		);

		this.app.post(
			`/todos`,
			(req: express.Request, res: express.Response) => {
				res.status(200).send(`Post to todos`);
			}
		);

		this.app.put(
			`/todos/:todoId`,
			(req: express.Request, res: express.Response) => {
				res.status(200).send(`Put to ${req.params.todoId}`);
			}
		);

		this.app.patch(
			`/todos/:todoId`,
			(req: express.Request, res: express.Response) => {
				res.status(200).send(`Patch to ${req.params.todoId}`);
			}
		);

		this.app.delete(
			`/todos/:todoId`,
			(req: express.Request, res: express.Response) => {
				res.status(200).send(`Delete to ${req.params.todoId}`);
			}
		);

		this.app.get(
			`/todos/:todoId`,
			(req: express.Request, res: express.Response) => {
				res.status(200).send(`Get to ${req.params.todoId}`);
			}
		);
	}
}
