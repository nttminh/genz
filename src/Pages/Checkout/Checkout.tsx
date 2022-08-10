import { Button, Group, Image, Radio } from '@mantine/core';
import { motion } from 'framer-motion';
import BackButton from 'Components/BackButton';
import { AppDispatch, RootState } from 'configStore';
import { formatCurrency } from 'Helpers/formatCurrency';
import { formatDate } from 'Helpers/formatDate';
import { DanhSachVe, DatVeBody } from 'Interface/cart';
import { DanhSachGhe } from 'Interface/seats';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import cartAPI from 'Services/cartAPI';
import {
	getMovieShowTimes,
	setHeThongRapChieu,
	setLichDaChon,
	setRapDaChon,
} from 'Slices/cart';

const Checkout = () => {
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

	const handleCheckout = async () => {
		if (maLichChieu) {
			const datVeBody: DatVeBody = {
				maLichChieu,
				danhSachVe: selectedSeats.map(function (seat) {
					return { maGhe: seat.maGhe, giaVe: seat.giaVe };
				}),
			};
			const data = await cartAPI.checkout(datVeBody);
			console.log(data);
			navigate('finish');
		}
	};

	const gioChieu = new Date(lichDaChon?.ngayChieuGioChieu!);
	return (
		<motion.div
			className="p-4"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<BackButton />
			<h1>Thanh toán</h1>
			<hr />
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
					<Radio.Group
						label="Hình thức thanh toán"
						required
						defaultChecked
						defaultValue="at-store"
					>
						<Radio
							checked
							value="at-store"
							label="Thanh toán tại quầy"
						/>
						<Radio
							value="card"
							label="VISA/MASTERCARD (đang bảo trì)"
							disabled
						/>
					</Radio.Group>
					<div className="my-4 text-center">
						<Button onClick={handleCheckout}>Thanh toán</Button>
					</div>
				</div>
			</Group>
		</motion.div>
	);
};

export default Checkout;
