type GameEventMap = {
	stats: {
		fps: string;
	};
};

type Listener<K extends keyof GameEventMap> = (data: GameEventMap[K]) => void;

const listeners: { [K in keyof GameEventMap]: Listener<K>[] } = {
	stats: [],
};

const addListener = <K extends keyof GameEventMap>(
	event: K,
	listener: Listener<K>
) => {
	listeners[event].push(listener);
};

const removeListener = <K extends keyof GameEventMap>(
	event: K,
	listener: Listener<K>
) => {
	const index = listeners[event].findIndex((l) => l === listener);

	if (index > -1) {
		listeners[event].splice(index, 1);
	}
};

const dispatch = <K extends keyof GameEventMap>(
	event: K,
	data: GameEventMap[K]
) => {
	listeners[event].forEach((l) => l(data));
};

export { addListener, removeListener, dispatch };
