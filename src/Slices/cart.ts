import {
	createSlice,
	createAsyncThunk,
	PayloadAction,
	AsyncThunk,
} from '@reduxjs/toolkit';
import Movie, { ShowTimes } from 'Interface/movie';
import movieAPI from '../Services/movieAPI';

interface State {
	movieShowTimes: ShowTimes | null;
	isLoading: boolean;
	error: string | null;
}

const initialState: State = {
	movieShowTimes: null,
	isLoading: false,
	error: null,
};

// thunk actions
export const getMovieShowTimes: AsyncThunk<ShowTimes, string, {}> =
	createAsyncThunk('cart/getMovieShowTimes', async (movieId: string) => {
		try {
			const data = await movieAPI.getMovieShowTimes(movieId);
			return data;
		} catch (error) {
			throw error;
		}
	});

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setMovie: (state, action: PayloadAction<ShowTimes>) => {
			state.movieShowTimes = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getMovieShowTimes.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getMovieShowTimes.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.movieShowTimes = payload;
		});
		builder.addCase(getMovieShowTimes.rejected, (state, { error }) => {
			state.isLoading = false;
			state.error = error as any;
		});
	},
});

// export actions
export const { setMovie } = cartSlice.actions;

// export reducer
export default cartSlice.reducer;
