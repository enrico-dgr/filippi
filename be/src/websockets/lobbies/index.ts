import * as GE from "space-rock-scissor-paper-game-engine";
import { getAutoIncrementID } from "../../utils/array";

import { User, MessageParsed } from "../types";
import { ActionLobby, actionValidators } from "./actions";
import { Lobby, LobbyClient } from "./types";
import { mapLobbyToClient } from "./utils";
import { sendObjectToConnectionExt } from "../utils";
import { mapUserToClient } from "../users/utils";
import { Move } from "space-rock-scissor-paper-game-engine/lib/types";
import { getRandomMove } from "space-rock-scissor-paper-game-engine/lib/utils";

let lobbies: Lobby[] = [];
// users watching for lobbies
let listenersShowAll: User[] = [];

// what client sends
type MessageParsedLobby = MessageParsed<"LOBBY", { action: ActionLobby }>;

// what reducer expects
type EntryDataLobby = MessageParsedLobby & {
	user: User;
};

const emptyLobby: LobbyClient = {
	game: {
		matches: [],
		maxMatchVictories: -1,
		playerNum: 2,
		players: [],
		phase: 0,
		phaseTot: 0,
		winnerId: null,
	},
	users: [],
	creator: {
		name: "",
		id: -1,
	},
	name: "",
	id: -1,
};

