import { youtubeParser } from 'Helpers/youtubeParser';
import Movie from 'Interface/movie';
import React from 'react';
import ReactPlayer, { YouTubeConfig } from 'react-player/youtube';

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
			url={
				movie
					? `http://www.youtube-nocookie.com/embed/${youtubeParser(
							movie.trailer
					  )}`
					: ''
			}
			width="100%"
			height="100%"
			playing
			// muted
			// controls
			onEnded={() => {
				setIsTrailerDone(true);
			}}
			config={
				{
					// youtube: { playerVars: { start: 1000 } },
					playerVars: {
						rel: 0,
						showinfo: 0,
						modestbranding: 1,
						playsinline: 1,
						iv_load_policy: 3,
					},
				} as YouTubeConfig
			}
			{...rest}
		/>
	);
};

export default VideoPlayer;
