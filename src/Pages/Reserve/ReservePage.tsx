import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMovieShowTimes } from 'Slices/cart';
import movieAPI from 'Services/movieAPI';
import { AnyAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from 'configStore';
import { H4 } from 'tabler-icons-react';

type Props = {};

const ReservePage = (props: Props) => {
	const { id } = useParams();
	const { movieShowTimes, isLoading, error } = useSelector(
		(state: RootState) => state.cart
	);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getMovieShowTimes(id!));
	}, []);

	return (
		<div className="p-4">
			<h1>{movieShowTimes?.tenPhim}</h1>
			<br />
			<hr />
			<br />
			<h2>Rạp đang chiếu</h2>
			<br />
			{movieShowTimes?.heThongRapChieu.map((hethongrapchieu) => (
				<div
					key={hethongrapchieu.maHeThongRap}
					className="flex pb-2 border-b-2 border-b-neutral-700 items-center"
				>
					<img
						src={hethongrapchieu.logo}
						alt=""
						className="w-10 h-10 mr-4"
					/>
					<h4>{hethongrapchieu.tenHeThongRap}</h4>
				</div>
			))}
		</div>
	);
};

export default ReservePage;
