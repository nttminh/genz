import { Group, Image } from '@mantine/core';
import { AppDispatch, RootState } from 'configStore';
import { formatCurrency } from 'Helpers/formatCurrency';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
	getMovieShowTimes,
	setHeThongRapChieu,
	setLichDaChon,
	setRapDaChon,
} from 'Slices/cart';
import { CircleCheck } from 'tabler-icons-react';

type Props = {};

const Finish = (props: Props) => {
	const { id, maHeThongRap, maCumRap, maLichChieu } = useParams();
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const {
		movieShowTimes,
		rapDaChon,
		lichDaChon,
		heThongRapChieu,
		selectedSeats,
		isLoading,
		error,
	} = useSelector((state: RootState) => state.cart);

	console.log(rapDaChon, lichDaChon, selectedSeats);
	useEffect(() => {
		if (!movieShowTimes) {
			dispatch(getMovieShowTimes(id!));
		}
		if (!heThongRapChieu) {
			let tempHeThongRapChieu = movieShowTimes?.heThongRapChieu.find(
				(show) => show.maHeThongRap === maHeThongRap
			)!;
			dispatch(setHeThongRapChieu(tempHeThongRapChieu));
		}
		if (!rapDaChon) {
			let tempRapDaChon = heThongRapChieu?.cumRapChieu.find(
				(cumRapChieu) => cumRapChieu.maCumRap === maCumRap
			)!;
			dispatch(setRapDaChon(tempRapDaChon));
		}
		if (!lichDaChon) {
			let tempLichDaChon = rapDaChon?.lichChieuPhim.find(
				(lich) => lich.maLichChieu === maLichChieu
			)!;
			dispatch(setLichDaChon(tempLichDaChon));
		}
	}, [movieShowTimes, heThongRapChieu, rapDaChon, lichDaChon]);
	const gioChieu = new Date(lichDaChon?.ngayChieuGioChieu!);
	return (
		<div className="p-4 text-center">
			<CircleCheck
				size={72}
				strokeWidth={2}
				color="red"
				className="mx-auto"
			/>
			<h1>Cảm ơn bạn đã đặt vé!</h1>
			<hr className="w-1/2 mx-auto my-2" />
			<Group mt={16} position="center">
				<div className=" md:w-40">
					<Image
						radius="md"
						src={movieShowTimes?.hinhAnh}
						alt="Random unsplash image"
					/>
				</div>
				<div>
					<h2>{movieShowTimes?.tenPhim}</h2>
					<p>{rapDaChon && rapDaChon?.tenCumRap}</p>
					<p>
						{lichDaChon?.tenRap}, vào lúc{' '}
						{gioChieu.toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit',
							hour12: false,
							day: '2-digit',
							month: 'short',
						})}
					</p>
					<div className="mt-4 border-y py-2">
						{[...selectedSeats]
							.sort((a, b) => +a.stt - +b.stt)
							.map((seat) => (
								<p key={seat.maGhe}>
									Ghế {seat.tenGhe} ({seat.loaiGhe}):{' '}
									{formatCurrency(seat.giaVe)}
								</p>
							))}
						{selectedSeats.length === 0 && (
							<p>Chưa có ghế nào được chọn</p>
						)}
					</div>
					<p className="my-4">
						Tổng:{' '}
						{formatCurrency(
							[...selectedSeats].reduce(
								(acc, curr) => (acc += curr.giaVe),
								0
							)
						)}
						{selectedSeats.length === 0 && <span>0 VND</span>}
					</p>

					<div className="my-4 text-center">
						{/* <Button onClick={handleCheckout}>Thanh toán</Button> */}
					</div>
				</div>
			</Group>
		</div>
	);
};

export default Finish;
