export interface CRUD {
	list: (limit: number, page: number) => Promise<any>;
	create: (resource: any) => Promise<any>;
	deleteById: (resource: any) => Promise<any>;
	deleteByIndex: (resource: any) => Promise<any>;
	readById: (resourceId: any) => Promise<any>;
	updateById: (resourceId: any) => Promise<any>;
}
