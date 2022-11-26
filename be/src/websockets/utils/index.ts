import { User } from "../types";

export const sendObjectToConnectionExt = (obj: {}) => (
	connectionExtended: User
) => connectionExtended.connection.send(JSON.stringify(obj));
