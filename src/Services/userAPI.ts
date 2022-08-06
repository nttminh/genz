import { DangKiParams, DangNhapParams } from 'Interface/user';
import axiosClient from './axiosClient';

const userAPI = {
	register: (registerInfo: DangKiParams) => {
		return axiosClient.post<DangKiParams | string>(
			'QuanLyNguoiDung/DangKy',
			{
				...registerInfo,
			}
		);
	},
	login: (loginInfo: DangNhapParams) => {
		return axiosClient.post<DangKiParams | string>(
			'QuanLyNguoiDung/DangNhap',
			loginInfo
		);
	},

	// Và những còn lại liên quan đến user...
};

export default userAPI;
