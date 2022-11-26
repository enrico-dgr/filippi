import * as GE from "space-rock-scissor-paper-game-engine";

import { User } from "../types";
import { UserClient } from "../users/types";

export type UserLobby = User & {
	move: GE.types.Move | null;
};

export type Lobby = {
	connectionCreator: User;
	id: number;
	game: GE.types.Game;
	name: string;
	connectionsSubscribed: UserLobby[];
};
// name creator
// player number
// max player number
export type LobbyClient = Pick<Lobby, "game" | "id" | "name"> & {
	creator: UserClient;
	users: UserClient[];
};
