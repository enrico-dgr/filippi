import { User } from "../../types";
import { UserClient } from "../types";

export const mapUserToClient = (user: User): UserClient => ({
	id: user.id,
	name: user.name,
});
