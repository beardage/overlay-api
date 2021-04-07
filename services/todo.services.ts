import { CRUD } from "../common/interfaces/crud.interface";
import { ChatDao } from "../daos/chat.dao";

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
		return this.dao.addTodo(resource);
	}

	deleteById(resourceId: any) {
		return this.dao.removeTodoById(resourceId);
	}

	list(limit: number, page: number) {
		return this.dao.getTodos;
	}

	patchById(resource: any) {
		return this.dao.patchTodoById(resource);
	}

	readById(resource: any) {
		return this.dao.getTodoById(resource);
	}

	updateById(resource: any) {
		return this.dao.putTodoById(resource);
	}
}
