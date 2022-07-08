import { Outlet } from 'react-router-dom';
import Header from './components/Header';

type Props = {};

function HomeTemplate({}: Props) {
	return (
		<div>
			<Header />
			<Outlet />
		</div>
	);
}

export default HomeTemplate;
