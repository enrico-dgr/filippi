import { MessageParsed, User } from "../types";
import { sendObjectToConnectionExt } from "../utils";
import { ActionUser, actionValidators } from "./actions";
import { mapUserToClient } from "./utils";

type MessageParsedUser = MessageParsed<"USER", { action: ActionUser }>;

// what reducer expects
type EntryDataUser = MessageParsedUser & {
	user: User;
};

const reducerUser = (data: EntryDataUser) => {
	let objResponse = {};

	// validation
	if (!data.action || !data.action.type) {
		// error type
		const message = "Invalid action object";
		console.warn(message);
		objResponse = { message };
		// send to user
		sendObjectToConnectionExt(objResponse)(data.user);
		return;
	}

	// reducer
	switch (data.action.type) {
		case "SET_DATA":
			if (actionValidators.setData(data.action)) {
				data.user.name = data.action.payload.name;
				console.log(data.action);
				objResponse = mapUserToClient(data.user);
			} else {
				objResponse = { message: "Invalid action for " + data.action.type };
			}

			break;
	}

	sendObjectToConnectionExt({ channel: data.channel, response: objResponse })(
		data.user
	);
};

export { reducerUser, EntryDataUser };
