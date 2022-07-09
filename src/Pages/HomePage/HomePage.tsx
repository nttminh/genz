import Banner from './Components/Banner';
import MovieShowing from './Components/MovieShowing';

type Props = {};

const HomePage = (props: Props) => {
	return (
		<div>
			<Banner />
			<h3 className="ml-5 font-bold">Phim đang chiếu</h3>
			<MovieShowing />
		</div>
	);
};

export default HomePage;
