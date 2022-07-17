import Banner from './Components/Banner';
import MovieShowing from './Components/MovieShowing';

type Props = {};

const HomePage = (props: Props) => {
	return (
		<div>
			<Banner />
			<h3 className="ml-5 font-bold">Phim đang chiếu</h3>
			<MovieShowing />
			<br />
			<h3 className="ml-5 font-bold">Hot tuần này</h3>
			<MovieShowing initialSlide={5} />
		</div>
	);
};

export default HomePage;
