import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ToastState {
	type: 'unset' | 'error';
	message: string;
}

const initialState = { type: 'unset', message: '' } as ToastState;

const toastSlice = createSlice({
	name: 'toast',
	initialState,
	reducers: {
		set(
			state,
			action: PayloadAction<Pick<ToastState, 'type' | 'message'>>
		) {
			state.type = action.payload.type;
			state.message = action.payload.message;
		},
		reset(state) {
			state.type = 'unset';
			state.message = '';
		},
	},
});

export const { set, reset } = toastSlice.actions;
export default toastSlice.reducer;
