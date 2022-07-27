export interface SeatAvailabilitiesResponse {
	thongTinPhim: ThongTinPhim;
	danhSachGhe: DanhSachGhe[];
}

export interface DanhSachGhe {
	maGhe: number;
	tenGhe: string;
	maRap: number;
	loaiGhe: LoaiGhe;
	stt: string;
	giaVe: number;
	daDat: boolean;
	taiKhoanNguoiDat: string | null;
}

export enum LoaiGhe {
	Thuong = 'Thuong',
	Vip = 'Vip',
}

export interface ThongTinPhim {
	maLichChieu: number;
	tenCumRap: string;
	tenRap: string;
	diaChi: string;
	tenPhim: string;
	hinhAnh: string;
	ngayChieu: string;
	gioChieu: string;
}
