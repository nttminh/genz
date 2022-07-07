import { Outlet } from 'react-router-dom';
import Header from './components/Header';

type Props = {};

const links = [
	{ link: '', label: 'Home' },
	{ link: 'about', label: 'About' },
	{ link: 'login', label: 'Login' },
];

function HomeTemplate({}: Props) {
	return (
		<div>
			{/* <AppShell links={links} /> */}
			<Header />
			{/* <SiteNavbar /> */}
			<Outlet />
		</div>
	);
}

export default HomeTemplate;
