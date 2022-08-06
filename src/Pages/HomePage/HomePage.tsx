import { AppDispatch } from 'configStore';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
	setHeThongRapChieu,
	setLichDaChon,
	setMovie,
	setRapDaChon,
	setSelectedSeats,
} from 'Slices/cart';
import Banner from './Components/Banner';
import MovieShowing from './Components/MovieShowing';

type Props = {};

const HomePage = (props: Props) => {
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(setMovie(null));
		dispatch(setRapDaChon(null));
		dispatch(setLichDaChon(null));
		dispatch(setHeThongRapChieu(null));
		dispatch(setSelectedSeats([]));
	}, []);

	return (
		<div>
			<Banner />
			<h3 id="now" className="ml-5 font-bold">
				Phim đang chiếu
			</h3>
			<MovieShowing />
			<br />
			<h3 id="hotThisWeek" className="ml-5 font-bold">
				Hot tuần này
			</h3>
			<MovieShowing initialSlide={5} />
		</div>
	);
};

export default HomePage;
