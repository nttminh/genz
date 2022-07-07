import { AppDispatch } from 'configStore';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import movieReducers from '../../Slices/movie';

type Props = {};

const Banner = (props: Props) => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		// dispatch(movieReducer);
	}, []);
	return (
		<div className="bg-orange-200 -mt-[76px]">
			<img
				src="https://i.ytimg.com/vi/Go8nTmfrQd8/maxresdefault.jpg"
				className="object-cover"
			/>
		</div>
	);
};

export default Banner;
