import { Button, Group, Image, Tabs } from '@mantine/core';
import BackButton from 'Components/BackButton';
import { AppDispatch, RootState } from 'configStore';
import { formatDate } from 'Helpers/formatDate';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMovieShowTimes } from 'Slices/cart';

type Props = {};

const ChooseTimePage = (props: Props) => {
	const { id, maHeThongRap, maCumRap } = useParams();
	const { movieShowTimes, isLoading, error } = useSelector(
		(state: RootState) => state.cart
	);
	const heThongRapChieu = movieShowTimes?.heThongRapChieu.find(
		(show) => show.maHeThongRap === maHeThongRap
	);
	const rapDaChon = heThongRapChieu?.cumRapChieu.find(
		(cumRapChieu) => cumRapChieu.maCumRap === maCumRap
	);
	const dispatch = useDispatch<AppDispatch>();
	const [activeTab, setActiveTab] = useState(1);
	const onChange = (active: number, tabKey: string) => {
		setActiveTab(active);
		console.log('tabKey', tabKey);
	};

	useEffect(() => {
		if (!movieShowTimes) {
			dispatch(getMovieShowTimes(id!));
		}
	}, []);
	console.log(movieShowTimes);
	console.log(rapDaChon);

	return (
		<div className="p-4">
			<BackButton />
			<div className="mt-2 flex flex-col md:flex-row justify-around">
				<div className="w-1/2md:w-fit md:h-44">
					<Image height={150} radius="lg" src={rapDaChon?.hinhAnh} />
				</div>
				<div>
					<h1>{rapDaChon?.tenCumRap}</h1>
					<p>Địa chỉ: {rapDaChon?.diaChi}</p>
					<p>
						Ngày khởi chiếu:{' '}
						{formatDate(movieShowTimes?.ngayKhoiChieu)}
					</p>
				</div>
			</div>
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
