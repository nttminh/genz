import Movie, { ShowTimes } from 'Interface/movie';
import { SeatAvailabilitiesResponse } from 'Interface/seats';
import axiosClient from './axiosClient';

const movieAPI = {
	getMovieShowing: () => {
		// Khai báo hàm call API dữ liệu trả về là Movie[]
		return axiosClient.get<Movie[]>('QuanLyPhim/LayDanhSachPhim');
	},
	getMovieDetails: (movieId: string) => {
		return axiosClient.get<Movie>('QuanLyPhim/LayThongTinPhim', {
			params: {
				maPhim: movieId,
			},
		});
	},
	getMovieShowTimes: (movieId: string) => {
		return axiosClient.get<ShowTimes>(
			'QuanLyRap/LayThongTinLichChieuPhim',
			{
				params: {
					maPhim: movieId,
				},
			}
		);
	},
	getSeatAvailabilities: (maLichChieu: string) => {
		return axiosClient.get<SeatAvailabilitiesResponse>('QuanLyDatVe/LayDanhSachPhongVe', {
			params: {
				MaLichChieu: maLichChieu
			}
		})
	}
		
	// Và những còn lại liên quan đến movie...
};

export default movieAPI;
