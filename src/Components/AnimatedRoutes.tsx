import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import HomeTemplate from 'Templates/HomeTemplate';
import HomePage from 'Pages/HomePage/HomePage';
import Contact from 'Pages/Contact/Contact';
import Login from 'Pages/Login/Login';
import Register from 'Pages/Register/Register';
import About from 'Pages/About/About';
import Checkout from 'Pages/Checkout/Checkout';
import ProtectedRoute from 'Routes/ProtectedRoute';
import Detail from 'Pages/Detail/Detail';
import ReservePage from 'Pages/Reserve/ReservePage';
import ChooseTimePage from 'Pages/ChooseTime/ChooseTimePage';
import SeatSelectPage from 'Pages/SeatSelect/SeatSelectPage';
import Finish from 'Pages/Finish/Finish';

import { AnimatePresence } from 'framer-motion';

type Props = {};

const AnimatedRoutes = (props: Props) => {
	const location = useLocation();
	return (
		<AnimatePresence exitBeforeEnter>
			<Routes location={location} key={location.pathname}>
				<Route path="" element={<HomeTemplate />}>
					<Route path="contact" element={<Contact />} />
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
					<Route path="about" element={<About />} />
					<Route path="/:id" element={<Detail />} />
					<Route
						path="/reserve/:id/:maHeThongRap/:maCumRap"
						element={<ChooseTimePage />}
					/>
					<Route
						path="/reserve/:id/:maHeThongRap/:maCumRap/:maLichChieu"
						element={<SeatSelectPage />}
					/>
					<Route
						path="/reserve/:id/:maHeThongRap/:maCumRap/:maLichChieu/checkout"
						element={
							<ProtectedRoute>
								<Checkout />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/reserve/:id/:maHeThongRap/:maCumRap/:maLichChieu/checkout/finish"
						element={
							<ProtectedRoute>
								<Finish />
							</ProtectedRoute>
						}
					/>
					<Route path="reserve/:id" element={<ReservePage />} />
					<Route index element={<HomePage />} />
					<Route path="*" element={<Navigate to={''} />} />
				</Route>
			</Routes>
		</AnimatePresence>
	);
};

export default AnimatedRoutes;
