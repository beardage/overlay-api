import { CRUD } from "../common/interfaces/crud.interface";
import { ChatDao } from "../daos/chat.dao";
import { TodosDao } from "../daos/todos.dao";

export class TodosService implements CRUD {
	private static instance: TodosService;
	dao: ChatDao;

	constructor() {
		this.dao = ChatDao.getInstance();
	}

	static getInstance(): TodosService {
		if (!TodosService.instance) {
			TodosService.instance = new TodosService();
		}
		return TodosService.instance;
	}

	create(resource: any) {
		return TodosDao.getInstance().addTodo(resource);
	}

	deleteById(resourceId: any) {
		return TodosDao.getInstance().removeTodoById(resourceId);
	}

	list(limit: number, page: number) {
		return TodosDao.getInstance().listTodos();
	}

	patchById(resource: any) {
		return TodosDao.getInstance().patchTodo(resource);
	}

	readById(resource: any) {
		return TodosDao.getInstance().getTodoById(resource);
	}

	updateById(resource: any) {
		return TodosDao.getInstance().putById(resource);
	}
}
