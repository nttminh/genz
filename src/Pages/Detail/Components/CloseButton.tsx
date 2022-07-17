import { ActionIcon, Button } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { CircleX } from 'tabler-icons-react';

type Props = {};

const CloseButton = (props: Props) => {
	return (
		<ActionIcon component={Link} to={`/`}>
			<CircleX size={58} />
		</ActionIcon>
	);
};

export default CloseButton;
