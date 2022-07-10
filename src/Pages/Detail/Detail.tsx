import { Button } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus } from 'tabler-icons-react';
import ReactPlayer from 'react-player/youtube';

import Movie from 'Interface/movie';
import movieAPI from 'Services/movieAPI';
import VideoPlayer from 'Components/VideoPlayer';
import CloseButton from './Components/CloseButton';
import { getYoutubeThumbnail } from 'Helpers/getYoutubeThumbnail';

type Props = {};

const Detail = (props: Props) => {
	const { id } = useParams();
	const [movie, setMovie] = useState<Movie>();
	const [isTrailerDone, setIsTrailerDone] = useState<boolean>(false);

	useEffect(() => {
		async function fetchData() {
			// You can await here
			let data = await movieAPI.getMovieDetails(id!);
			console.log(data);
			setMovie(data);
			// ...
		}
		fetchData();
	}, [id]);

	return (
		<>
			<div
				className="relative h-44 md:h-72 lg:h-128 flex justify-center items-center"
				style={{
					backgroundSize: 'auto, cover',
					background: `
					linear-gradient(to bottom, rgba(0,0,0,0),rgba(0,0,0,100)),
					url(${
						movie?.hinhAnh && getYoutubeThumbnail(movie.trailer)
					}) center/contain no-repeat
					`,
				}}
			>
				{!movie && <h4>Trailer will be updated</h4>}

				{movie && (
					<div className="wrapper w-screen h-full">
						{!isTrailerDone && (
							<VideoPlayer
								movie={movie}
								setIsTrailerDone={setIsTrailerDone}
							/>
						)}
					</div>
				)}

				<div className="absolute right-3 top-3 md:right-5 md:top-5 lg:right-14 lg:top-10">
					<CloseButton />
				</div>
			</div>
			<div className="px-4">
				<h1>{movie?.tenPhim}</h1>
				<p>Ngày khởi chiếu: {movie?.ngayKhoiChieu}</p>
				<p>Mô tả: {movie?.moTa}</p>
			</div>
			<div className="text-center mt-8">
				<Button radius="sm" color="red" leftIcon={<Plus />}>
					Đặt vé
				</Button>
			</div>
		</>
	);
};

export default Detail;
