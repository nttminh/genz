import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createStyles, Menu } from '@mantine/core';
import { getMovieShowTimes } from 'Slices/cart';
import { AppDispatch, RootState } from 'configStore';
import { Settings } from 'tabler-icons-react';
import { formatDate } from 'Helpers/formatDate';
import { HeThongRapChieu } from 'Interface/movie';
import CinemaSelection from './Components/CinemaSelection';
import { Link } from 'react-router-dom';
import BackButton from 'Components/BackButton';

const useStyles = createStyles((theme) => ({
	// dropdown: {
	// 	borderColor: theme.colors.red[2],
	// 	borderInlineColor: theme.colors.red[3],
	// },
	// arrow: {
	// 	fill: theme.colors.red[2],
	// },
	
	item: {
		backgroundColor: theme.colors.dark[7],
		'&[data-hovered]': {
			backgroundColor: theme.colors.dark[6],
			color: theme.white,
		},
	},
}));

type Props = {};

const ReservePage = (props: Props) => {
	const { id } = useParams();
	const { movieShowTimes, isLoading, error } = useSelector(
		(state: RootState) => state.cart
	);
	const dispatch = useDispatch<AppDispatch>();
	const { classes } = useStyles();

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
			<BackButton />
			<br />
			<h1>{movieShowTimes?.tenPhim}</h1>
			<p>Ngày khởi chiếu: {formatDate(movieShowTimes?.ngayKhoiChieu)}</p>
			<br />
			<hr className="w-1/2 mx-auto border-neutral-700" />
			<br />
			<h2>Rạp đang chiếu</h2>
			<br />
			{movieShowTimes?.heThongRapChieu.map((heThongRapChieu) => (
				<div key={heThongRapChieu.maHeThongRap}>
					<Menu
						width={300}
						withArrow
						styles={(theme) => ({
							root: {
								width: '100%',
							},
							body: {
								backgroundColor: theme.colors.dark[8],
							},
							arrow: {
								fill: theme.colors.dark[8],
							},
						})}
						transition="scale"
						transitionDuration={200}
						classNames={classes}
					>
						<Menu.Target>
							<CinemaSelection
								heThongRapChieu={heThongRapChieu}
								handleOnClick={handleOnClick}
							/>
						</Menu.Target>

						<Menu.Dropdown>
							{heThongRapChieu.cumRapChieu.map((cumRapChieu) => (
								<Menu.Item
									key={cumRapChieu.maCumRap}
									// icon={<Settings size={14} />}
									component={Link}
									to={`${heThongRapChieu.maHeThongRap}/${cumRapChieu.maCumRap}`}
								>
									{cumRapChieu.tenCumRap}
								</Menu.Item>
							))}
						</Menu.Dropdown>
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
