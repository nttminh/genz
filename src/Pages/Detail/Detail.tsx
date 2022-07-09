import { Button } from '@mantine/core';
import { Movie } from 'Interface/Movie';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import movieAPI from 'Services/movieAPI';
import { Plus } from 'tabler-icons-react';

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
			<div className="h-72 bg-neutral-900 flex justify-center items-center">
				<h4>Trailer will be updated</h4>
			</div>
			<div className="px-4">
				<h1>{movie?.tenPhim}</h1>
				<p>Ngày khởi chiếu: {movie?.ngayKhoiChieu}</p>
				<p>Mô tả: {movie?.moTa}</p>
			</div>
			<div className="text-center">
				<Button radius="sm" color="red" leftIcon={<Plus />}>
					Đặt vé
				</Button>
			</div>
		</>
	);
};

export default Detail;
