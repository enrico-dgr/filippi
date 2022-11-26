import { Action } from "../types";

type SET_DATA = Action<"SET_DATA", { name: string }>;

export type ActionUser = SET_DATA;

export const actionValidators = {
	setData: (a: SET_DATA) => typeof a.payload.name === "string",
};
