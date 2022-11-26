import { Server } from "http";
import queryString from "querystring";
import WebSocket from "ws";
import { getAutoIncrementID } from "../utils/array";
import { EntryDataLobby, reducerLobby } from "./lobbies";
import { sendObjectToConnectionExt } from "./utils";
import { User } from "./types";
import { EntryDataUser, reducerUser } from "./users";
import { mapUserToClient } from "./users/utils";

type EntryDataGeneric = EntryDataLobby | EntryDataUser;

const reducer = (message: EntryDataGeneric) => {
	switch (message.channel) {
		case "LOBBY":
			reducerLobby(message);
			return;

		case "USER":
			reducerUser(message);
			return;
	}
};

const users: User[] = [];

export default async (expressServer: Server) => {
	// creating websocket server
	const websocketServer = new WebSocket.Server({
		// no http server alongside the websocket server is needed
		noServer: true,
		path: "/websockets",
	});

	// upgrade http connection to a websocket one
	expressServer.on("upgrade", (request, socket, head) => {
		websocketServer.handleUpgrade(request, socket, head, (websocket) => {
			// emit the upgraded connection to be handled ( see below )
			websocketServer.emit("connection", websocket, request);
		});
	});

	// handle websocket connection ( upgraded from http above )
	websocketServer.on(
		"connection",
		function connection(websocketConnection, connectionRequest) {
			// good-to-know part
			if (!connectionRequest.url) {
				console.warn(
					"No url to extract params from. ( on websocket connection handler)"
				);
				return;
			}

			const [_path, params] = connectionRequest.url.split("?");
			const connectionParams = queryString.parse(params);
			// TODO: add to `parsedMessage`
			connectionParams;
			// NOTE: connectParams are not used here but good to understand how to get
			// to them if you need to pass data with the connection to identify it (e.g., a userId).

			// end of good-to-know part
			const newId = getAutoIncrementID(users);
			const position =
				users.push({
					connection: websocketConnection,
					id: newId,
					name: `Guest${newId}`,
				}) - 1;

			// send default data to user on open
			sendObjectToConnectionExt({
				channel: "USER",
				response: mapUserToClient(users[position]),
			})(users[position]);
			console.log(mapUserToClient(users[position]));

			websocketConnection.on("message", (message) => {
				let parsedMessage;
				try {
					parsedMessage = JSON.parse(message.toString());
				} catch (error) {
					console.warn("Invalid data format. Error: ", error);
					sendObjectToConnectionExt({
						channel: "unknown",
						message: "Invalid data format.",
					})(users[position]);
				}

				if (
					!!parsedMessage &&
					!!parsedMessage.channel &&
					!parsedMessage.connection
				) {
					// adding current connection
					reducer({
						...parsedMessage,
						user: users[position],
					});
				}
			});
		}
	);

	return websocketServer;
};
