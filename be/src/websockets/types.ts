import WebSocket from "ws";

export type Action<T extends string, P> = {
	type: T;
	payload: P;
};

export type MessageParsed<C extends string, D extends {}> = {
	channel: C;
} & D;

export type User = {
	id: number;
	name: string;
	connection: WebSocket.WebSocket;
};
