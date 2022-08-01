import { Group, Image } from '@mantine/core';
import BackButton from 'Components/BackButton';
import { AppDispatch, RootState } from 'configStore';
import { formatCurrency } from 'Helpers/formatCurrency';
import { formatDate } from 'Helpers/formatDate';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
	getMovieShowTimes,
	setHeThongRapChieu,
	setLichDaChon,
	setRapDaChon,
} from 'Slices/cart';

const Checkout = () => {
	const { id, maHeThongRap, maCumRap, maLichChieu } = useParams();
	const dispatch = useDispatch<AppDispatch>();
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
		<div className="p-4">
			<BackButton />
			<h1>Thanh toán</h1>
			<hr />
			<Group mt={16} position="center">
				<div className="w-1/2 md:w-40">
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
						{gioChieu.toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit',
							hour12: false,
							day: '2-digit',
							month: 'short',
						})}
					</p>
					<div className="mt-4">
						{[...selectedSeats]
							.sort((a, b) => +a.stt - +b.stt)
							.map((seat) => (
								<p key={seat.maGhe}>
									Ghế {seat.tenGhe} ({seat.loaiGhe}):{' '}
									{formatCurrency(seat.giaVe)}
								</p>
							))}
						<p className="mt-4">
							Tổng:{' '}
							{formatCurrency(
								[...selectedSeats].reduce(
									(acc, curr) => (acc += curr.giaVe),
									0
								)
							)}
						</p>
					</div>
				</div>
			</Group>
		</div>
	);
};

export default Checkout;
