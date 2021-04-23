import express from "express";
import * as http from "http";
import { CommonRoutesConfig } from "./common/common.routes.config";
import { TodosRoutes } from "./todos/todos.routes.config";
import { TodosService } from "./services/todo.services";

const cors = require("cors");
const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;
const routes: any = [];

app.use(cors());
app.use(express.json());

const tmi = require("tmi.js");
const client = new tmi.Client({
	options: { debug: true, messagesLogLevel: "info" },
	connection: {
		reconnect: true,
		secure: true,
	},
	identity: {
		username: "beardage",
		password: `${process.env.TWITCH_BOT_OAUTH}`,
	},
	channels: ["beardage"],
});
client.connect().catch(console.error);
client.on("message", onMessageHandler);

let service = new TodosService();
function onMessageHandler(target: any, context: any, msg: any, self: any) {
	if (self) return;
	// admin only commands
	if (context.badges.broadcaster == "1") {
		console.log("broadcaster");
		if (msg.toLowerCase() === "!test") {
			client.say(target, `@${context.username}, test functional`);
		}
		if (msg.toLowerCase() === "!addtask") {
			//todo call createTodo somehow with content from command
			const payload = {
				id: new Date(),
				content: "test item 1",
				status: false,
				editing: false,
				subTasks: [],
			};
			let res = service.create(payload);
			client.say(target, `Task Added`);
		}
	}
}

routes.push(new TodosRoutes(app));

app.get("/", (req: express.Request, res: express.Response) => {
	res.status(200).send(`Server running at port ${port}`);
});

server.listen(port, () => {
	console.log(`Server running at port ${port}`);
	routes.forEach((route: CommonRoutesConfig) => {
		console.log(`Routes configured for ${route.getName()}`);
	});
});
