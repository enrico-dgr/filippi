import fs from "fs";
import path from "path";
import { User } from "../types";
import { mapUserToClient } from "../users/utils";
import { Lobby, LobbyClient } from "./types";

export const mapLobbyToClient = (lobby: Lobby): LobbyClient => ({
	game: lobby.game,
	id: lobby.id,
	name: lobby.name,
	creator: mapUserToClient(lobby.connectionCreator),
	users: lobby.connectionsSubscribed.map(mapUserToClient),
});

export const pushConnectionToJsonFile = (connection: User) =>
	fs.readFile(
		path.resolve(__dirname, "./tests/fixtures.json"),
		"utf8",
		function readFileCallback(err, data) {
			if (err) {
				console.log(err);
				return;
			}

			const fixtures = JSON.parse(data);

			// validate object
			if (typeof fixtures !== "object" || !fixtures.connections) {
				return;
			}

			// add connection
			fixtures.connections.push(connection);

			const json = JSON.stringify(fixtures);
			fs.writeFile(
				path.resolve(__dirname, "./tests/fixtures.json"),
				json,
				"utf8",
				() => console.log("connection fixture saved")
			);
		}
	);
