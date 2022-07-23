import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'configStore';
import { getMovieShowing } from 'Slices/movie';
import Movie from 'Interface/movie';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper';
import { useNavigate } from 'react-router-dom';
import MovieImage from './MovieImage';

interface Props {
	initialSlide?: number;
}

const MovieShowing = ({ initialSlide = 1 }: Props) => {
	const navigate = useNavigate();
	const { movies, isLoading, error } = useSelector(
		(state: RootState) => state.movie
	);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (movies.length === 0) {
			dispatch(getMovieShowing());
		}
	}, []);

	if (isLoading) {
		// TODO: Loading component
		return (
			<Swiper
				modules={[Scrollbar]}
				centeredSlides
				loop
				spaceBetween={10}
				initialSlide={initialSlide} // will be removed when last photo from db is updated
				slidesPerView={3.3}
				scrollbar={{ enabled: true, draggable: true }}
				breakpoints={{
					// when window width is >= 640px
					640: {
						slidesPerView: 4,
						spaceBetween: 10,
					},
					// when window width is <= 768px
					768: {
						slidesPerView: 5,
						spaceBetween: 10,
					},
					// when window width is > 768px
					1024: {
						slidesPerView: 7,
						spaceBetween: 10,
					},
					1280: {
						slidesPerView: 11,
						spaceBetween: 10,
					},
					1536: {
						slidesPerView: 14,
						spaceBetween: 10,
					},
				}}
				// onSlideChange={() => console.log('slide change')}
				// onSwiper={(swiper) => console.log(swiper)}
			>
				{Array.from(Array(10).keys()).map((number: number) => (
					<SwiperSlide key={number}>
						<div className="w-full h-56 group cursor-pointer">
							<MovieImage />
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		);
	}

	if (error) {
		// TODO: Error component
		return <h1>{error}</h1>;
	}

	const handleOnMovieClick = (movieId: number) => {
		navigate(`/${movieId}`);
	};

	return (
		<div>
			<Swiper
				modules={[Scrollbar]}
				centeredSlides
				loop
				spaceBetween={10}
				initialSlide={initialSlide} // will be removed when last photo from db is updated
				slidesPerView={3.3}
				scrollbar={{ enabled: true, draggable: true }}
				breakpoints={{
					// when window width is >= 640px
					640: {
						slidesPerView: 4,
						spaceBetween: 10,
					},
					// when window width is <= 768px
					768: {
						slidesPerView: 5,
						spaceBetween: 10,
					},
					// when window width is > 768px
					1024: {
						slidesPerView: 7,
						spaceBetween: 10,
					},
				}}
				// onSlideChange={() => console.log('slide change')}
				// onSwiper={(swiper) => console.log(swiper)}
			>
				{movies.map((movie: Movie) => (
					<SwiperSlide key={movie.maPhim}>
						<div
							className="w-full h-56 group cursor-pointer"
							onClick={() => {
								handleOnMovieClick(movie.maPhim);
							}}
						>
							<MovieImage movie={movie} />
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default MovieShowing;
