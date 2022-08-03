import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DangNhapParams } from 'Interface/user';
import userAPI from 'Services/userAPI';

const initialState = {
	user: {},
	error: '',
};

// Viết actions login và register
export const login = createAsyncThunk(
	'auth/login',
	async (values: DangNhapParams) => {
		try {
			const data = await userAPI.login(values);
			return data;
		} catch (error) {
			throw error;
		}
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.user = {};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, { payload }) => {
			if (typeof payload === 'string') {
				state.error = payload;
				state.user = {};
			} else {
				state.user = payload;
				state.error = '';
			}
		});
	},
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
