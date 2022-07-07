import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Movie } from '../Interface/movie';
import movieAPI from '../Services/movieAPI';

interface State {
	movies: Movie[];
	movieBanner: Movie | null;
	isLoading: boolean;
	error: string | null;
}

const initialState: State = {
	movies: [],
	movieBanner: null,
	isLoading: false,
	error: null,
};

// thunk actions
export const getMovieShowing = createAsyncThunk(
	'movie/getMovieShowing',
	async () => {
		try {
			const data = await movieAPI.getMovieShowing();
			return data;
		} catch (error) {
			throw error;
		}
	}
);

const movieSlice = createSlice({
	name: 'movie',
	initialState,
	reducers: {
		randomizeMovieBanner: (state, action) => {
			const randomNumber = Math.floor(
				Math.random() * state.movies.length
			);
			state.movieBanner = state.movies[randomNumber];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getMovieShowing.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getMovieShowing.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.movies = payload;
		});
		builder.addCase(getMovieShowing.rejected, (state, { error }) => {
			state.isLoading = false;
			state.error = error as any;
		});
	},
});

// export actions

// export reducer
export default movieSlice.reducer;
