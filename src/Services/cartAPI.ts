import { DatVeBody } from 'Interface/cart';
import { DangKiParams, DangNhapParams } from 'Interface/user';
import axiosClient from './axiosClient';

const cartAPI = {
	checkout: (seatsInfo: DatVeBody) => {
		return axiosClient.post<string>('QuanLyDatVe/DatVe', {
			...seatsInfo,
		});
	},
	// Và những còn lại liên quan đến user...
};

export default cartAPI;