const reducerLobby = (data: EntryDataLobby) => {
	let objResponse = {};
	let updateListenersShowAll = false;
	let usersToUpdate: User[] = [data.user];

	// validation
	if (!data.action || !data.action.type) {
		// error type
		const message = "Invalid action object";
		console.warn(message);
		objResponse = { message };
		// send to user
		sendObjectToConnectionExt({ channel: data.channel, response: objResponse })(
			data.user
		);
		return;
	}

	// reducer
	switch (data.action.type) {
		case "SHOW_ALL":
			if (actionValidators.showAll(data.action)) {
				// sends all created lobbies
				objResponse = { allLobbies: lobbies.map(mapLobbyToClient) };
			} else {
				objResponse = { message: "Invalid action for " + data.action.type };
				break;
			}

			if (data.action.payload.show) {
				// add to listeners
				listenersShowAll.push(data.user);
			} else {
				// remove from listeners
				listenersShowAll = listenersShowAll.filter(
					(user_) => user_.id !== data.user.id
				);
			}
			break;
		case "CREATE":
			if (actionValidators.create(data.action)) {
				const pos =
					lobbies.push({
						connectionCreator: data.user,
						game: GE.constructors.create(data.action.payload),
						id: getAutoIncrementID(lobbies),
						name: data.action.payload.name,
						connectionsSubscribed: [{ ...data.user, move: null }],
					}) - 1;

				updateListenersShowAll = true;
				objResponse = mapLobbyToClient(lobbies[pos]);
			} else {
				objResponse = { message: "Invalid action for " + data.action.type };
				break;
			}

			break;

		case "JOIN":
			if (!actionValidators.join(data.action)) {
				objResponse = { message: "Invalid action for " + data.action.type };
				break;
			}

			const lobbyIdJoin = data.action.payload.id;
			const lobbyJoin = lobbies.find((lobby_) => lobby_.id === lobbyIdJoin);

			if (!lobbyJoin) {
				objResponse = emptyLobby;
				break;
			}

			if (lobbyJoin.connectionsSubscribed.length >= lobbyJoin.game.playerNum) {
				objResponse = { message: data.action.type + ": Full room." };
				break;
			}

			if (
				// game is already started
				lobbyJoin.game.phase > 0
			) {
				objResponse = { message: data.action.type + ": Game started." };
				break;
			}

			lobbyJoin.connectionsSubscribed.push({ ...data.user, move: null });

			updateListenersShowAll = true;
			objResponse = mapLobbyToClient(lobbyJoin);
			usersToUpdate = [...lobbyJoin.connectionsSubscribed];
			break;

		case "EXIT":
			if (actionValidators.exit(data.action)) {
				objResponse = emptyLobby;
			} else {
				objResponse = { message: "Invalid action for " + data.action.type };
				break;
			}

			const lobbyIdExit = data.action.payload.id;

			let playerPositionExit = -1;
			const lobbyToExit = lobbies.find((lobby_) => {
				// find lobby
				if (lobby_.id === lobbyIdExit) {
					// eventually check if user is in the lobby
					playerPositionExit = lobby_.connectionsSubscribed.findIndex(
						(connectionUser) => connectionUser.id === data.user.id
					);
				}
				return (
					// eventually check if user is in the lobby
					playerPositionExit > -1
				);
			});

			if (!lobbyToExit) {
				// player not found, some error occurred,
				// just return empty lobby
				objResponse = emptyLobby;
				break;
			}

			// remove player from connections
			lobbyToExit.connectionsSubscribed = lobbyToExit.connectionsSubscribed.filter(
				(conn) => conn.id !== data.user.id
			);

			// if no player remains, delete lobby
			if (lobbyToExit.connectionsSubscribed.length < 1) {
				lobbies = lobbies.filter((lobby_) => lobby_.id !== lobbyToExit.id);
			}
			// if player is the creator, select the next one as owner
			else if (lobbyToExit.connectionCreator.id === data.user.id) {
				lobbyToExit.connectionCreator = lobbyToExit.connectionsSubscribed[0];
			}

			objResponse = mapLobbyToClient(lobbyToExit);
			updateListenersShowAll = true;
			usersToUpdate = [...lobbyToExit.connectionsSubscribed];
			sendObjectToConnectionExt({
				channel: data.channel,
				response: emptyLobby,
			})(data.user);
			break;
		case "GAME_START":
			console.log(data.action);
			if (!actionValidators.start(data.action)) {
				objResponse = { message: "Invalid action for " + data.action.type };
				break;
			}

			const lobbyStartId = data.action.payload.id;
			const lobbyStart = lobbies.find(
				(lobby_) =>
					// find lobby
					lobby_.id === lobbyStartId &&
					// game must not have matches ( otherwise is already started )
					lobby_.game.matches.length < 1
			);

			if (!lobbyStart) {
				objResponse = emptyLobby;
				break;
			}

			lobbyStart.game = GE.constructors.createPlayers(
				lobbyStart.connectionsSubscribed.map(mapUserToClient),
				lobbyStart.game
			);

			lobbyStart.game.players = GE.actions.scrumblePlayers(
				lobbyStart.game.players
			);

			lobbyStart.game = GE.constructors.createMatches(lobbyStart.game);

			lobbyStart.game = GE.actions.playBotMatches(lobbyStart.game);

			objResponse = mapLobbyToClient(lobbyStart);

			updateListenersShowAll = true;
			usersToUpdate = [...lobbyStart.connectionsSubscribed];
			break;

		case "GAME_SET_MOVE":
			if (!actionValidators.setMove(data.action)) {
				objResponse = { message: "Invalid action for " + data.action.type };
				break;
			}

			const lobbyIdSetMove = data.action.payload.id;
			const lobbySetMove = lobbies.find(
				(lobby_) =>
					// find lobby
					lobby_.id === lobbyIdSetMove
			);

			if (!lobbySetMove) {
				objResponse = emptyLobby;
				break;
			}

			// check if the match exists
			const matchSetMove = lobbySetMove.game.matches.find(
				(m) =>
					(m.playerOne.id === data.user.id ||
						m.playerTwo.id === data.user.id) &&
					m.winnerId === null
			);

			if (!matchSetMove) {
				objResponse = emptyLobby;
				break;
			}

			const userSetMove = lobbySetMove.connectionsSubscribed.find(
				(u) => u.id === data.user.id
			);

			if (!userSetMove) {
				objResponse = emptyLobby;
				break;
			}

			const enemyPlayer =
				matchSetMove.playerOne.id !== data.user.id
					? matchSetMove.playerOne
					: matchSetMove.playerTwo;

			console.log(data.user.id);
			console.log(data.user.name);
			console.log(enemyPlayer);

			let moveOne: Move | null = null;
			let moveTwo: Move | null = null;

			// move already saved, waiting for enemy
			if (userSetMove.move !== null) {
				const message = "Move already saved, waiting for enemy move";
				objResponse = { message };
				break;
			} else if (enemyPlayer.type === "human") {
				const enemyUserSetMove = lobbySetMove.connectionsSubscribed.find(
					(u) => u.id === enemyPlayer.id
				);
				console.log("human");
				if (!enemyUserSetMove) {
					objResponse = emptyLobby;
					break;
				}

				// if there is no enemy move, save user move
				if (enemyUserSetMove.move === null) {
					console.log("move null");
					userSetMove.move = data.action.payload.move;
				}
				// otherwise set moves
				else {
					console.log("move present");
					if (matchSetMove.playerOne.id === data.user.id) {
						moveOne = data.action.payload.move;
						moveTwo = enemyUserSetMove.move;
					} else {
						moveOne = enemyUserSetMove.move;
						moveTwo = data.action.payload.move;
					}
					//  and remove saved enemy move
					enemyUserSetMove.move = null;
				}
			}
			// enemy is a bot
			else {
				console.log("bot");
				if (matchSetMove.playerOne.id === data.user.id) {
					moveOne = data.action.payload.move;
					moveTwo = getRandomMove();
				} else {
					moveOne = getRandomMove();
					moveTwo = data.action.payload.move;
				}
			}
			console.log("before play");
			console.log(moveOne);
			console.log(moveTwo);
			if (!!moveOne && !!moveTwo) {
				console.log("play");
				lobbySetMove.game = GE.actions.playMatch(
					moveOne,
					moveTwo,
					data.user.id,
					lobbySetMove.game
				);

				userSetMove.move = null;
			}

			while (
				lobbySetMove.game.matches
					.filter(
						(m) => m.playerOne.type === "human" || m.playerTwo.type === "human"
					)
					.findIndex((m) => m.winnerId === null) < 0
			) {
				lobbySetMove.game = GE.actions.playBotMatches(lobbySetMove.game);

				// last match with no humans
				if (GE.utils.phaseIsEnded(lobbySetMove.game)) {
					break;
				}
			}

			objResponse = mapLobbyToClient(lobbySetMove);
			usersToUpdate = [...lobbySetMove.connectionsSubscribed];
			break;
	}
	console.log(data.action);
	if (updateListenersShowAll) {
		listenersShowAll.forEach(
			sendObjectToConnectionExt({
				channel: data.channel,
				response: { allLobbies: lobbies.map(mapLobbyToClient) },
			})
		);
	}

	usersToUpdate.forEach(
		sendObjectToConnectionExt({ channel: data.channel, response: objResponse })
	);
};

export { reducerLobby, EntryDataLobby };
