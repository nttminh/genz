import { UnstyledButton } from '@mantine/core';
import { HeThongRapChieu } from 'Interface/movie';
import { forwardRef } from 'react';

interface CinemaSelectionProps
	extends React.ComponentPropsWithoutRef<'button'> {
	heThongRapChieu: HeThongRapChieu;
	handleOnClick: any;
}

const CinemaSelection = forwardRef<HTMLButtonElement, CinemaSelectionProps>(
	(
		{ heThongRapChieu, handleOnClick, ...others }: CinemaSelectionProps,
		ref
	) => (
		<UnstyledButton
			ref={ref}
			sx={(theme) => ({
				display: 'block',
				width: '100%',
				padding: theme.spacing.md,
				color:
					theme.colorScheme === 'dark'
						? theme.colors.dark[0]
						: theme.black,

				'&:hover': {
					backgroundColor:
						theme.colorScheme === 'dark'
							? theme.colors.dark[8]
							: theme.colors.gray[0],
				},
			})}
			{...others}
		>
			<div
				key={heThongRapChieu.maHeThongRap}
				className="flex py-2 border-b-2 border-b-neutral-700 items-center"
				onClick={() => handleOnClick(heThongRapChieu)}
			>
				<img
					src={heThongRapChieu.logo}
					alt=""
					className="w-10 h-10 mr-4"
				/>
				<h4>{heThongRapChieu.tenHeThongRap}</h4>
			</div>
		</UnstyledButton>
	)
);

export default CinemaSelection;
