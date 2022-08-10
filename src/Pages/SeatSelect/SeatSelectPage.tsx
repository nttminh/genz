import BackButton from 'Components/BackButton';
import { AppDispatch, RootState } from 'configStore';
import { CumRapChieu, HeThongRapChieu } from 'Interface/movie';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import movieAPI from 'Services/movieAPI';
import { SeatAvailabilitiesResponse } from 'Interface/seats';
import Skeleton from 'react-loading-skeleton';
import { Alert, Button, Checkbox, Group, Notification } from '@mantine/core';
import { AlertCircle, Armchair, ShoppingCartX } from 'tabler-icons-react';
import Seat from './Components/Seat';
import {
	getMovieShowTimes,
	setHeThongRapChieu,
	setRapDaChon,
} from 'Slices/cart';

type Props = {};

const SeatSelectPage = (props: Props) => {
	const navigate = useNavigate();
	const { id, maHeThongRap, maCumRap, maLichChieu } = useParams();
	const {
		movieShowTimes,
		selectedSeats,
		heThongRapChieu,
		rapDaChon,
		isLoading,
		error,
	} = useSelector((state: RootState) => state.cart);
	const dispatch = useDispatch<AppDispatch>();
	const [seatResponse, setSeatResponse] =
		useState<SeatAvailabilitiesResponse>();

	const [isOneSeatExists, setIsOneSeatExists] = useState(true);

	useEffect(() => {
		if (!movieShowTimes) {
			dispatch(getMovieShowTimes(id!));
		}

		async function fetchData() {
			const data = await movieAPI.getSeatAvailabilities(maLichChieu!);
			let tempSelectedSeats: number[] = [];
			if (selectedSeats.length !== 0) {
				for (let i = 0; i < selectedSeats.length; i++) {
					const element = selectedSeats[i];
					tempSelectedSeats = [...tempSelectedSeats, element.maGhe];
				}
			}
			data.danhSachGhe = data.danhSachGhe.map((seat) => {
				if (tempSelectedSeats.includes(seat.maGhe)) {
					seat.isLocallySelected = true;
				}
				return seat;
			});

			setSeatResponse(data);
		}
		fetchData();

		if (!rapDaChon) {
			let tempRapDaChon = heThongRapChieu?.cumRapChieu.find(
				(cumRapChieu) => cumRapChieu.maCumRap === maCumRap
			)!;
			dispatch(setRapDaChon(tempRapDaChon));
		}
		if (!heThongRapChieu) {
			let tempHeThongRapChieu = movieShowTimes?.heThongRapChieu.find(
				(show) => show.maHeThongRap === maHeThongRap
			)!;
			dispatch(setHeThongRapChieu(tempHeThongRapChieu));
		}
	}, []);

	const handleCheckout = () => {
		if (selectedSeats.length) {
			console.log(selectedSeats);
			setIsOneSeatExists(true);
			navigate('checkout');
		} else {
			setIsOneSeatExists(false);
		}
	};

	return (
		<motion.div
			className="p-4"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<BackButton />
			<h1>{movieShowTimes?.tenPhim}</h1>
			<h3>{rapDaChon?.tenCumRap}</h3>
			<h3>
				Suất chiếu:{' '}
				{seatResponse?.thongTinPhim.gioChieu || (
					<Skeleton width={50} inline />
				)}{' '}
				{seatResponse?.thongTinPhim.ngayChieu || (
					<Skeleton width={120} />
				)}
			</h3>
			<hr className="mt-2" />
			<p className="text-center">Màn hình</p>
			<hr />
			<Group className="mt-2" align="center" position="apart">
				<>
					{!seatResponse &&
						Array.from(Array(60).keys()).map((number: number) => (
							<Skeleton key={number} width={46} height={40} />
						))}
					{seatResponse?.danhSachGhe.slice(0, 90).map((ghe) => (
						<Seat key={ghe.maGhe} ghe={ghe} />
					))}
				</>
			</Group>
			<Group mt={16} position="center">
				<Button radius="sm" onClick={handleCheckout}>
					Đến giỏ hàng
				</Button>
			</Group>

			{!isOneSeatExists && (
				<Alert
					mt={16}
					icon={<AlertCircle />}
					withCloseButton
					closeButtonLabel="Close alert"
					radius="sm"
				>
					Bạn chưa chọn ghế nào
				</Alert>
			)}
		</motion.div>
	);
};

export default SeatSelectPage;
