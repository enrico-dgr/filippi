import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import websockets from "./websockets";
import EnvVars from "./EnvVars";
import routes from "./routes";

const run = (NODE_ENV: "DEV" | "PROD") => {
	dotenv.config();

	process.env.NODE_ENV = NODE_ENV;

	const app = express();

	const port = EnvVars.get("SERVER_PORT");

	app.use(
		cors({
			origin: ["http://localhost:19000", "http://localhost:19006"],
		})
	);

	app.use(routes);

	const server = app.listen(port, () => {
		console.log(`Server listening at http://localhost:${port}`);
	});

	// websocket
	websockets(server);

	process.on("message", (_message) => {
		try {
			// const parsed = JSON.parse(message);
		} catch (error) {}
		// console.log(message);
	});
};

run("DEV");
