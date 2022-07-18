import { Button, Group, Tabs } from '@mantine/core';
import BackButton from 'Components/BackButton';
import { AppDispatch, RootState } from 'configStore';
import { formatDate } from 'Helpers/formatDate';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

type Props = {};

const ChooseTimePage = (props: Props) => {
	const { id, maCumRap } = useParams();
	const { movieShowTimes, isLoading, error } = useSelector(
		(state: RootState) => state.cart
	);
	const dispatch = useDispatch<AppDispatch>();
	const [activeTab, setActiveTab] = useState(1);
	const onChange = (active: number, tabKey: string) => {
		setActiveTab(active);
		console.log('tabKey', tabKey);
	};

	return (
		<div className="p-4">
			<BackButton />
			<h1>{movieShowTimes?.tenPhim}</h1>
			<p>Ngày khởi chiếu: {formatDate(movieShowTimes?.ngayKhoiChieu)}</p>
			<p>Time will be updated later</p>
			<Tabs active={activeTab} onTabChange={onChange}>
				<Tabs.Tab label="22/7">
					<Group>
						<Button radius="sm" color="red">
							12:15
						</Button>
						<Button radius="sm" color="red">
							17:30
						</Button>
						<Button radius="sm" color="red">
							21:00
						</Button>
					</Group>
				</Tabs.Tab>
				<Tabs.Tab label="23/7">
					<Group>
						<Button radius="sm" color="red">
							17:30
						</Button>
						<Button radius="sm" color="red">
							21:00
						</Button>
					</Group>
				</Tabs.Tab>
				<Tabs.Tab label="24/7">
					<Group>
						<Button radius="sm" color="red">
							12:15
						</Button>
						<Button radius="sm" color="red">
							21:00
						</Button>
					</Group>
				</Tabs.Tab>
			</Tabs>
		</div>
	);
};

export default ChooseTimePage;
