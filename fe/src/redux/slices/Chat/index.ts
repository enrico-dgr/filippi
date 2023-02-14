import { createSlice } from '@reduxjs/toolkit';

type Message = {
	username: string;
	text: string;
	timestamp: string;
};

type Chat = {
	users: [];
	messages: Message[];
};

interface ChatState {
	isOpen: boolean;
	chats: Chat[];
	notifications: [];
}

const initialState: ChatState = { chats: [], isOpen: false, notifications: [] };

const modeChoiceSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		open: (state) => {
			state.isOpen = true;
		},
		close: (state) => {
			state.isOpen = false;
		},
	},
});

export const { open, close } = modeChoiceSlice.actions;
export default modeChoiceSlice.reducer;
