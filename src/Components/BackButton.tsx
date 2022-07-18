import { ActionIcon } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from 'tabler-icons-react';

type Props = {};

const BackButton = (props: Props) => {
	const navigate = useNavigate();
	return (
		<ActionIcon onClick={() => navigate(-1)}>
			<ArrowBack size={window.innerWidth < 768 ? 20 : 58} />
		</ActionIcon>
	);
};

export default BackButton;
