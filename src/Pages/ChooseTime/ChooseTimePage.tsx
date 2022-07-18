import React from 'react';
import { useParams } from 'react-router-dom';

type Props = {};

const ChooseTimePage = (props: Props) => {
	const { id, maCumRap } = useParams();
	console.log(id, maCumRap);
	return <div>ChooseTimePage</div>;
};

export default ChooseTimePage;
