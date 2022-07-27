import BackButton from 'Components/BackButton';
import { AppDispatch, RootState } from 'configStore';
import { CumRapChieu, HeThongRapChieu } from 'Interface/movie';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMovieShowTimes } from 'Slices/cart';
import movieAPI from 'Services/movieAPI';
import { SeatAvailabilitiesResponse } from 'Interface/seats';
import Skeleton from 'react-loading-skeleton';
import { Button, Checkbox, Group } from '@mantine/core';
import { Armchair } from 'tabler-icons-react';
import Seat from './Components/Seat';

type Props = {};

const SeatSelectPage = (props: Props) => {
	const { id, maHeThongRap, maCumRap, maLichChieu } = useParams();
	const { movieShowTimes, isLoading, error } = useSelector(
		(state: RootState) => state.cart
	);
	const dispatch = useDispatch<AppDispatch>();
	// const heThongRapChieu: HeThongRapChieu =
	// 	movieShowTimes?.heThongRapChieu.find(
	// 		(show) => show.maHeThongRap === maHeThongRap
	// 	)!;

	const [heThongRapChieu, setHeThongRapChieu] = useState(
		movieShowTimes?.heThongRapChieu.find(
			(show) => show.maHeThongRap === maHeThongRap
		)!
	);
	// const rapDaChon: CumRapChieu = heThongRapChieu?.cumRapChieu.find(
	// 	(cumRapChieu) => cumRapChieu.maCumRap === maCumRap
	// )!;
	const [rapDaChon, setRapDaChon] = useState(
		heThongRapChieu?.cumRapChieu.find(
			(cumRapChieu) => cumRapChieu.maCumRap === maCumRap
		)!
	);

	const [seatResponse, setSeatResponse] =
		useState<SeatAvailabilitiesResponse>();

	useEffect(() => {
		if (!movieShowTimes) {
			dispatch(getMovieShowTimes(id!));
		}

		async function fetchData() {
			const data = await movieAPI.getSeatAvailabilities(maLichChieu!);
			setSeatResponse(data);
		}
		fetchData();
	}, []);

	return (
		<div className="p-4">
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
					{seatResponse?.danhSachGhe.map((ghe) => (
						<Seat key={ghe.maGhe} ghe={ghe} />
					))}
				</>
			</Group>
		</div>
	);
};

export default SeatSelectPage;
