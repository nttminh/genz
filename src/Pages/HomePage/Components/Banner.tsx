import { ActionIcon, Button } from '@mantine/core';
import { AppDispatch, RootState } from 'configStore';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InfoCircle, Share, Plus } from 'tabler-icons-react';
import { Link } from 'react-router-dom';

import movieReducers, { randomizeHighlightMovie } from '../../../Slices/movie';

type Props = {};

const Banner = (props: Props) => {
	const { movies, highlightMovie, isLoading, error } = useSelector(
		(state: RootState) => state.movie
	);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(randomizeHighlightMovie());
	}, [movies]);

	if (!highlightMovie) {
		return <h1>Loading banner...</h1>;
	}

	return (
		<div
			className="-mt-[76px] h-144"
			style={{
				backgroundSize: 'auto, cover',
				background: `
				linear-gradient(to bottom, rgba(0,0,0,0),rgba(0,0,0,100)),
				url(${
					highlightMovie.hinhAnh && highlightMovie.hinhAnh
				}) center/contain no-repeat
				`,
			}}
		>
			<div className="w-full h-full pb-6 flex flex-col justify-end">
				<h1 className="text-center font-extrabold mb-4">
					{highlightMovie.tenPhim}
				</h1>
				<div className="actions w-1/2 lg:w-1/5 flex justify-between items-center mx-auto">
					<ActionIcon
						component={Link}
						to={`/${highlightMovie.maPhim}`}
					>
						<Share />
					</ActionIcon>
					<Button radius="sm" color="red" leftIcon={<Plus />}>
						Đặt vé
					</Button>
					<ActionIcon
						component={Link}
						to={`/${highlightMovie.maPhim}`}
					>
						<InfoCircle />
					</ActionIcon>
				</div>
			</div>
		</div>
	);
};

export default Banner;
