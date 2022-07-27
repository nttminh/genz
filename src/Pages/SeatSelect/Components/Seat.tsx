import { Button, Checkbox, CheckboxProps } from '@mantine/core';
import { DanhSachGhe } from 'Interface/seats';
import React, { useState } from 'react';
import { Armchair, Wheelchair } from 'tabler-icons-react';

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
	const [checked, setChecked] = useState(false);
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
			}}
			styles={(theme) => ({
				root: {
					backgroundColor: checked
						? theme.fn.darken(theme.colors.orange[6], 0.05)
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
