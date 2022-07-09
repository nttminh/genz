import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'configStore';
import { getMovieShowing } from 'Slices/movie';
import Movie from 'Interface/Movie';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper';
import { useNavigate } from 'react-router-dom';

const MovieShowing = () => {
	const navigate = useNavigate();
	const { movies, isLoading, error } = useSelector(
		(state: RootState) => state.movie
	);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getMovieShowing());
	}, []);

	if (isLoading) {
		// TODO: Loading component
		return <h1>Loading...</h1>;
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
			{/* {movies.map((movie: Movie) => {
				return (
					<div key={movie.maPhim}>
						<h3>{movie.tenPhim}</h3>
						<img src={movie.hinhAnh} alt="" />
					</div>
				);
			})} */}
			<Swiper
				modules={[Scrollbar]}
				centeredSlides
				loop
				spaceBetween={10}
				initialSlide={3} // will be removed when last photo from db is updated
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
							<img
								className="h-full object-cover object-center rounded-md transition duration-300 group-hover:scale-75"
								src={movie.hinhAnh}
								alt={movie.tenPhim}
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default MovieShowing;
