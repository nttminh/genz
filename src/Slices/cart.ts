import {
	createSlice,
	createAsyncThunk,
	PayloadAction,
	AsyncThunk,
} from '@reduxjs/toolkit';
import Movie, {
	CumRapChieu,
	HeThongRapChieu,
	LichChieuPhim,
	ShowTimes,
} from 'Interface/movie';
import { DanhSachGhe } from 'Interface/seats';
import movieAPI from '../Services/movieAPI';

interface State {
	movieShowTimes: ShowTimes | null;
	heThongRapChieu: HeThongRapChieu | null;
	rapDaChon: CumRapChieu | null;
	lichDaChon: LichChieuPhim | null;
	selectedSeats: DanhSachGhe[];
	isLoading: boolean;
	error: string | null;
}

const initialState: State = {
	movieShowTimes: null,
	heThongRapChieu: null,
	rapDaChon: null,
	lichDaChon: null,
	selectedSeats: [],
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
		setMovie: (state, action: PayloadAction<ShowTimes | null>) => {
			state.movieShowTimes = action.payload;
		},
		setRapDaChon: (state, action: PayloadAction<CumRapChieu | null>) => {
			state.rapDaChon = action.payload;
		},
		setLichDaChon: (state, action: PayloadAction<LichChieuPhim | null>) => {
			state.lichDaChon = action.payload;
		},
		setHeThongRapChieu: (
			state,
			action: PayloadAction<HeThongRapChieu | null>
		) => {
			state.heThongRapChieu = action.payload;
		},
		setSelectedSeats: (
			state,
			action: PayloadAction<DanhSachGhe[] | []>
		) => {
			state.selectedSeats = action.payload;
		},
		toggleSeat: (state, action: PayloadAction<DanhSachGhe>) => {
			const indexOfSeat = state.selectedSeats.findIndex(
				(ghe) => action.payload.maGhe === ghe.maGhe
			);
			if (indexOfSeat > -1) {
				state.selectedSeats.splice(indexOfSeat, 1);
			} else {
				state.selectedSeats.push(action.payload);
			}
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
export const {
	setMovie,
	toggleSeat,
	setRapDaChon,
	setHeThongRapChieu,
	setLichDaChon,
	setSelectedSeats,
} = cartSlice.actions;

// export reducer
export default cartSlice.reducer;
