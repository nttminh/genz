import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import HomeTemplate from './Templates/HomeTemplate';
import HomePage from './Pages/HomePage/HomePage';
import Contact from './Pages/Contact/Contact';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import About from './Pages/About/About';
import Checkout from './Pages/Checkout/Checkout';
import ProtectedRoute from 'Routes/ProtectedRoute';
import Detail from 'Pages/Detail/Detail';
import ReservePage from 'Pages/Reserve/ReservePage';
import ChooseTimePage from 'Pages/ChooseTime/ChooseTimePage';
import SeatSelectPage from 'Pages/SeatSelect/SeatSelectPage';
import Finish from 'Pages/Finish/Finish';
import AnimatedRoutes from 'Components/AnimatedRoutes';

function App(): React.ReactElement {
const location = useLocation

	return (
		<BrowserRouter>
			<AnimatedRoutes />
		</BrowserRouter>
	);
}

export default App;

//tsrfc: React.FC
//<TenComponent />: React.ReactElement
