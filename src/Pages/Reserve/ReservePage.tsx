import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Menu } from '@mantine/core';
import { getMovieShowTimes } from 'Slices/cart';
import { AppDispatch, RootState } from 'configStore';
import { Settings } from 'tabler-icons-react';
import { formatDate } from 'Helpers/formatDate';
import { HeThongRapChieu } from 'Interface/movie';
import CinemaSelection from './Components/CinemaSelection';
import { Link } from 'react-router-dom';

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

	useEffect(() => {
		console.log(movieShowTimes);
	}, [movieShowTimes]);

	const handleOnClick = (hethongrapchieu: HeThongRapChieu) => {
		console.log(hethongrapchieu);
	};

	return (
		<div className="p-4">
			<h1>{movieShowTimes?.tenPhim}</h1>
			<p>Ngày khởi chiếu: {formatDate(movieShowTimes?.ngayKhoiChieu)}</p>
			<br />
			<hr />
			<br />
			<h2>Rạp đang chiếu</h2>
			<br />
			{movieShowTimes?.heThongRapChieu.map((heThongRapChieu) => (
				<div key={heThongRapChieu.maHeThongRap}>
					<Menu
						control={
							<CinemaSelection
								heThongRapChieu={heThongRapChieu}
								handleOnClick={handleOnClick}
							/>
						}
						withArrow
						styles={(theme) => ({
							root: {
								width: '100%',
							},
							body: {
								backgroundColor: theme.colors.dark[7],
							},
							arrow: {
								fill: theme.colors.dark[7],
							},
						})}
						size="xl"
						transition="scale"
						transitionDuration={200}
						transitionTimingFunction="ease"
					>
						{heThongRapChieu.cumRapChieu.map((cumRapChieu) => (
							<Menu.Item
								key={cumRapChieu.maCumRap}
								// icon={<Settings size={14} />}
								component={Link}
								to={cumRapChieu.maCumRap}
							>
								{cumRapChieu.tenCumRap}
							</Menu.Item>
						))}
					</Menu>
				</div>
			))}

			{!movieShowTimes?.heThongRapChieu.length && (
				<h4>
					Hiện tại chưa có rạp nào chiếu phim này. Thông tin chi tiết
					sẽ được cập nhật trong thời gian tới.
				</h4>
			)}
		</div>
	);
};

export default ReservePage;
