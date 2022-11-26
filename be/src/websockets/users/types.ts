import { User } from "../types";

export type UserClient = Pick<User, "id" | "name">;
