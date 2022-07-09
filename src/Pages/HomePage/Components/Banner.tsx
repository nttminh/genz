import { ActionIcon, Button } from '@mantine/core';
import { AppDispatch, RootState } from 'configStore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InfoCircle, Share, Plus, ClipboardCheck } from 'tabler-icons-react';
import { Link } from 'react-router-dom';

import movieReducers, { randomizeHighlightMovie } from '../../../Slices/movie';
import ReactTooltip from 'react-tooltip';

type Props = {};

const Banner = (props: Props) => {
	const { movies, highlightMovie, isLoading, error } = useSelector(
		(state: RootState) => state.movie
	);
	const dispatch = useDispatch<AppDispatch>();
	const [isCopied, setIsCopied] = useState<boolean>(false);

	useEffect(() => {
		dispatch(randomizeHighlightMovie());
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

	if (!highlightMovie) {
		return <h1>Loading banner...</h1>;
	}

	return (
		<div
			className="-mt-[76px] h-144"
			style={{
				backgroundSize: 'auto, cover',
				background: `
				linear-gradient(to bottom, rgba(0,0,0,0),rgba(0,0,0,100)),
				url(${
					highlightMovie.hinhAnh && highlightMovie.hinhAnh
				}) center/contain no-repeat
				`,
			}}
		>
			<div className="w-full h-full pb-6 flex flex-col justify-end">
				<h1 className="text-center font-extrabold mb-4">
					{highlightMovie.tenPhim}
				</h1>
				<div className="actions w-1/2 lg:w-1/5 flex justify-between items-center mx-auto">
					<ActionIcon data-tip="Đã sao chép link" data-event="click">
						{isCopied ? <ClipboardCheck /> : <Share />}
					</ActionIcon>
					<Button radius="sm" color="red" leftIcon={<Plus />}>
						Đặt vé
					</Button>
					<ActionIcon
						component={Link}
						to={`/${highlightMovie.maPhim}`}
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
