import BackButton from 'Components/BackButton';
import React from 'react';
import { useParams } from 'react-router-dom';

type Props = {};

const ChooseTimePage = (props: Props) => {
	const { id, maCumRap } = useParams();
	console.log(id, maCumRap);
	return (
		<div className="p-4">
			<BackButton />
			<h1>Choose Time Page</h1>
			<p>Time will be updated later</p>
		</div>
	);
};

export default ChooseTimePage;
