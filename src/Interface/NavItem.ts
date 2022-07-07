import { IconType } from 'react-icons';

export interface NavItem {
	id: number;
	title: string;
	path: string;
	nName: string;
	sName: string;
	icon: IconType;
}
