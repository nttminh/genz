import { Button } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus } from 'tabler-icons-react';
import ReactPlayer from 'react-player/youtube';

import { Movie } from 'Interface/Movie';
import movieAPI from 'Services/movieAPI';

type Props = {};

const Detail = (props: Props) => {
	const { id } = useParams();
	const [movie, setMovie] = useState<Movie>();

	useEffect(() => {
		async function fetchData() {
			// You can await here
			let data = await movieAPI.getMovieDetails(id!);
			console.log(data);
			setMovie(data);
			// ...
		}
		fetchData();
	}, []);

	return (
		<>
			<div className="h-44 md:h-72 lg:h-128 flex justify-center items-center">
				{!movie && <h4>Trailer will be updated</h4>}

				{movie && (
					<div className="wrapper w-screen h-full">
						<ReactPlayer
							// url={`https://www.youtube-nocookie.com/embed/${
							// 	playerVideo?.trailer?.id || ''
							// }`}
							url={movie ? movie.trailer : ''}
							width="100%"
							height="100%"
							playing
							muted
							// controls
							config={{
								playerVars: {
									rel: 0,
									modestbranding: 1,
									playsinline: 1,
									iv_load_policy: 3,
								},
							}}
						/>
					</div>
				)}
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
