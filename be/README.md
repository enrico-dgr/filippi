# Poor Seagull BE

## Usage

`npm install` to install dependencies.

`npm run server:ts` to run development server watching for changes in `src` directory.

## WebSocket EndPoints

### Generic usage

```ts
const wss = new WebSocket("ws://localhost:3000/websockets");

wss.onopen = () =>
	wss.send(
		JSON.stringify({
			text: "Message from client to server",
		})
	);

// or, if the connection is already opened
wss.send(
	JSON.stringify({
		text: "Message from client to server",
	})
);
```

### Lobbies

```ts
const gameWss = new WebSocket("ws://localhost:3000/websockets");

// generic lobby's action
const messageObj = {
    channel: "LOBBY",
    action: {
        ....
    }
}

wss.onopen = () =>
	wss.send(
		JSON.stringify(messageObj)
	);

// ACTION TYPES

// show all lobbies
const action = {
	type: "SHOW_ALL",
	payload: {},
};

// create new lobby ( you will be the owner )
const action = {
	type: "CREATE",
	payload: {
		// see `space-rock-scissor-paper-game-engine` for available numbers
		playerNum: 2,
		maxMatchVictories: 3,
	},
};

// join existing lobby
const action = {
	type: "JOIN",
	payload: {
		// game id
		id: 0,
	},
};

// exit from current lobby
const action = {
	type: "EXIT",
	payload: {
		// game id
		id: 0,
	},
};
```
