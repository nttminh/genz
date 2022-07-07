import Banner from "./Banner";
import MovieShowing from "./MovieShowing";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div>
      <Banner />
      <MovieShowing />
    </div>
  );
};

export default HomePage;
