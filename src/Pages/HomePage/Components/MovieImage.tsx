import Movie from 'Interface/movie';
import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

type Props = {
	movie?: Movie;
};

const MovieImage = ({ movie }: Props) => {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<>
			{isLoading && (
				<Skeleton className="h-full mx-auto rounded-md transition duration-300 group-hover:scale-75" />
			)}
			{movie && (
				<img
					className="h-full mx-auto object-cover object-center rounded-md transition duration-300 group-hover:scale-75"
					style={{ display: `${isLoading ? 'none' : 'block'}` }}
					onLoad={() => {
						setIsLoading(false);
					}}
					src={movie?.hinhAnh}
					alt={movie?.tenPhim}
				/>
			)}
		</>
	);
};

export default MovieImage;
