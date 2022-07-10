import Movie from 'Interface/movie';
import React from 'react';
import ReactPlayer from 'react-player/youtube';

type Props = {
	movie: Movie;
	muted?: boolean;
	setIsTrailerDone?: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultFunction = () => {};

const VideoPlayer = ({
	movie,
	setIsTrailerDone = defaultFunction,
	...rest
}: Props) => {
	return (
		<ReactPlayer
			// url={`https://www.youtube-nocookie.com/embed/${
			// 	playerVideo?.trailer?.id || ''
			// }`}
			url={movie ? movie.trailer : ''}
			width="100%"
			height="100%"
			playing
			// muted
			// controls
			onEnded={() => {
				setIsTrailerDone(true);
			}}
			config={{
				playerVars: {
					rel: 0,
					showinfo: 0,
					modestbranding: 1,
					playsinline: 1,
					iv_load_policy: 3,
				},
			}}
			{...rest}
		/>
	);
};

export default VideoPlayer;
