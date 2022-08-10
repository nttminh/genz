import { Button, Group, Image, Tabs, TabsValue } from '@mantine/core';
import { motion } from 'framer-motion';
import BackButton from 'Components/BackButton';
import { AppDispatch, RootState } from 'configStore';
import { formatDate } from 'Helpers/formatDate';
import React, { Key, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
	getMovieShowTimes,
	setHeThongRapChieu,
	setLichDaChon,
	setRapDaChon,
} from 'Slices/cart';

type Props = {};

const ChooseTimePage = (props: Props) => {
	const { id, maHeThongRap, maCumRap } = useParams();
	const { movieShowTimes, rapDaChon, heThongRapChieu, isLoading, error } =
		useSelector((state: RootState) => state.cart);
	const dispatch = useDispatch<AppDispatch>();

	const [activeTab, setActiveTab] = useState(() => {
		if (rapDaChon) {
			return rapDaChon.lichChieuPhim.at(0)?.ngayChieuGioChieu.toString();
		}
	});
	useEffect(() => {
		if (!movieShowTimes) {
			dispatch(getMovieShowTimes(id!));
		}
		if (!heThongRapChieu) {
			let tempHeThongRapChieu = movieShowTimes?.heThongRapChieu.find(
				(show) => show.maHeThongRap === maHeThongRap
			)!;
			dispatch(setHeThongRapChieu(tempHeThongRapChieu));
		}
		if (!rapDaChon) {
			let tempRapDaChon = heThongRapChieu?.cumRapChieu.find(
				(cumRapChieu) => cumRapChieu.maCumRap === maCumRap
			)!;
			dispatch(setRapDaChon(tempRapDaChon));
		}
	}, [movieShowTimes, heThongRapChieu, rapDaChon]);

	console.log(rapDaChon);
	if (!rapDaChon) {
		return <></>;
	}

	if (!movieShowTimes) {
		console.log(movieShowTimes);
		return <></>;
	}

	return (
		<motion.div
			className="p-4"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<BackButton />
			<div className="my-2 flex flex-col md:flex-row justify-around">
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

			<Tabs
				defaultChecked
				// active={activeTab}
				// onTabChange={setActiveTab}
				variant="outline"
				defaultValue={activeTab}
			>
				<Tabs.List>
					{rapDaChon?.lichChieuPhim &&
						rapDaChon?.lichChieuPhim
							.map((lich) => {
								const ngayChieuGioChieu = new Date(
									lich.ngayChieuGioChieu
								);
								return (
									<Tabs.Tab
										key={lich.ngayChieuGioChieu.toString()}
										value={lich.ngayChieuGioChieu.toString()}
									>
										{ngayChieuGioChieu.getDate()}/
										{ngayChieuGioChieu.getMonth() + 1}
									</Tabs.Tab>
								);
							})
							.reverse()}
				</Tabs.List>

				{rapDaChon?.lichChieuPhim &&
					rapDaChon?.lichChieuPhim.map((lich, index) => {
						const ngayChieuGioChieu: Date = new Date(
							lich.ngayChieuGioChieu
						);
						return (
							<Tabs.Panel
								key={lich.ngayChieuGioChieu.toString()}
								value={lich.ngayChieuGioChieu.toString()}
								pt="xs"
							>
								<Group>
									<Button
										radius="sm"
										color="red"
										component={Link}
										to={lich.maLichChieu}
										onClick={() =>
											dispatch(setLichDaChon(lich))
										}
									>
										{ngayChieuGioChieu.toLocaleTimeString(
											[],
											{
												hour: '2-digit',
												minute: '2-digit',
												hour12: false,
											}
										)}
									</Button>
								</Group>
							</Tabs.Panel>
						);
					})}
			</Tabs>
		</motion.div>
	);
};

export default ChooseTimePage;
