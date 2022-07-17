import { ActionIcon, Button } from '@mantine/core';
import { AppDispatch, RootState } from 'configStore';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InfoCircle, Share, Plus, ClipboardCheck } from 'tabler-icons-react';
import { Link } from 'react-router-dom';

import movieReducers, { randomizeHighlightMovie } from '../../../Slices/movie';
import ReactTooltip from 'react-tooltip';
import VideoPlayer from 'Components/VideoPlayer';
import { getYoutubeThumbnail } from 'Helpers/getYoutubeThumbnail';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import MuteButton from 'Components/MuteButton';
import YouTubePlayer from 'react-player/youtube';

type Props = {};

const Banner = (props: Props) => {
	const { movies, highlightMovie, isLoading, error } = useSelector(
		(state: RootState) => state.movie
	);
	const dispatch = useDispatch<AppDispatch>();
	const [isCopied, setIsCopied] = useState<boolean>(false);
	const [isTrailerDone, setIsTrailerDone] = useState<boolean>(false);
	const playerRef = useRef<YouTubePlayer>(null);

	useEffect(() => {
		if (!highlightMovie) {
			dispatch(randomizeHighlightMovie());
		}
	}, [movies]);

	async function copyTextToClipboard() {
		setIsCopied(true);

		if ('clipboard' in navigator) {
			return await navigator.clipboard.writeText(
				`https://genz-nttminh.vercel.app/${highlightMovie?.maPhim}`
			);
		} else {
			return document.execCommand(
				'copy',
				true,
				`https://genz-nttminh.vercel.app/${highlightMovie?.maPhim}`
			);
		}
	}

	const handleCopyClick = () => {
		// Asynchronously call copyTextToClipboard
		copyTextToClipboard()
			.then(() => {
				// If successful, update the isCopied state value
				setIsCopied(true);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	if (window.innerWidth > 768) {
		return (
			<>
				<div
					className="relative -mt-[76px] h-144"
					style={{
						backgroundSize: 'auto, cover',
						background: `
					linear-gradient(to bottom, rgba(0,0,0,0),rgba(0,0,0,100)),
					url(${
						highlightMovie?.hinhAnh
							? getYoutubeThumbnail(highlightMovie.trailer)
							: ''
					}) center/contain no-repeat
					`,
					}}
				>
					<div className="w-full h-full pointer-events-none">
						{!isTrailerDone && (
							<>
								<VideoPlayer
									playerRef={playerRef}
									movie={highlightMovie}
									muted
									setIsTrailerDone={setIsTrailerDone}
								/>
							</>
						)}
					</div>
					<div className="absolute md:right-5 md:bottom-12 lg:right-14 lg:bottom-14 z-10">
						<MuteButton playerRef={playerRef} />
					</div>

					<div className="absolute w-1/2 h-full inset-0 flex flex-col justify-center px-4 bg-gradient-to-r from-black to-transparent">
						<h1 className="font-bold">
							{highlightMovie?.tenPhim || (
								<Skeleton width={300} />
							)}
						</h1>
						<p className="line-clamp-2">
							{highlightMovie?.moTa || <Skeleton count={2} />}
						</p>
						<div className="mt-4 w-3/5 lg:w-2/5 flex justify-around items-center">
							<ActionIcon
								data-tip="Đã sao chép link"
								data-event="click"
							>
								{isCopied ? <ClipboardCheck /> : <Share />}
							</ActionIcon>
							<Button
								component={Link}
								to={`/reserve/${highlightMovie?.maPhim}`}
								radius="sm"
								color="red"
								leftIcon={<Plus />}
							>
								Đặt vé
							</Button>
							<ActionIcon
								component={Link}
								to={`/${highlightMovie?.maPhim}`}
							>
								<InfoCircle />
							</ActionIcon>
						</div>
					</div>
					<ReactTooltip
						place="top"
						effect="solid"
						globalEventOff="click"
						afterShow={handleCopyClick}
					/>
				</div>
			</>
		);
	}

	return (
		<div
			className="-mt-[76px] h-144"
			style={{
				backgroundSize: 'auto, cover',
				background: `
				linear-gradient(to bottom, rgba(0,0,0,0),rgba(0,0,0,100)),
				url(${
					highlightMovie?.hinhAnh ? highlightMovie.hinhAnh : ''
				}) center/contain no-repeat
				`,
			}}
		>
			<div className="w-full h-full pb-6 flex flex-col justify-end">
				<h1 className="text-center font-extrabold mb-4">
					{highlightMovie?.tenPhim || <Skeleton width={300} />}
				</h1>
				<div className="actions w-3/5 lg:w-1/5 flex justify-between items-center mx-auto">
					<ActionIcon data-tip="Đã sao chép link" data-event="click">
						{isCopied ? <ClipboardCheck /> : <Share />}
					</ActionIcon>
					<Button radius="sm" color="red" leftIcon={<Plus />}>
						Đặt vé
					</Button>
					<ActionIcon
						component={Link}
						to={`/${highlightMovie?.maPhim}` || ''}
					>
						<InfoCircle />
					</ActionIcon>
				</div>
			</div>
			<ReactTooltip
				place="top"
				effect="solid"
				globalEventOff="click"
				afterShow={handleCopyClick}
			/>
		</div>
	);
};

export default Banner;
