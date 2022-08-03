import { Button, Checkbox, CheckboxProps } from '@mantine/core';
import { AppDispatch } from 'configStore';
import { DanhSachGhe } from 'Interface/seats';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Armchair, Wheelchair } from 'tabler-icons-react';
import { toggleSeat } from 'Slices/cart';

type Props = {
	ghe: DanhSachGhe;
};

const CheckboxIcon: CheckboxProps['icon'] = ({ indeterminate, className }) =>
	indeterminate ? (
		<Armchair className={className} />
	) : (
		<Wheelchair className={className} />
	);

const Seat = ({ ghe }: Props) => {
	const dispatch = useDispatch<AppDispatch>();
	const [checked, setChecked] = useState(() => {
		if (ghe.isLocallySelected) {
			return true;
		}
		return false;
	});
	return (
		// <Checkbox
		// 	icon={CheckboxIcon}
		// 	key={ghe.tenGhe}
		// 	radius="sm"
		// 	size="md"
		// 	disabled={ghe.daDat}
		// >
		// 	{ghe.tenGhe}
		// </Checkbox>
		<Button
			radius="sm"
			size="xs"
			disabled={ghe.daDat}
			onClick={() => {
				setChecked(!checked);
				dispatch(toggleSeat(ghe));
			}}
			styles={(theme) => ({
				root: {
					color: checked ? '#000' : '#fff',
					backgroundColor: checked
						? theme.fn.darken('#fff', 0.05)
						: theme.colors.primaryColor,
					'&:disabled': {
						backgroundColor: theme.fn.darken('#e03131', 0.75),
					},
				},

				leftIcon: {
					marginRight: 15,
				},
			})}
		>
			{ghe.tenGhe}
		</Button>
	);
};

export default Seat;
