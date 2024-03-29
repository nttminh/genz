import { Button } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus } from 'tabler-icons-react';
import ReactPlayer from 'react-player/youtube';
import { motion } from 'framer-motion';

import Movie from 'Interface/movie';
import movieAPI from 'Services/movieAPI';
import VideoPlayer from 'Components/VideoPlayer';
import CloseButton from './Components/CloseButton';
import { getYoutubeThumbnail } from 'Helpers/getYoutubeThumbnail';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { formatDate } from 'Helpers/formatDate';
import { useDispatch } from 'react-redux';
import { setHighlightMovie } from 'Slices/movie';
import YouTubePlayer from 'react-player/youtube';
import MuteButton from 'Components/MuteButton';
import { Link } from 'react-router-dom';

type Props = {};
const animateStyles = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
};

const Detail = (props: Props) => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const [movie, setMovie] = useState<Movie>();
	const playerRef = useRef<YouTubePlayer>(null);
	const [isTrailerDone, setIsTrailerDone] = useState<boolean>(false);
	const transitionVariants = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	};

	useEffect(() => {
		async function fetchData() {
			let data = await movieAPI.getMovieDetails(id!);
			console.log(data);
			setMovie(data);
		}
		fetchData();
	}, [id]);

	useEffect(() => {
		if (movie) {
			dispatch(setHighlightMovie(movie));
		}
	}, [movie]);

	return (
		<>
			<motion.div
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
				variants={transitionVariants}
			>
				{!movie && (
					<motion.div
						className="w-full h-full"
						variants={transitionVariants}
					>
						<Skeleton className="h-full" />
					</motion.div>
				)}

				{movie && (
					<motion.div
						className="w-full h-full pointer-events-none"
						variants={transitionVariants}
					>
						{!isTrailerDone && (
							<VideoPlayer
								playerRef={playerRef}
								movie={movie}
								muted
								setIsTrailerDone={setIsTrailerDone}
							/>
						)}
					</motion.div>
				)}

				<div className="absolute right-3 bottom-3 md:right-5 md:bottom-5 lg:right-14 lg:bottom-14 z-10">
					<MuteButton playerRef={playerRef} />
				</div>

				<div className="absolute right-3 top-3 md:right-5 md:top-5 lg:right-14 lg:top-10">
					<CloseButton />
				</div>
			</motion.div>
			<motion.div className="p-4" variants={transitionVariants}>
				<motion.h1>
					{movie ? movie?.tenPhim : <Skeleton className="w-3/5" />}
				</motion.h1>
				<motion.p>
					Ngày khởi chiếu:{' '}
					{movie ? (
						formatDate(movie?.ngayKhoiChieu)
					) : (
						<Skeleton className="w-2/5" />
					)}
				</motion.p>
				<motion.p>
					Mô tả: {movie ? movie?.moTa : <Skeleton count={8} />}
				</motion.p>
			</motion.div>
			<motion.div
				className="text-center mt-8 mb-12"
				variants={transitionVariants}
			>
				<Button
					component={Link}
					to={`/reserve/${id}`}
					radius="sm"
					color="red"
					leftIcon={<Plus />}
				>
					Đặt vé
				</Button>
			</motion.div>
		</>
	);
};

export default Detail;
