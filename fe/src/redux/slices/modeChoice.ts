import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ModeChoiceState {
	name: string;
	description: string;
}

const initialState = { name: '', description: '' } as ModeChoiceState;

const modeChoiceSlice = createSlice({
	name: 'mode-choice',
	initialState,
	reducers: {
		set(
			state,
			action: PayloadAction<Pick<ModeChoiceState, 'name' | 'description'>>
		) {
			state.name = action.payload.name;
			state.description = action.payload.description;
		},
		reset(state) {
			state.name = '';
			state.description = '';
		},
	},
});

export const { set, reset } = modeChoiceSlice.actions;
export default modeChoiceSlice.reducer;
