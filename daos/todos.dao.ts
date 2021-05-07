import { MongooseService } from "../services/mongoose.service";
import * as shortUUID from "short-uuid";

export class TodosDao {
	mongooseService: MongooseService = MongooseService.getInstance();
	private static instance: TodosDao;
	Schema = this.mongooseService.getMongoose().Schema;
	todoSchema = new this.Schema({
		_id: String,
		content: String,
		status: Boolean,
		childOf: String,
	});

	Todo = this.mongooseService.getMongoose().model("Todo", this.userSchema);

	constructor() {}

	public static getInstance() {
		if (!this.instance) {
			this.instance = new TodosDao();
		}
		return this.instance;
	}

	async addTodo(todoFields: any) {
		todoFields._id = shortUUID.generate();
		const todo = new this.Todo(todoFields);
		await todo.save();
		return todoFields._id;
	}

	async removeTodoById(todoId: string) {
		await this.Todo.deleteOne({ _id: todoId });
	}

	async getTodoById(todoId: string) {
		return this.Todo.findOne({ _id: todoId });
	}

	async listTodos(limit: number = 10, page: number = 0) {
		return this.Todo.find()
			.limit(limit)
			.skip(limit * page)
			.exec();
	}

	async patchTodo(todoFields: any) {
		let todo: any = await this.Todo.findById(todoFields._id);
		if (todo) {
			for (let i in todoFields) {
				todo[i] = todoFields[i];
			}
			return await todo.save();
		}
	}
}
