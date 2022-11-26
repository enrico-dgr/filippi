import * as GE from "space-rock-scissor-paper-game-engine";
import { Action } from "../types";

type SHOW_ALL = Action<
	"SHOW_ALL",
	{
		show: boolean;
	}
>;

type CREATE = Action<
	"CREATE",
	Pick<GE.types.Game, "playerNum" | "maxMatchVictories"> & { name: string }
>;

type JOIN = Action<"JOIN", { id: number }>;

type EXIT = Action<"EXIT", { id: number }>;

type GAME_START = Action<"GAME_START", { id: number }>;

type GAME_SET_MOVE = Action<
	"GAME_SET_MOVE",
	{ id: number; move: GE.types.Move }
>;

export type ActionLobby =
	| SHOW_ALL
	| CREATE
	| JOIN
	| EXIT
	| GAME_START
	| GAME_SET_MOVE;

const isValidId = (id: any): boolean => typeof id === "number" && id > -1;

export const actionValidators = {
	showAll: (a: SHOW_ALL) => typeof a.payload.show === "boolean",
	create: (a: CREATE) =>
		typeof a.payload.playerNum === "number" &&
		[2, 4, 8, 16].includes(a.payload.playerNum) &&
		typeof a.payload.maxMatchVictories === "number" &&
		a.payload.maxMatchVictories > 0,
	join: (a: JOIN) => isValidId(a.payload.id),
	exit: (a: EXIT) => isValidId(a.payload.id),
	start: (a: GAME_START) => isValidId(a.payload.id),
	setMove: (a: GAME_SET_MOVE) =>
		isValidId(a.payload.id) &&
		["rock", "scissors", "paper"].includes(a.payload.move),
};
